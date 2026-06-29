import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import * as p_ri from 'pareto-core/dist/interface/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'
import P_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'

//data types
import * as d_in from "./modules/typescript_parser/interface/data/ast"
import * as d_function from "./interface/data/typed_ast_from_ast"
import { Abort } from 'pareto-core/dist/interface/__internal/Abort'

export type Parameters = {
    'location description': string
    'parent': d_in.Node
}

export type Refiner<T extends p_di.Value> = p_ri.Refiner_With_Parameter<
    T,
    d_function.Error_Inner,
    d_in.Node,
    Parameters
>

export type Production<T extends p_di.Value> = p_pi.Production_With_Parameter<
    T,
    d_function.Error_Inner,
    d_in.Node,
    null,
    Parameters
>

export type Iterator_Context = {
    /**
    use this one if multiple consequtive nodes need to be parsed to build the target value. If only one node is needed, use call_refiner
    */
    construct_component: <T extends p_di.Value>(
        location_description: string,
        func: p_pi.Production_With_Parameter<
            T,
            d_function.Error_Inner,
            d_in.Node,
            null,
            {
                'location description': string
                'parent': d_in.Node
            }
        >
    ) => T
    consume_component: <T extends p_di.Value>(
        location_description: string,
        func: p_ri.Refiner_With_Parameter<
            T,
            d_function.Error_Inner,
            d_in.Node,
            {
                'location description': string
                'parent': d_in.Node
            }
        >
    ) => T
    consume_group: <T extends p_di.Group>(
        location_description: string,
        kind: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ) => T
    consume_keyword: (
        location_description: string,
        kind: string,
    ) => null
    consume_state: <State extends p_di.State>(
        location_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => State
    ) => State
    consume_literal: (
        location_description: string,
        kind: string,
    ) => d_in.Node
    
    /**
     * use this one only if consume_state is not possible. This is the case if one or more of the options are not contained in a singular node.
     * if you use this function, you will have to manually consume the node(s) that you peeked at, otherwise the iterator will be in an inconsistent state.
     */
    peek_for_state: <T extends p_di.State>(
        location_description: string,
        callback: (
            node: d_in.Node,
        ) => T
    ) => T
    consume_syntax_list: <T extends p_di.Value>(
        location_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context
        ) => T
    ) => p_di.List<T>
    optional: <T extends p_di.Value>(
        condition: ($: d_in.Node) => boolean,
        callback: (context: Iterator_Context) => T
    ) => p_di.Optional_Value<T>
}

export const create_iterator_context = <T extends p_di.Value>(
    iterator: p_pi.Iterator<d_in.Node, null>,
    abort: Abort<d_function.Error_Inner>,
    parent: d_in.Node,
    callback: (context: Iterator_Context) => T
): T => {

    const consume_internal = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        parent: d_in.Node,
        location_description: string,
        callback: (node: d_in.Node, parent: d_in.Node) => T
    ): T => iterator.consume(
        ($) => abort({
            'context': location_description,
            'parent': parent,
            'cause': ['end of node list', null],
            'expected': ['something', location_description]
        }),
        ($) => callback(
            $,
            parent,
        )
    )

    return callback({

        peek_for_state: (
            location_description,
            callback
        ) => {
            return iterator.peek(
                ($) => abort({
                    'context': location_description,
                    'parent': parent,
                    'cause': ['end of node list', null],
                    'expected': ['something', location_description]
                }),
                ($) => callback(
                    $,
                )
            )
        },
        consume_group: (
            location_description,
            kind,
            callback
        ) => {
            return consume_internal(
                iterator,
                abort,
                parent,
                location_description,
                ($, parent) => create_node_context(
                    $,
                    abort,
                    (context) => {

                        if ($.kind !== kind) {
                            return abort({
                                'parent': parent,
                                'cause': ['unexpected node', $],
                                'expected': ['something', kind],
                                'context': location_description
                            })
                        } else return callback(
                            $,
                            context
                        )
                    }
                )
            )
        },
        consume_state: (
            location_description,
            callback
        ) => {
            return consume_internal(
                iterator,
                abort,
                parent,
                location_description,
                ($, parent) => create_node_context(
                    $,
                    abort,
                    (context) => callback(
                        $,
                        context
                    )
                )
            )
        },
        consume_component: (
            location_description,
            func
        ) => {
            return consume_internal(
                iterator,
                abort,
                parent,
                location_description,
                ($, parent) => create_node_context(
                    $,
                    abort,
                    (context) => func(
                        $,
                        abort,
                        {
                            'location description': location_description,
                            'parent': parent
                        }
                    )
                )
            )
        },
        consume_literal: (
            location_description,
            kind,
        ) => {
            return consume_internal(
                iterator,
                abort,
                parent,
                location_description,
                ($, parent) => {
                    // if ($.type[0] !== 'literal') {
                    //     return P_unreachable_code_path("error in the parser; consuming a node as a literal, but the node is not a literal")
                    // }
                    if ($.kind !== kind) {
                        return abort({
                            'parent': parent,
                            'cause': ['unexpected node', $],
                            'expected': ['something', kind],
                            'context': location_description
                        })
                    } else return $
                }
            )
        },
        consume_keyword: (
            location_description,
            kind,
        ) => {
            return consume_internal(
                iterator,
                abort,
                parent,
                location_description,
                ($, parent) => {
                    // if ($.type[0] !== 'keyword or punctuation') {
                    //     return P_unreachable_code_path("error in the parser; consuming a node as a keyword or punctuation, but the node is not a keyword or punctuation")
                    // }
                    if ($.kind !== kind) {
                        return abort({
                            'parent': parent,
                            'cause': ['unexpected node', $],
                            'expected': ['something', kind],
                            'context': location_description
                        })
                    } else return null
                }
            )
        },
        consume_syntax_list: (
            location_description,
            callback
        ) => {
            const list_with_syntaxlist_wrapper_x = <T extends p_di.Value>(
                $: d_in.Node,
                parent: d_in.Node,
                abort: Abort<d_function.Error_Inner>,
                location_description: string,
                callback: (node: d_in.Node) => T
            ): p_di.List<T> => $.kind !== "SyntaxList"
                    ? abort({
                        'parent': parent,
                        'context': location_description,
                        'cause': ['unexpected node', $],
                        'expected': ['something', `SyntaxList (${location_description})`]
                    })
                    : p_iterate({
                        list: $.children,
                        end_info: null,
                        assign: (iterator) => iterator.build_list({
                            'has_more_items': ($) => true,
                            'handle': () => iterator.consume(
                                ($) => P_unreachable_code_path("has more items -> true"),
                                ($): T => callback($),
                            )
                        }),
                        on_dangling_item: ($) => abort({
                            'context': location_description,
                            'parent': parent,
                            'cause': ['unexpected node', $],
                            'expected': ['nothing', null]
                        }),
                    })
            return consume_internal(
                iterator,
                abort,
                parent,
                location_description,
                ($) => {
                    return list_with_syntaxlist_wrapper_x(
                        $,
                        parent,
                        abort,
                        location_description,
                        ($) => create_node_context(
                            $,
                            abort,
                            (context) => callback(
                                $,
                                context
                            )
                        )

                    )
                }
            )
        },
        construct_component: (
            location_description,
            func
        ) => {
            return func(
                iterator,
                abort,
                {
                    'location description': location_description,
                    'parent': parent
                }
            )
        },
        optional: (
            condition,
            callback
        ) => {
            return iterator.peek(
                () => p_.literal.not_set(),
                ($) => {
                    if (condition($)) {
                        return p_.literal.set(create_iterator_context(
                            iterator,
                            abort,
                            parent,
                            callback
                        ))
                    } else {
                        return p_.literal.not_set()
                    }
                }
            )
        }
    })
}

