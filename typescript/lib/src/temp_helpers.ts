import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_t from 'pareto-core/dist/implementation/transformer'
import * as p_pi from 'pareto-core/dist/interface/production'
import * as p_ri from 'pareto-core/dist/interface/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'
import P_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'
import * as h_i from './temp_helper_types'

//data types
import * as d_in from "./modules/typescript_parser_api/interface/data/dynamic_ast"
import * as d_function from "./interface/data/typed_ast_from_ast"
import * as d_primitives from "./interface/data/primitives"
import { Abort } from 'pareto-core/dist/interface/__internal/Abort'

/*

Some pointers on how to use this API:
-have a look at the typed_ast/ast.ts file to see how the AST is refined into a typed AST. The functions there are the ones that you will be calling from your own code.
-use the same parameter names as the ones specified in this file, like 'context', 'abort', 'kind'

*/

export type Production_Parameters = {
    'location description': string
    'parent': d_in.Node
}

export type Refiner_Parameters = {
    'parent': d_in.Node
    'path': string
}

export type Helper_Parameters = {
    'path': string
    'parent': d_in.Node
}

export type Root<T extends p_di.Value> = p_ri.Refiner<
    T,
    d_function.Error_Inner,
    d_in.Node
>

export type Refiner<T extends p_di.Value> = p_ri.Refiner_With_Parameter<
    T,
    d_function.Error_Inner,
    d_in.Node,
    Refiner_Parameters
>

export type Production<T extends p_di.Value> = p_pi.Production_With_Parameter<
    T,
    d_function.Error_Inner,
    d_in.Node,
    null,
    Production_Parameters
>

export type Node_Context = {

    parse_children_as_type: <T extends p_di.Value>(
        callback: (
            context: Iterator_Context
        ) => T
    ) => T
    parse_children_as_list: <T extends p_di.Value>(
        callback: (
            context: Iterator_Context
        ) => T
    ) => p_di.List<T>
}

