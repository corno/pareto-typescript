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

namespace iterator_helpers {

    export const list_with_syntaxlist_wrapper = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            context: string,
            parent: d_in.Node
        },
        callback: (node: d_in.Node) => T
    ): p_di.List<T> => iterator.consume(
        ($) => abort({
            'context': $p.context,
            'cause': ['end of node list', {
                'parent': $p.parent
            }],
            'expected': ['something', p_.literal.list([`SyntaxList (${$p.context})`])]
        }),
        ($) => node_helpers.list_with_syntaxlist_wrapper(
            $,
            abort,
            {
                'context': $p.context,
                'parent': $p.parent
            },
            callback

        )
    )

    export const choice = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        context: string,
        expected: string[],
        parent: d_in.Node,
        callback: (node: d_in.Node, abort: Abort<null>) => T
    ): T => iterator.consume_with_expectation(
        ['something', p_.literal.list(expected)] as d_function.Expected,
        ($, expectation) => abort({
            'context': context,
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
                    'context': context,
                    'cause': ['unexpected node', my_node],
                    'expected': expectation
                })
            )
        },
    )

    export const specific_node = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        context: string,
        expected_node_name: string,
        parent: d_in.Node,
        callback: (node: d_in.Node) => T
    ): T => iterator.consume_with_expectation(
        ['something', p_.literal.list([expected_node_name])] as d_function.Expected,
        ($, expectation) => abort({
            'context': context,
            'cause': ['end of node list', {
                'parent': parent
            }],
            'expected': expectation
        }),
        ($, expectation) => {
            const my_node = $
            return $.kind !== expected_node_name
                ? abort({
                    'context': context,
                    'cause': ['unexpected node', my_node],
                    'expected': expectation
                })
                : callback(
                    $,
                )
        },
    )

    export const consume = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        description: string,
        parent: d_in.Node,
        callback: (node: d_in.Node) => T
    ): T => iterator.consume(
        ($) => abort({
            'context': description,
            'cause': ['end of node list', {
                'parent': parent
            }],
            'expected': ['something', p_.literal.list([description])]
        }),
        ($) => callback(
            $,
        )
    )

    export const consume_and_expect = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        description: string,
        kind: string,
        parent: d_in.Node,
        callback: (node: d_in.Node) => T
    ): T => iterator.consume(
        ($) => abort({
            'context': description,
            'cause': ['end of node list', {
                'parent': parent
            }],
            'expected': ['something', p_.literal.list([description])]
        }),
        ($) => node_helpers.expect_specific_node(
            $,
            abort,
            kind,
            description,
            callback
        )
    )

}


namespace node_helpers {

    export const expect_specific_node = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        kind: string,
        description: string,
        callback: (node: d_in.Node) => T

    ): T => $.kind !== kind
            ? abort({
                'context': description,
                'cause': ['unexpected node', $],
                'expected': ['something', p_.literal.list([description])]
            })
            : callback($)

    export const list_with_syntaxlist_wrapper = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            context: string,
            parent: d_in.Node
        },
        callback: (node: d_in.Node) => T
    ): p_di.List<T> => $.kind !== "SyntaxList"
            ? abort({
                'context': $p.context,
                'cause': ['unexpected node', $],
                'expected': ['something', p_.literal.list([`SyntaxList (${$p.context})`])]
            })
            : p_iterate({
                'list': $.children,
                'end_info': null,
                'on_dangling_item': ($) => abort({
                    'context': $p.context,
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
            })



    export const list_without_syntaxlist_wrapper = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            context: string,
        },
        callback: (node: d_in.Node) => T
    ): p_di.List<T> => p_iterate({
        'list': $.children,
        'end_info': null,
        'on_dangling_item': ($) => abort({
            'context': $p.context,
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
    })

    export const group = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        context: string,
        callback: (iterator: p_pi.Iterator<d_in.Node, null>) => T
    ): T => p_iterate({
        'list': $.children,
        'end_info': null,
        'on_dangling_item': ($) => abort({
            'context': context,
            'cause': ['unexpected node', $],
            'expected': ['nothing', null]
        }),
        'assign': (iterator): T => callback(iterator)
    })

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
                'expected': ['something', p_.literal.list(["Source File"])],
                'context': "SourceFile"
            }),
        () => node_helpers.group(
            $,
            abort,
            "SourceFile",
            (iterator) => {
                return {
                    'statements': StatementsX(
                        iterator,
                        abort,
                        {
                            'parent': $
                        }
                    ),
                    'end of file': iterator.consume_with_expectation(
                        ['something', p_.literal.list(["EndOfFileToken"])] as d_function.Expected,
                        ($, expectation) => abort({
                            'context': "SourceFile['end of file']",
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
                                    'expected': expectation,
                                    'context': "SourceFile['end of file']"
                                }),
                            () => null
                        ),
                    ),
                }
            }
        )
    )
}

