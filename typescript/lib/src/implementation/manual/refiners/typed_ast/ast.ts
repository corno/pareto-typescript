import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import * as p_di from 'pareto-core/dist/interface/data'
import p_assert from 'pareto-core/dist/implementation/refiner/specials/assert'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'
import P_unreachable_code_path from 'pareto-core/dist/implementation/transformer/specials/unreachable_code_path'

//data types
import * as d_in from "../../../../modules/typescript_parser/interface/data/ast"
import * as d_out from "../../../../interface/data/typed_ast"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_function from "../../../../interface/data/typed_ast_from_ast"
import { Abort } from 'pareto-core/dist/interface/__internal/Abort'

namespace helpers {


    export const syntax_list = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            name: string,
            parent: d_in.Node
        },
        callback: (node: d_in.Node) => T
    ): p_di.List<T> => iterator.consume_with_expectation(
        ['something', p_.literal.list([`SyntaxList (${$p.name})`])] as d_function.Expected,
        ($, expectation) => abort({
            'cause': ['end of node list', {
                'parent': $p.parent
            }],
            'expected': expectation
        }),
        ($, expectation) => $.kind !== "SyntaxList"
            ? abort({
                'cause': ['unexpected node', $],
                'expected': expectation
            })
            : p_iterate({
                'list': $.children,
                'end_info': null,
                'on_dangling_item': ($) => abort({
                    'cause': ['unexpected node', $],
                    'expected': ['nothing', null]
                }),
                'assign': (iterator) => iterator.build_list({
                    'has_more_items': ($) => true,
                    'handle': () => iterator.consume(
                        ($) => P_unreachable_code_path("has more items -> true"),
                        ($): T => callback($),
                    )
                })
            }),
    )

    export const iterate = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        callback: (iterator: p_pi.Iterator<d_in.Node, null>) => T
    ): T => p_iterate({
        'list': $.children,
        'end_info': null,
        'on_dangling_item': ($) => abort({
            'cause': ['unexpected node', $],
            'expected': ['nothing', null]
        }),
        'assign': (iterator): T => callback(iterator)
    })

    export const consume_with_expectation = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        expected: string[],
        parent: d_in.Node,
        callback: (node: d_in.Node, abort: Abort<null>) => T
    ): T => iterator.consume_with_expectation(
        ['something', p_.literal.list(expected)] as d_function.Expected,
        ($, expectation) => abort({
            'cause': ['end of node list', {
                'parent': parent
            }],
            'expected': expectation
        }),
        ($, expectation) => {
            const my_node = $
            return callback(
                $,
                ($) => abort({
                    'cause': ['unexpected node', my_node],
                    'expected': expectation
                })
            )
        },
    )

}

export const Source_File: p_i.Refiner_With_Parameter<
    d_out.Source_File,
    d_function.Error,
    d_in.Node,
    {
        'path': d_path.Node_Path
    }
> = ($, abort, $p) => Source_File_Inner(
    $,
    ($) => abort({
        'path': $p.path,
        'inner': $,
    })
)

export const Source_File_Inner: p_i.Refiner<
    d_out.Source_File,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => {
    const $v_node = $
    return p_assert(
        abort,
        () => $.kind === "SourceFile"
            ? p_.literal.not_set()
            : p_.literal.set({
                'cause': ['unexpected node', $],
                'expected': ['something', p_.literal.list(["Source File"])]
            }),
        () => helpers.iterate(
            $,
            abort,
            (iterator) => {
                return {
                    'statements': Statements(
                        iterator,
                        abort,
                        {
                            'parent': $
                        }
                    ),
                    'end of file': iterator.consume_with_expectation(
                        ['something', p_.literal.list(["EndOfFileToken"])] as d_function.Expected,
                        ($, expectation) => abort({
                            'cause': ['end of node list', {
                                'parent': $v_node
                            }],
                            'expected': expectation
                        }),
                        ($, expectation) => p_assert(
                            abort,
                            () => $.kind === "EndOfFileToken"
                                ? p_.literal.not_set()
                                : p_.literal.set({
                                    'cause': ['unexpected node', $],
                                    'expected': expectation
                                }),
                            () => null
                        ),
                    ),
                }
            }
        )
    )
}

export const Statements: p_pi.Production_With_Parameter<
    d_out.Statements,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node
    }
> = (iterator, abort, $p) => {
    return helpers.syntax_list(
        iterator,
        abort,
        {
            'name': "Statements",
            'parent': $p.parent
        },
        ($): d_out.Statement => {
            switch ($.kind) {
                case "ImportDeclaration": return ['import declaration', helpers.iterate(
                    $,
                    abort,
                    (iterator) => ({
                        'import keyword': helpers.consume_with_expectation(
                            iterator,
                            abort,
                            ["ImportKeyword"],
                            $p.parent,
                            ($, abort) => $.kind !== "ImportKeyword"
                                ? abort(null)
                                : $,
                        ),
                        'clause': helpers.consume_with_expectation(
                            iterator,
                            abort,
                            ["ImportClause"],
                            $p.parent,
                            ($, abort) => $.kind !== "ImportClause"
                                ? abort(null)
                                : $,
                        ),
                        'from keyword': helpers.consume_with_expectation(
                            iterator,
                            abort,
                            ["FromKeyword"],
                            $p.parent,
                            ($, abort) => $.kind !== "FromKeyword"
                                ? abort(null)
                                : $,
                        ),
                    })
                )]
                case "ModuleDeclaration": return ['module declaration', helpers.iterate(
                    $,
                    abort,
                    (iterator): d_out.Module_Declaration => ({
                        'namespaces': helpers.syntax_list(
                            iterator,
                            abort,
                            {
                                'name': "ModuleDeclaration",
                                'parent': $p.parent
                            },
                            ($): d_out.Namespace_Declaration => {
                                switch ($.kind) {
                                    // case "ModuleBlock": return {}
                                    default: return abort({
                                        'cause': ['unexpected node', $],
                                        'expected': ['something', p_.literal.list(["FOOO"])]
                                    })
                                }
                            },
                        )
                    })
                )]
                default: return abort({
                    'cause': ['unexpected node', $],
                    'expected': ['something', p_.literal.list([
                        "ImportDeclaration",
                        "ModuleDeclaration"
                    ])]
                })
            }
        }
    )
}