export type Node_Context = {

    abort: Abort<string>
    assert_kind: <T extends p_di.Value>(
        location_description: string,
        expected_kind: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ) => T
    parse_children: <T extends p_di.Value>(
        location_description: string,
        callback: (
            context: Iterator_Context
        ) => T
    ) => T
    call_with_this_node: <T extends p_di.Value>(
        location_description: string,
        func: p_ri.Refiner_With_Parameter<
            T,
            d_function.Error_Inner,
            d_in.Node,
            {
                'location description': string
                'parent': d_in.Node
            }
        >
    ) => T
    process_children_as_list: <T extends p_di.Value>(
        location_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context
        ) => T
    ) => p_di.List<T>
}

export const create_node_context = <T>(
    node: d_in.Node,
    abort: Abort<d_function.Error_Inner>,
    callback: (context: Node_Context) => T
): T => {
    const process_children_as_group_x = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        location_description: string,
        callback: (
            context: Iterator_Context
        ) => T
    ): T => {
        const parent = $

        return p_iterate({
            list: $.children,
            end_info: null,
            assign: (iterator): T => create_iterator_context(
                iterator,
                abort,
                parent,
                (context) => callback(
                    context
                )
            ),
            on_dangling_item: ($) => abort({
                'parent': parent,
                'context': location_description,
                'cause': ['unexpected node', $],
                'expected': ['nothing', null]
            }),
        })
    }

    const process_children_as_list_x = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ): p_di.List<T> => {
        return p_iterate({
            list: $.children,
            end_info: null,
            assign: (iterator) => iterator.build_list({
                'has_more_items': ($) => true,
                'handle': () => iterator.consume(
                    ($) => P_unreachable_code_path("has more items -> true"),
                    ($): T => create_node_context(
                        $,
                        abort,
                        (context) => callback($, context)
                    )
                )
            }),
            on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
        })
    }
    return callback({
        assert_kind: (
            location_description,
            expected_kind,
            callback
        ) => {
            if (node.kind !== expected_kind) {
                return abort({
                    'parent': node,
                    'cause': ['unexpected node', node],
                    'expected': ['something', expected_kind],
                    'context': location_description
                })
            }
            return create_node_context(
                node,
                abort,
                (context) => callback(
                    node,
                    context
                )
            )
        },
        call_with_this_node: (
            location_description,
            func
        ) => func(
            node,
            abort,
            {
                'location description': location_description,
                'parent': node
            }
        ),


        parse_children: (
            location_description,
            callback
        ) => process_children_as_group_x(
            node,
            abort,
            location_description,
            (context) => callback(context)

        ),
        process_children_as_list: (
            location_description,
            callback
        ) => process_children_as_list_x(
            node,
            abort,
            (node, context) => callback(node, context)
        ),
        'abort': ($) => abort({
            'parent': node,
            'cause': ['unexpected node', node],
            'expected': ['something', $],
            'context': $
        })
    })
}