export const Statements: p_i.Refiner_With_Parameter<
    d_out.Statements,
    d_function.Error_Inner,
    d_in.Node,
    {
        'parent': d_in.Node
    }
> = ($, abort, $p) => node_helpers.list_without_syntaxlist_wrapper(
    $,
    abort,
    {
        'context': "Statements",
    },
    ($): d_out.Statement => {
        switch ($.kind) {
            case "ImportDeclaration": return ['import declaration', node_helpers.group(
                $,
                abort,
                "ImportDeclaration",
                (iterator) => ({
                    'import keyword': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ImportDeclaration['import keyword']",
                        "ImportKeyword",
                        $p.parent,
                        ($) => $
                    ),
                    'clause': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ImportDeclaration['clause']",
                        "ImportClause",
                        $p.parent,
                        ($): d_out.Import_Declaration['clause'] => node_helpers.group(
                            $,
                            abort,
                            "ImportClause",
                            (iterator): d_out.Import_Declaration['clause'] => {
                                return {
                                    'type': iterator.peek(
                                        () => abort({
                                            'context': "ImportClause['type']",
                                            'cause': ['end of node list', {
                                                'parent': $
                                            }],
                                            'expected': ['something', p_.literal.list([
                                                "NamedImports",
                                                "NamespaceImport"
                                            ])]
                                        }),
                                        ($): d_out.Import_Clause['type'] => {
                                            switch ($.kind) {
                                                case "NamedImports": return iterator_helpers.specific_node(
                                                    iterator,
                                                    abort,
                                                    "ImportClause['named imports']",
                                                    "NamedImports",
                                                    $,
                                                    ($): d_out.Import_Clause['type'] => ['named imports', node_helpers.list_without_syntaxlist_wrapper(
                                                        $,
                                                        abort,
                                                        {
                                                            'context': "ImportClause['named imports']",
                                                        },
                                                        ($): d_out.Import_Specifier => {
                                                            switch ($.kind) {
                                                                case "ImportSpecifier": return {
                                                                    'identifier': iterator_helpers.specific_node(
                                                                        iterator,
                                                                        abort,
                                                                        "ImportSpecifier['identifier']",
                                                                        "Identifier",
                                                                        $,
                                                                        ($) => $
                                                                    )
                                                                }
                                                                default: return abort({
                                                                    'context': "ImportClause['named imports']",
                                                                    'cause': ['unexpected node', $],
                                                                    'expected': ['something', p_.literal.list(["ImportSpecifier"])]
                                                                })
                                                            }
                                                        }
                                                    )]
                                                )
                                                case "NamespaceImport": return ['namespace import', iterator_helpers.specific_node(
                                                    iterator,
                                                    abort,
                                                    "NamespaceImport['identifier']",
                                                    "NamespaceImport",
                                                    $,
                                                    ($) => node_helpers.group(
                                                        $,
                                                        abort,
                                                        "NamespaceImport",
                                                        (iterator): d_out.Namespace_Import => ({
                                                            'asterisk token': iterator_helpers.specific_node(
                                                                iterator,
                                                                abort,
                                                                "NamespaceImport['asterisk token']",
                                                                "AsteriskToken",
                                                                $,
                                                                ($) => $
                                                            ),
                                                            'as keyword': iterator_helpers.specific_node(
                                                                iterator,
                                                                abort,
                                                                "NamespaceImport['as keyword']",
                                                                "AsKeyword",
                                                                $,
                                                                ($) => $
                                                            ),
                                                            'identifier': iterator_helpers.specific_node(
                                                                iterator,
                                                                abort,
                                                                "NamespaceImport['identifier']",
                                                                "Identifier",
                                                                $,
                                                                ($) => $
                                                            )
                                                        })
                                                    )
                                                )]

                                                default: return abort({
                                                    'context': "ImportClause['type']",
                                                    'cause': ['unexpected node', $],
                                                    'expected': ['something', p_.literal.list([
                                                        "NamedImports",
                                                        "NamespaceImport"
                                                    ])]
                                                })
                                            }
                                        }
                                    ),
                                    // 'name': iterator_helpers.singular_value(
                                    //     iterator,
                                    //     abort,
                                    //     "ImportClause['name']",
                                    //     "Identifier",
                                    //     $,
                                    //     ($) => $
                                    // ),
                                }
                            }
                        )
                    ),
                    'from keyword': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ImportDeclaration['from keyword']",
                        "FromKeyword",
                        $p.parent,
                        ($) => $
                    ),
                    'string literal': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ImportDeclaration['string literal']",
                        "StringLiteral",
                        $p.parent,
                        ($) => $
                    ),
                })
            )]
            case "ModuleDeclaration": return ['module declaration', node_helpers.group(
                $,
                abort,
                "ModuleDeclaration",
                (iterator): d_out.Module_Declaration => ({
                    'modifiers': Modifiers(
                        iterator,
                        abort,
                        {
                            'parent': $
                        }
                    ),
                    'namespace keyword': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ModuleDeclaration['namespace keyword']",
                        "NamespaceKeyword",
                        $p.parent,
                        ($) => $
                    ),
                    'identifier': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ModuleDeclaration['identifier']",
                        "Identifier",
                        $p.parent,
                        ($) => $
                    ),
                    'module block': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "ModuleDeclaration['module block']",
                        "ModuleBlock",
                        $p.parent,
                        ($) => node_helpers.group(
                            $,
                            abort,
                            "ModuleBlock",
                            (iterator): d_out.Module_Block => ({
                                'open brace token': iterator_helpers.specific_node(
                                    iterator,
                                    abort,
                                    "ModuleBlock['first punctuation']",
                                    "FirstPunctuation", //FirstPunctuation has the same index in the enum as OpenBraceToken,
                                    $p.parent,
                                    ($) => $
                                ),
                                'statements': StatementsX(
                                    iterator,
                                    abort,
                                    {
                                        'parent': $
                                    }
                                ),
                                'close brace token': iterator_helpers.specific_node(
                                    iterator,
                                    abort,
                                    "ModuleBlock['close brace token']",
                                    "CloseBraceToken",
                                    $p.parent,
                                    ($) => $,
                                ),
                            })
                        ),
                    ),
                })
            )]
            case "TypeAliasDeclaration": return ['type alias declaration', node_helpers.group(
                $,
                abort,
                "TypeAliasDeclaration",
                (iterator): d_out.Type_Alias_Declaration => ({
                    'modifiers': Modifiers(
                        iterator,
                        abort,
                        {
                            'parent': $
                        }
                    ),
                    'type keyword': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "TypeAliasDeclaration['type keyword']",
                        "TypeKeyword",
                        $p.parent,
                        ($) => $,
                    ),
                    'identifier': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "TypeAliasDeclaration['identifier']",
                        "Identifier",
                        $p.parent,
                        ($) => $,
                    ),
                    'first assignment': iterator_helpers.specific_node(
                        iterator,
                        abort,
                        "TypeAliasDeclaration['first assignment']",
                        "FirstAssignment",
                        $p.parent,
                        ($) => $,
                    ),
                    'type': iterator_helpers.choice(
                        iterator,
                        abort,
                        "TypeAliasDeclaration['type']",
                        ["Type"],
                        $p.parent,
                        ($, abortx) => Type(
                            $,
                            abort,
                            {
                                'parent': $
                            }
                        )
                    )
                })
            )]
            default: return abort({
                'context': "Statements",
                'cause': ['unexpected node', $],
                'expected': ['something', p_.literal.list([
                    "Statement",
                ])]
            })
        }
    }
)

