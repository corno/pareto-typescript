import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import * as p_ri from 'pareto-core/dist/interface/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'
import P_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'

//data types
import * as d_in from "./modules/typescript_parser_api/interface/data/dynamic_ast"
import * as d_function from "./interface/data/typed_ast_from_ast"
import { Abort } from 'pareto-core/dist/interface/__internal/Abort'

export type Signature_Parameters = {
    'location description': string
    'parent': d_in.Node
}
export type Helper_Parameters = {
    'location description': string
    'parent': d_in.Node
    'module name': string
}

export type Refiner<T extends p_di.Value> = p_ri.Refiner_With_Parameter<
    T,
    d_function.Error_Inner,
    d_in.Node,
    Signature_Parameters
>

export type Production<T extends p_di.Value> = p_pi.Production_With_Parameter<
    T,
    d_function.Error_Inner,
    d_in.Node,
    null,
    Signature_Parameters
>

export type Iterator_Context = {
    /**
    use this one if multiple consequtive nodes need to be parsed to build the target value. If only one node is needed, use call_refiner
    */
    construct_component: <T extends p_di.Value>(
        internal_path_description: string,
        func: p_pi.Production_With_Parameter<
            T,
            d_function.Error_Inner,
            d_in.Node,
            null,
            Signature_Parameters
        >
    ) => T
    consume_component: <T extends p_di.Value>(
        internal_path_description: string,
        func: p_ri.Refiner_With_Parameter<
            T,
            d_function.Error_Inner,
            d_in.Node,
            Signature_Parameters
        >
    ) => T
    consume_group: <T extends p_di.Group>(
        internal_path_description: string,
        kind: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ) => T
    consume_keyword: (
        internal_path_description: string,
        kind: string,
    ) => null
    consume_state: <State extends p_di.State>(
        internal_path_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => State
    ) => State
    consume_literal: (
        internal_path_description: string,
        kind: string,
    ) => d_in.Node

    /**
     * use this one only if consume_state is not possible. This is the case if one or more of the options are not contained in a singular node.
     * if you use this function, you will have to manually consume the node(s) that you peeked at, otherwise the iterator will be in an inconsistent state.
     */
    peek_for_state: <T extends p_di.State>(
        internal_path_description: string,
        callback: (
            node: d_in.Node,
        ) => T
    ) => T
    consume_syntax_list: <T extends p_di.Value>(
        internal_path_description: string,
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
    $p: Helper_Parameters,
    callback: (context: Iterator_Context) => T
): T => {

    const consume_internal = <T extends p_di.Value>(
        internal_path_description: string,
        callback: (node: d_in.Node, parent: d_in.Node) => T
    ): T => iterator.consume(
        ($) => abort({
            'parent': $p.parent,
            'problem': ['end of node list', null],
            'module name': $p['module name'],
            'external location description': $p['location description'],
            'internal path description': internal_path_description,
        }),
        ($) => callback(
            $,
            $p.parent,
        )
    )

    return callback({

        peek_for_state: (
            internal_path_description,
            callback
        ) => {
            return iterator.peek(
                ($) => abort({
                    'parent': $p.parent,
                    'problem': ['end of node list', null],
                    'external location description': $p['location description'],
                    'module name': $p['module name'],
                    'internal path description': internal_path_description,
                }),
                ($) => callback(
                    $,
                )
            )
        },
        consume_group: (
            internal_path_description,
            kind,
            callback
        ) => {
            return consume_internal(
                internal_path_description,
                ($, parent) => create_node_context(
                    $,
                    abort,
                    {
                        
                        'parent': parent,
                        'location description': $p['location description'] + ">" + internal_path_description,
                        'module name': $p['module name'],
                    },
                    (context) => {

                        if ($.kind !== kind) {
                            return abort({
                                'parent': parent,
                                'problem': ['unexpected node', $],
                                'external location description': $p['location description'],
                                'module name': $p['module name'],
                                'internal path description': internal_path_description,
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
            internal_path_description,
            callback
        ) => {
            return consume_internal(
                internal_path_description,
                ($, parent) => create_node_context(
                    $,
                    abort,
                    {
                        'parent': parent,
                        'module name': $p['module name'],
                        'location description': $p['location description'],
                    },
                    (context) => callback(
                        $,
                        context
                    )
                )
            )
        },
        consume_component: (
            internal_path_description,
            func
        ) => {
            return consume_internal(
                internal_path_description,
                ($, parent) => create_node_context(
                    $,
                    abort,
                    {
                        'location description': $p['location description'],
                        'parent': parent,
                        'module name': $p['module name'],
                    },
                    (context) => func(
                        $,
                        abort,
                        {
                            'location description': internal_path_description,
                            'parent': parent
                        }
                    )
                )
            )
        },
        consume_literal: (
            internal_path_description,
            kind,
        ) => {
            return consume_internal(
                internal_path_description,
                ($, parent) => {
                    // if ($.type[0] !== 'literal') {
                    //     return P_unreachable_code_path("error in the parser; consuming a node as a literal, but the node is not a literal")
                    // }
                    if ($.kind !== kind) {
                        return abort({
                            'parent': parent,
                            'problem': ['unexpected node', $],
                            'external location description': $p['location description'],
                            'module name': $p['module name'],
                            'internal path description': internal_path_description,
                        })
                    } else return $
                }
            )
        },
        consume_keyword: (
            internal_path_description,
            kind,
        ) => {
            return consume_internal(
                internal_path_description,
                ($, parent) => {
                    // if ($.type[0] !== 'keyword or punctuation') {
                    //     return P_unreachable_code_path("error in the parser; consuming a node as a keyword or punctuation, but the node is not a keyword or punctuation")
                    // }
                    if ($.kind !== kind) {
                        return abort({
                            'parent': parent,
                            'problem': ['unexpected node', $],
                            'external location description': $p['location description'],
                            'module name': "Keyword",
                            'internal path description': internal_path_description,
                        })
                    } else return null
                }
            )
        },
        consume_syntax_list: (
            internal_path_description,
            callback
        ) => {
            const list_with_syntaxlist_wrapper_x = <T extends p_di.Value>(
                $: d_in.Node,
                parent: d_in.Node,
                abort: Abort<d_function.Error_Inner>,
                internal_path_description: string,
                callback: (node: d_in.Node) => T
            ): p_di.List<T> => $.kind !== "SyntaxList"
                    ? abort({
                        'parent': parent,
                        'problem': ['unexpected node', $],
                        'external location description': $p['location description'],
                        'internal path description': internal_path_description,
                        'module name': $p['module name'],
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
                            'parent': parent,
                            'problem': ['unexpected node', $],
                            'external location description': $p['location description'],
                            'internal path description': internal_path_description,
                            'module name': $p['module name'],
                        }),
                    })
            return consume_internal(
                internal_path_description,
                ($) => {
                    return list_with_syntaxlist_wrapper_x(
                        $,
                        $p.parent,
                        abort,
                        internal_path_description,
                        ($) => create_node_context(
                            $,
                            abort,
                            $p,
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
            internal_path_description,
            func
        ) => {
            return func(
                iterator,
                abort,
                {
                    'location description': $p['location description'] + ":" + internal_path_description,
                    'parent': $p.parent
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
                            $p,
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
        internal_path_description: string,
        expected_kind: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ) => T
    parse_children: <T extends p_di.Value>(
        internal_path_description: string,
        callback: (
            context: Iterator_Context
        ) => T
    ) => T
    call_with_this_node: <T extends p_di.Value>(
        internal_path_description: string,
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
        internal_path_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context
        ) => T
    ) => p_di.List<T>
}

export const create_node_context = <T>(
    context_node: d_in.Node,
    abort: Abort<d_function.Error_Inner>,
    $p: Helper_Parameters,
    callback: (context: Node_Context) => T
): T => {
    const process_children_as_group_x = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        internal_path_description: string,
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
                $p,
                (context) => callback(
                    context
                )
            ),
            on_dangling_item: ($) => abort({
                'parent': parent,
                'problem': ['unexpected node', $],
                'external location description': $p['location description'],
                'internal path description': internal_path_description,
                'module name': $p['module name'],
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
                        $p,
                        (context) => callback($, context)
                    )
                )
            }),
            on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
        })
    }
    return callback({
        assert_kind: (
            internal_path_description,
            expected_kind,
            callback
        ) => {
            if (context_node.kind !== expected_kind) {
                return abort({
                    'parent': context_node,
                    'problem': ['unexpected node', context_node],
                    'external location description': $p['location description'],
                    'module name': $p['module name'],
                    'internal path description': internal_path_description,
                })
            }
            return create_node_context(
                context_node,
                abort,
                $p,
                (context) => callback(
                    context_node,
                    context
                )
            )
        },
        call_with_this_node: (
            internal_path_description,
            func
        ) => func(
            context_node,
            abort,
            {
                'location description': internal_path_description,
                'parent': context_node
            }
        ),


        parse_children: (
            internal_path_description,
            callback
        ) => process_children_as_group_x(
            context_node,
            abort,
            internal_path_description,
            (context) => callback(context)

        ),
        process_children_as_list: (
            internal_path_description,
            callback
        ) => process_children_as_list_x(
            context_node,
            abort,
            (node, context) => callback(node, context)
        ),
        abort: (internal_path_description) => abort({
            'parent': context_node,
            'problem': ['unexpected node', context_node],
            'external location description': $p['location description'],
            'internal path description': internal_path_description,
            'module name': $p['module name'],
        })
    })
}