export type Iterator_Context = {
    /**
     * Updates the path label used for error reporting. Returns the SAME iterator — NO side effects, NO consumption.
     * Use for each property that you are going to set: 'my prop': context.prop('my prop').xxx
     */
    prop: (
        propery_name: string
    ) => Iterator_Context
    /**
     * Updates the path label (marks the selected option) for error reporting. Returns the SAME iterator — NO side effects, NO consumption.
     * Use this as the first thing when setting the data part of an option: ['my option', context.option('my option').xxx]
     */
    option: (
        option_name: string
    ) => Iterator_Context

    /**
     * Peeks at the next child and reports an error if its kind does not match. Does NOT consume. Returns the same iterator.
     * Useful only for properties, not for options that were used as the 'case' in a switch statement.
     * iow: No need to call this if the kind was already matched in the switch/case of peek_for_state.
     */
    assert_kind: (
        kind: string
    ) => Iterator_Context

    /**
     * Peeks at the kind of the next child WITHOUT consuming it, then calls the callback with the kind.
     * The callback must consume whatever it needs via consume_* methods.
     * Use abort() to report an error for unexpected kinds — NOTE: abort does NOT backtrack, it reports an error and
     * returns a fallback; it cannot be used to "try and undo".
     */
    peek_for_state: <T extends p_di.State>(
        callback: (
            kind: string,
            abort: Abort<null>,
        ) => T
    ) => T

    /**
     * Peeks at the next child. If its kind matches, calls the callback (which must consume the node via a consume_* call)
     * and returns Some(result). If it does not match, does NOT consume and returns None.
     * The iterator is NOT automatically advanced — the callback is responsible for consuming the matched node.
     */
    peek_for_optional: <T extends p_di.Value>(
        kind: string,
        callback: (context: Iterator_Context) => T
    ) => p_di.Optional_Value<T>
    /**
     * Peeks at the next child. If its kind does NOT match the given kind, calls the callback (which must consume)
     * and returns Some(result). If it matches, does NOT consume and returns None.
     * This is the inverse of peek_for_optional.
     */
    optional_set_if_not: <T extends p_di.Value>(
        kind: string,
        callback: (context: Iterator_Context) => T
    ) => p_di.Optional_Value<T>

    /**
     * Calls the callback with the current iterator context WITHOUT consuming or peeking at any node.
     * The callback receives the same iterator position, so any consumption inside it advances the shared iterator.
     * Use this to perform sequential multi-step consumption in an expression context — e.g., when building
     * an object literal where you need a named 'context' variable to call multiple consume_* steps in order,
     * but you cannot use imperative 'const' statements at that point.
     */
    based_on_first_node: <T extends p_di.Value>(
        callback: (
            context: Iterator_Context
        ) => T
    ) => T

    /**
    use this one if the function is a production. It parses multiple consecutive nodes to build the target value. If the function is a refiner, use consume_component instead. The difference is that a production can consume multiple nodes, while a refiner consumes only one node.
    */
    defer_parsing_to_component: <T extends p_di.Value>(
        func: Production<T>
    ) => T
    /**
     * use this if the to be called function is a refiner. It consumes one node, and returns the result of the refiner. If the function is a production, use defer_parsing_to_component instead. The difference is that a production can consume multiple nodes, while a refiner consumes only one node.
     */
    consume_component: <T extends p_di.Value>(
        func: Refiner<T>
    ) => T
    /**
     * Consumes the next node and processes its children with the given callback.
     * The callback receives a new Iterator_Context over the children of the consumed node.
     * Reports an error if any children remain unconsumed after the callback returns.
     * Use this when the current node acts as a container (e.g., a SyntaxList or a compound AST node).
     */
    consume_and_parse_children_as_type: <T extends p_di.Value>(
        callback: (
            context: Iterator_Context
        ) => T
    ) => T

    /**
     * to consume a node that has no value and no children
     */
    consume_keyword: (
    ) => d_primitives.Keyword

    /**
     * Consumes the next node and discards its contents (including children). Use only when the content is irrelevant
     * and you explicitly do not want to process it. Avoid in favour of properly typed consume_* calls.
     */
    consume_blob: (
    ) => d_primitives.Blob

    /**
     * to consume a node that has a value and no children
     */
    consume_literal: (
    ) => d_primitives.Literal

    /**
     * use this to consume a list of nodes, where the list is terminated by a node that is not part of the list. The callback is called for each node in the list, and must consume it via a consume_* call. The callback must return a value for each node, which will be collected into a list and returned.
     */
    parse_partial_list: <T extends p_di.Value>(
        has_more_items: (
            kind: string
        ) => boolean,
        callback: (
            context: Iterator_Context
        ) => T
    ) => p_di.List<T>

    /**
     * checks if there is a next node, and if so, calls the callback. This function does not consume the node, and the callback is responsible for consuming it if it wants to.
     */
    consume_and_parse_children_as_separated_list: <T extends p_di.Value>(
        separator_kind: string,
        callback: (
            context: Iterator_Context
        ) => T
    ) => h_i.Separated_List<T>

    /**
     * consumes the next node and processes its children with the given callback.
     * The callback receives a new Iterator_Context over the children of the consumed node.
     * Reports an error if any children remain unconsumed after the callback returns.
     * Use this when the current node acts as a container (e.g., a SyntaxList or a compound AST node).
     * The difference with consume_and_parse_children_as_type is that this function does not expect any separators between the children.
     * Use this when the current node acts as a container (e.g., a SyntaxList or a compound AST node) and the children are not separated by any kind of separator.
     */
    consume_and_parse_children_as_non_separated_list: <T extends p_di.Value>(
        callback: (
            context: Iterator_Context
        ) => T
    ) => p_di.List<T>
}

const internal_create_node_context = (
    context_node: d_in.Node,
    abort: Abort<d_function.Error_Inner>,
    path: string,
): Node_Context => {
    return {


        parse_children_as_type: (
            callback
        ) => {
            return p_iterate({
                list: context_node.children,
                end_info: null,
                assign: (iterator) => callback(
                    internal_create_iterator_context(
                        iterator,
                        abort,
                        context_node,
                        path
                    )
                ),
                on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
            })
        },
        parse_children_as_list: (
            callback
        ) => {

            return p_iterate({
                list: context_node.children,
                end_info: null,
                assign: (iterator) => iterator.build_list({
                    'has_more_items': ($) => true,
                    'handle': () => iterator.peek(
                        ($) => P_unreachable_code_path("this callback is only called if there are more items"),
                        ($) => {
                            return callback(internal_create_iterator_context(
                                iterator,
                                abort,
                                context_node,
                                path
                            ))
                        },
                    )
                }),
                on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
            })
        }
    }
}