export const StatementsX: p_pi.Production_With_Parameter<
    d_out.Statements,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node
    }
> = (iterator, abort, $p) => {
    return iterator_helpers.list_with_syntaxlist_wrapper(
        iterator,
        abort,
        {
            'context': "Statements",
            'parent': $p.parent
        },
        ($): d_out.Statement => {
            switch ($.kind) {
                case "ImportDeclaration": return ['import declaration', node_helpers.group(
                    $,
                    abort,
                    "ImportDeclaration",
                    (iterator) => ({
                        'import keyword': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ImportDeclaration['import keyword']",
                            "ImportKeyword",
                            $p.parent,
                            ($) => $
                        ),
                        'clause': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ImportDeclaration['clause']",
                            "ImportClause",
                            $p.parent,
                            ($): d_out.Import_Declaration['clause'] => node_helpers.group(
                                $,
                                abort,
                                "ImportClause",
                                (iterator): d_out.Import_Declaration['clause'] => {
                                    return {
                                        'type': iterator.peek(
                                            () => abort({
                                                'context': "ImportClause['type']",
                                                'cause': ['end of node list', {
                                                    'parent': $
                                                }],
                                                'expected': ['something', p_.literal.list([
                                                    "NamedImports",
                                                    "NamespaceImport"
                                                ])]
                                            }),
                                            ($): d_out.Import_Clause['type'] => {
                                                switch ($.kind) {
                                                    case "NamedImports": return iterator_helpers.specific_node(
                                                        iterator,
                                                        abort,
                                                        "ImportClause['named imports']",
                                                        "NamedImports",
                                                        $,
                                                        ($): d_out.Import_Clause['type'] => ['named imports', node_helpers.list_without_syntaxlist_wrapper(
                                                            $,
                                                            abort,
                                                            {
                                                                'context': "ImportClause['named imports']",
                                                            },
                                                            ($): d_out.Import_Specifier => {
                                                                switch ($.kind) {
                                                                    case "ImportSpecifier": return {
                                                                        'identifier': iterator_helpers.specific_node(
                                                                            iterator,
                                                                            abort,
                                                                            "ImportSpecifier['identifier']",
                                                                            "Identifier",
                                                                            $,
                                                                            ($) => $
                                                                        )
                                                                    }
                                                                    default: return abort({
                                                                        'context': "ImportClause['named imports']",
                                                                        'cause': ['unexpected node', $],
                                                                        'expected': ['something', p_.literal.list(["ImportSpecifier"])]
                                                                    })
                                                                }
                                                            }
                                                        )]
                                                    )
                                                    case "NamespaceImport": return ['namespace import', iterator_helpers.specific_node(
                                                        iterator,
                                                        abort,
                                                        "NamespaceImport['identifier']",
                                                        "NamespaceImport",
                                                        $,
                                                        ($) => node_helpers.group(
                                                            $,
                                                            abort,
                                                            "NamespaceImport",
                                                            (iterator): d_out.Namespace_Import => ({
                                                                'asterisk token': iterator_helpers.specific_node(
                                                                    iterator,
                                                                    abort,
                                                                    "NamespaceImport['asterisk token']",
                                                                    "AsteriskToken",
                                                                    $,
                                                                    ($) => $
                                                                ),
                                                                'as keyword': iterator_helpers.specific_node(
                                                                    iterator,
                                                                    abort,
                                                                    "NamespaceImport['as keyword']",
                                                                    "AsKeyword",
                                                                    $,
                                                                    ($) => $
                                                                ),
                                                                'identifier': iterator_helpers.specific_node(
                                                                    iterator,
                                                                    abort,
                                                                    "NamespaceImport['identifier']",
                                                                    "Identifier",
                                                                    $,
                                                                    ($) => $
                                                                )
                                                            })
                                                        )
                                                    )]

                                                    default: return abort({
                                                        'context': "ImportClause['type']",
                                                        'cause': ['unexpected node', $],
                                                        'expected': ['something', p_.literal.list([
                                                            "NamedImports",
                                                            "NamespaceImport"
                                                        ])]
                                                    })
                                                }
                                            }
                                        ),
                                        // 'name': iterator_helpers.singular_value(
                                        //     iterator,
                                        //     abort,
                                        //     "ImportClause['name']",
                                        //     "Identifier",
                                        //     $,
                                        //     ($) => $
                                        // ),
                                    }
                                }
                            )
                        ),
                        'from keyword': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ImportDeclaration['from keyword']",
                            "FromKeyword",
                            $p.parent,
                            ($) => $
                        ),
                        'string literal': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ImportDeclaration['string literal']",
                            "StringLiteral",
                            $p.parent,
                            ($) => $
                        ),
                    })
                )]
                case "ModuleDeclaration": return ['module declaration', node_helpers.group(
                    $,
                    abort,
                    "ModuleDeclaration",
                    (iterator): d_out.Module_Declaration => ({
                        'modifiers': Modifiers(
                            iterator,
                            abort,
                            {
                                'parent': $
                            }
                        ),
                        'namespace keyword': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ModuleDeclaration['namespace keyword']",
                            "NamespaceKeyword",
                            $p.parent,
                            ($) => $
                        ),
                        'identifier': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ModuleDeclaration['identifier']",
                            "Identifier",
                            $p.parent,
                            ($) => $
                        ),
                        'module block': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "ModuleDeclaration['module block']",
                            "ModuleBlock",
                            $p.parent,
                            ($) => node_helpers.group(
                                $,
                                abort,
                                "ModuleBlock",
                                (iterator): d_out.Module_Block => ({
                                    'open brace token': iterator_helpers.specific_node(
                                        iterator,
                                        abort,
                                        "ModuleBlock['first punctuation']",
                                        "FirstPunctuation", //FirstPunctuation has the same index in the enum as OpenBraceToken,
                                        $p.parent,
                                        ($) => $
                                    ),
                                    'statements': StatementsX(
                                        iterator,
                                        abort,
                                        {
                                            'parent': $
                                        }
                                    ),
                                    'close brace token': iterator_helpers.specific_node(
                                        iterator,
                                        abort,
                                        "ModuleBlock['close brace token']",
                                        "CloseBraceToken",
                                        $p.parent,
                                        ($) => $,
                                    ),
                                })
                            ),
                        ),
                    })
                )]
                case "TypeAliasDeclaration": return ['type alias declaration', node_helpers.group(
                    $,
                    abort,
                    "TypeAliasDeclaration",
                    (iterator): d_out.Type_Alias_Declaration => ({
                        'modifiers': Modifiers(
                            iterator,
                            abort,
                            {
                                'parent': $
                            }
                        ),
                        'type keyword': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "TypeAliasDeclaration['type keyword']",
                            "TypeKeyword",
                            $p.parent,
                            ($) => $,
                        ),
                        'identifier': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "TypeAliasDeclaration['identifier']",
                            "Identifier",
                            $p.parent,
                            ($) => $,
                        ),
                        'first assignment': iterator_helpers.specific_node(
                            iterator,
                            abort,
                            "TypeAliasDeclaration['first assignment']",
                            "FirstAssignment",
                            $p.parent,
                            ($) => $,
                        ),
                        'type': iterator_helpers.choice(
                            iterator,
                            abort,
                            "TypeAliasDeclaration['type']",
                            ["Type"],
                            $p.parent,
                            ($, abortx) => Type(
                                $,
                                abort,
                                {
                                    'parent': $
                                }
                            )
                        )
                    })
                )]
                default: return abort({
                    'context': "Statements",
                    'cause': ['unexpected node', $],
                    'expected': ['something', p_.literal.list([
                        "Statement",
                    ])]
                })
            }
        }
    )
}

