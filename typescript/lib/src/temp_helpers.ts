import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_t from 'pareto-core/dist/implementation/transformer'
import * as p_pi from 'pareto-core/dist/interface/production'
import * as p_ri from 'pareto-core/dist/interface/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'
import P_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'
import p_debug_message from 'pareto-core-dev/dist/log_debug_message'

//data types
import * as d_in from "./modules/typescript_parser_api/interface/data/dynamic_ast"
import * as d_function from "./interface/data/typed_ast_from_ast"
import * as d_primitives from "./interface/data/primitives"
import { Abort } from 'pareto-core/dist/interface/__internal/Abort'

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

export type Separated_List<T extends p_di.Value> = p_di.List<
    | ['separator', null]
    | ['entry', T]
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
     * increments the path with the given property name, and returns a new iterator context for the next child. The path is used for error reporting
     */
    prop: (
        propery_name: string
    ) => Iterator_Context
    /**
     * increments the path with the name of the selected option, and returns a new iterator context for the next child. The path is used for error reporting
     */
    option: (
        option_name: string
    ) => Iterator_Context

    /**
     * makes sure that the next child is of the given kind, and returns the same iterator. No need to use it if this was the match of the switch/case statement
     */
    assert_kind: (
        kind: string
    ) => Iterator_Context

    /**
     * if you need to set a state, use this to get access to the kind of the next child, and set a state based on that. If there is no next child, the callback will be skipped.
     * The callback can call the abort function to abort the parsing, or return a state. The state will be returned by this function.
     */
    peek_for_state: <T extends p_di.State>(
        callback: (
            kind: string,
            abort: Abort<null>,
        ) => T
    ) => T

    /**
     * tests the kind of the next child, and if it matches the given kind, consumes it and returns the result of the callback. If it doesn't match, returns a not_set option.
     */
    optional: <T extends p_di.Value>(
        kind: string,
        callback: (context: Iterator_Context) => T
    ) => p_di.Optional_Value<T>
    optional_set_if_not: <T extends p_di.Value>(
        kind: string,
        callback: (context: Iterator_Context) => T
    ) => p_di.Optional_Value<T>

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
     * 
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
     * 
     * for nodes that can have children, but when you don't want to process them
     */
    consume_blob: (
    ) => d_primitives.Blob

    /**
     * to consume a node that has a value and no children
     */
    consume_literal: (
    ) => d_primitives.Literal
    consume_and_parse_children_as_separated_list: <T extends p_di.Value>(
        separator_kind: string,
        callback: (
            context: Iterator_Context
        ) => T
    ) => Separated_List<T>
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
        optional: (
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