export const create_node_context = <T>(
    context_node: d_in.Node,
    abort: Abort<d_function.Error_Inner>,
    $p: Refiner_Parameters,
    expected_kind: string,
    callback: (context: Node_Context) => T
): T => {
    // p_debug_message(`Creating node context for kind: ${expected_kind}`, () => {});
    if (context_node.kind !== expected_kind) {
        return abort({
            'context node': context_node,
            'path': expected_kind,
            'type': ['refiner called for wrong kind', {
                'parent': $p.parent,
                'expected': expected_kind,
                'found': context_node.kind,
            }]
        })
    }
    return callback(
        internal_create_node_context(
            context_node,
            abort,
            $p.path,
        )
    )
}

export const create_root_node_context = <T>(
    context_node: d_in.Node,
    abort: Abort<d_function.Error_Inner>,
    expected_kind: string,
    callback: (context: Node_Context) => T
): T => {
    if (context_node.kind !== expected_kind) {
        return abort({
            'context node': context_node,
            'path': "root",
            'type': ['wrong root', {
                'found': context_node.kind,
            }]
        })
    }
    return callback(
        internal_create_node_context(
            context_node,
            abort,
            "root",
        )
    )
}

const internal_create_iterator_context = (
    iterator: p_pi.Iterator<d_in.Node, null>,
    abort: Abort<d_function.Error_Inner>,
    parent: d_in.Node,
    path: string,
): Iterator_Context => {

    const consume_internal = (): d_in.Node => iterator.consume(
        ($) => abort({
            'context node': parent,
            'path': path,
            'type': ['missing child', {
                'kind': p_.literal.not_set(),
            }]
        }),
        ($) => $
    )

    return {
        prop: (
            propery_name
        ) => internal_create_iterator_context(
            iterator,
            abort,
            parent,
            path + "." + propery_name
        ),
        option: (
            option_name
        ) => internal_create_iterator_context(
            iterator,
            abort,
            parent,
            path + "|" + option_name
        ),
        assert_kind: (
            kind
        ) => {
            iterator.peek(
                () => abort({
                    'context node': parent,
                    'path': path,
                    'type': ['missing child', {
                        'kind': p_.literal.set(kind),
                    }]
                }),
                ($) => {
                    if ($.kind !== kind) {
                        return abort({
                            'context node': parent,
                            'path': path,
                            'type': ['assertion failed', {
                                'expected': kind,
                                'found': $.kind,
                            }]
                        })
                    }
                    return null
                }
            )
            return internal_create_iterator_context(
                iterator,
                abort,
                parent,
                path
            )
        },
        peek_for_state: (
            callback
        ) => {
            return iterator.peek(
                () => abort({
                    'context node': parent,
                    'path': path,
                    'type': ['missing child', {
                        'kind': p_.literal.not_set(),
                    }]
                }),
                ($) => callback(
                    $.kind,
                    () => abort({
                        'context node': parent,
                        'path': path,
                        'type': ['unknown option', {
                            'found': $.kind
                        }]
                    })
                )
            )
        },
        peek_for_optional: (
            kind,
            callback
        ) => {
            return iterator.peek(
                () => p_.literal.not_set(),
                ($) => {
                    if ($.kind === kind) {
                        return p_.literal.set(callback(
                            internal_create_iterator_context(
                                iterator,
                                abort,
                                parent,
                                path
                            )
                        ))
                    } else {
                        return p_.literal.not_set()
                    }
                }
            )
        },
        optional_set_if_not: (
            kind,
            callback
        ) => {
            return iterator.peek(
                () => {
                    return p_.literal.not_set()
                },
                ($) => {
                    if ($.kind !== kind) {
                        return p_.literal.set(callback(
                            internal_create_iterator_context(
                                iterator,
                                abort,
                                parent,
                                path
                            )
                        ))
                    } else {
                        return p_.literal.not_set()
                    }
                }
            )
        },
        based_on_first_node: (
            callback
        ) => {
            return callback(
                internal_create_iterator_context(
                    iterator,
                    abort,
                    parent,
                    path
                )
            )
        },
        defer_parsing_to_component: (
            func
        ) => {
            return func(
                iterator,
                abort,
                {
                    'location description': path,
                    'parent': parent
                }
            )
        },
        consume_component: (
            func
        ) => {
            const child = consume_internal()
            return func(
                child,
                abort,
                {
                    'parent': parent,
                    'path': path
                }
            )
        },
        consume_blob: (
        ) => {
            const child = consume_internal()
            return null

        },
        consume_literal: (
        ) => {
            const child = consume_internal()
            p_t.from.list(child.children).on_has_items(
                ($) => abort({
                    'context node': parent,
                    'path': path,
                    'type': ['not a leaf', {
                        'found': child.kind
                    }]
                }),
                () => null
            )
            return child

        },
        consume_keyword: (
        ) => {
            const child = consume_internal()
            p_t.from.list(child.children).on_has_items(
                ($) => abort({
                    'context node': parent,
                    'path': path,
                    'type': ['not a leaf', {
                        'found': child.kind
                    }]
                }),
                () => null
            )
            return null
        },
        parse_partial_list: (
            has_more_items,
            callback
        ) => {
            return iterator.build_list({
                'has_more_items': ($) => has_more_items($.kind),
                'handle': () => {
                    return callback(
                        internal_create_iterator_context(
                            iterator,
                            abort,
                            parent,
                            path
                        )
                    )
                }
            })
        },
        consume_and_parse_children_as_type: (
            callback
        ) => {
            const child = consume_internal()
            return p_iterate({
                list: child.children,
                end_info: null,
                assign: (iterator) => callback(
                    internal_create_iterator_context(
                        iterator,
                        abort,
                        child,
                        path
                    )
                ),
                on_dangling_item: ($) => abort({
                    'context node': parent,
                    'path': path,
                    'type': ['dangling child', {
                        'found': $
                    }]
                }),
            })
        },
        consume_and_parse_children_as_separated_list: (
            separator_kind,
            callback
        ) => {
            const child = consume_internal()

            return p_iterate({
                list: child.children,
                end_info: null,
                assign: (iterator) => iterator.build_list({
                    'has_more_items': ($) => true,
                    'handle': () => {

                        return iterator.peek(
                            ($) => P_unreachable_code_path("this callback is only called if there are more items"),
                            ($) => {
                                if ($.kind === separator_kind) {
                                    iterator.consume(
                                        ($) => P_unreachable_code_path("this callback is only called if there are more items"),
                                        ($) => null
                                    )
                                    return ['separator', null]
                                } else {
                                    return ['entry', callback(internal_create_iterator_context(
                                        iterator,
                                        abort,
                                        child,
                                        path
                                    ))]
                                }
                            },
                        )
                    }
                }),
                on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
            })
        },
        consume_and_parse_children_as_non_separated_list: (
            callback
        ) => {
            const child = consume_internal()

            return p_iterate({
                list: child.children,
                end_info: null,
                assign: (iterator) => iterator.build_list({
                    'has_more_items': ($) => true,
                    'handle': () => {

                        return iterator.peek(
                            ($) => P_unreachable_code_path("this callback is only called if there are more items"),
                            ($) => callback(
                                internal_create_iterator_context(
                                    iterator,
                                    abort,
                                    child,
                                    path
                                )),
                        )
                    }
                }),
                on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
            })
        },
    }
}

export const create_iterator_context = <T extends p_di.Value>(
    iterator: p_pi.Iterator<d_in.Node, null>,
    abort: Abort<d_function.Error_Inner>,
    $p: Production_Parameters,
    name: string,
    callback: (context: Iterator_Context) => T
): T => {
    return callback(
        internal_create_iterator_context(
            iterator,
            abort,
            $p.parent,
            name,
        )
    )
}