export const Type: p_i.Refiner_With_Parameter<
    d_out.Type,
    d_function.Error_Inner,
    d_in.Node,
    {
        'parent': d_in.Node
    }
> = ($, abort, $p) => {
    switch ($.kind) {
        case "TypeReference": return ['type reference', node_helpers.group(
            $,
            abort,
            "TypeReference",
            (iterator): d_out.Type_Reference => ({
                'entity name': Entity_Name(
                    iterator,
                    abort,
                    {
                        'parent': $
                    }
                ),
                'type parameters': iterator.peek(
                    () => p_.literal.not_set(),
                    ($) => $.kind === "FirstBinaryOperator"
                        ? p_.literal.set(Type_Parameters(
                            iterator,
                            abort,
                            {
                                'parent': $
                            }
                        ))
                        : p_.literal.not_set(),

                )
            })
        )]
        case "LiteralType": return ['literal type', node_helpers.group(
            $,
            abort,
            "LiteralType",
            (iterator): d_out.Literal_Type => ({
                'type': iterator_helpers.choice(
                    iterator,
                    abort,
                    "LiteralType['type']",
                    ["NullKeyword"],
                    $p.parent,
                    ($, abort) => $.kind !== "NullKeyword"
                        ? abort(null)
                        : ['null', $],
                ),
            })
        )]
        case "TypeLiteral": return ['type literal', $]
        default: return abort({
            'context': "Type",
            'cause': ['unexpected node', $],
            'expected': ['something', p_.literal.list([
                "LiteralType",
                "TypeReference",
                "TypeLiteral"
            ])]
        })
    }
    // return iterator_helpers.state(
    //     iterator,
    //     abort,
    //     "Type",
    //     ["TypeReference", "TypeLiteral"],
    //     $p.parent,
    //     ($, abortx) => {
    //         switch ($.kind) {

    //         }
    //     }
    // )
}

