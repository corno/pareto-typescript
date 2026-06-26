import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import * as p_di from 'pareto-core/dist/interface/data'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'
import P_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'

//data types
import * as d_in from "./modules/typescript_parser/interface/data/ast"
import * as d_function from "./interface/data/typed_ast_from_ast"
import { Abort } from 'pareto-core/dist/interface/__internal/Abort'

export type Iterator_Context = {
    temp_parent: d_in.Node
    consume: <T extends p_di.Value>(
        location_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ) => T
    consume_and_expect: <T extends p_di.Value>(
        location_description: string,
        kind: string,
        callback: (
            node: d_in.Node,
            context: Node_Context,
        ) => T
    ) => T
    consume_syntax_list: <T extends p_di.Value>(
        location_description: string,
        callback: (
            node: d_in.Node,
            context: Node_Context
        ) => T
    ) => p_di.List<T>
    call: <T extends p_di.Value>(
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
    const consume_deprecated = <T extends p_di.Value>(
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
        temp_parent: parent,
        consume: (
            location_description,
            callback
        ) => {
            return consume_deprecated(
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
        consume_and_expect: (
            location_description,
            kind,
            callback
        ) => {
            return consume_deprecated(
                iterator,
                abort,
                parent,
                location_description,
                ($, parent) => $.kind !== kind
                    ? abort({
                        'parent': parent,
                        'cause': ['unexpected node', $],
                        'expected': ['something', kind],
                        'context': location_description
                    })
                    : create_node_context(
                        $,
                        abort,
                        (context) => callback(
                            $,
                            context
                        )
                    )
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
            return consume_deprecated(
                iterator,
                abort,
                parent,
                location_description,
                ($) => {
                    const my_node = $
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
        call: (
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
    parse_children: <T extends p_di.Value>(
        location_description: string,
        callback: (
            context: Iterator_Context
        ) => T
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
        const parent = $
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