export const Type_Parameters: p_pi.Production_With_Parameter<
    d_out.Type_Parameters,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node
    }
> = (iterator, abort, $p): d_out.Type_Parameters => ({

    'less than token': iterator_helpers.specific_node(
        iterator,
        abort,
        "Type>type reference>Reference['less than token']",
        "FirstBinaryOperator", //FirstBinaryOperator has the same index in the enum as LessThanToken, 
        //sbut is specified later in the list and is therefor selected as the name, so we unfortunately have to use this name here
        $p.parent,
        ($) => $,
    ),
    'entries': iterator_helpers.list_with_syntaxlist_wrapper(
        iterator,
        abort,
        {
            'context': "TypeReference['type parameters']",
            'parent': $p.parent
        },
        ($): d_out.Type_Parameters_Entry => {
            switch ($.kind) {
                case "CommaToken": return ['comma token', $]
                default: return ['type', Type(
                    $,
                    abort,
                    {
                        'parent': $
                    }
                )]
            }
        }
    ),
    'greater than token': iterator_helpers.specific_node(
        iterator,
        abort,
        "TypeReference['greater than token']",
        "GreaterThanToken",
        $p.parent,
        ($) => $,
    ),
})

export const Entity_Name: p_pi.Production_With_Parameter<
    d_out.Entity_Name,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node
    }
> = (iterator, abort, $p) => iterator_helpers.choice(
    iterator,
    abort,
    "Entity Name",
    ["FirstNode"],
    $p.parent,
    ($): d_out.Entity_Name => {
        switch ($.kind) {
            case "FirstNode": return ['qualified name', iterator_helpers.specific_node(
                iterator,
                abort,
                "EntityName['qualified name']",
                "FirstNode",
                $p.parent,
                ($): d_out.Qualified_Name => Qualified_Name(
                    $,
                    abort,
                    {
                        'parent': $p.parent
                    }
                )
            )]
            case "Identifier": return ['identifier', $]
            default: return abort({
                'context': "TypeReference['entity name']",
                'cause': ['unexpected node', $],
                'expected': ['something', p_.literal.list(["FirstNode", "Identifier"])]
            })
        }
    },
)

export const Qualified_Name: p_i.Refiner_With_Parameter<
    d_out.Qualified_Name,
    d_function.Error_Inner,
    d_in.Node,
    {
        'parent': d_in.Node
    }
> = ($, abort, $p) => node_helpers.group(
    $,
    abort,
    "QualifiedName",
    (iterator): d_out.Qualified_Name => ({
        'first': Entity_Name(
            iterator,
            abort,
            {
                'parent': $p.parent
            }
        ),
        'dot token': iterator_helpers.specific_node(
            iterator,
            abort,
            "QualifiedName['dot token']",
            "DotToken",
            $p.parent,
            ($) => $,
        ),
        'second': iterator_helpers.specific_node(
            iterator,
            abort,
            "QualifiedName['second']",
            "Identifier",
            $p.parent,
            ($) => $
        )
    })
)

export const Modifiers: p_pi.Production_With_Parameter<
    d_out.Modifiers,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node
    }
> = (iterator, abort, $p) => {
    return iterator_helpers.list_with_syntaxlist_wrapper(
        iterator,
        abort,
        {
            'context': "ModuleDeclaration",
            'parent': $p.parent
        },
        ($): d_out.Modifier => {
            switch ($.kind) {
                case "ExportKeyword": return ['export', $]
                default: return abort({
                    'context': "ModuleDeclaration",
                    'cause': ['unexpected node', $],
                    'expected': ['something', p_.literal.list(["ExportKeyword"])]
                })
            }
        },
    )
}