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

    export const consume_list_with_syntaxlist_wrapper = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            context: string,
            parent: d_in.Node
        },
        callback: (node: d_in.Node) => T
    ): p_di.List<T> => iterator.consume(
        ($): p_di.List<T> => abort({
            'context': $p.context,
            'parent': $p.parent,
            'cause': ['end of node list', null],
            'expected': ['something', `SyntaxList (${$p.context})`]
        }),
        ($): p_di.List<T> => node_helpers.list_with_syntaxlist_wrapper(
            $,
            $p.parent,
            abort,
            {
                'context': $p.context,
                'parent': $p.parent
            },
            ($): T => callback($)

        )
    )

    export const consume = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        parent: d_in.Node,
        location_description: string,
        callback: (node: d_in.Node) => T
    ): T => iterator.consume(
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

    export const consume_and_expect = <T extends p_di.Value>(
        iterator: p_pi.Iterator<d_in.Node, null>,
        abort: Abort<d_function.Error_Inner>,
        parent: d_in.Node,
        location_description: string,
        kind: string,
        callback: (node: d_in.Node) => T
    ): T => iterator.consume(
        ($) => abort({
            'context': location_description,
            'parent': parent,
            'cause': ['end of node list', null],
            'expected': ['something', kind]
        }),
        ($) => node_helpers.expect_specific_node(
            $,
            parent,
            abort,
            location_description,
            kind,
            callback
        )
    )

}


namespace node_helpers {

    export const expect_specific_node = <T extends p_di.Value>(
        $: d_in.Node,
        parent: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        location_description: string,
        kind: string,
        callback: (node: d_in.Node) => T

    ): T => $.kind !== kind
            ? abort({
                'parent': parent,
                'context': location_description,
                'cause': ['unexpected node', $],
                'expected': ['something', kind]
            })
            : callback($)

    export const list_with_syntaxlist_wrapper = <T extends p_di.Value>(
        $: d_in.Node,
        parent: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            context: string,
            parent: d_in.Node
        },
        callback: (node: d_in.Node) => T
    ): p_di.List<T> => $.kind !== "SyntaxList"
            ? abort({
                'parent': parent,
                'context': $p.context,
                'cause': ['unexpected node', $],
                'expected': ['something', `SyntaxList (${$p.context})`]
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
                    'context': $p.context,
                    'parent': $p.parent,
                    'cause': ['unexpected node', $],
                    'expected': ['nothing', null]
                }),
            })



    export const process_children_as_list = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        $p: {
            context: string,
        },
        callback: (node: d_in.Node, parent: d_in.Node) => T
    ): p_di.List<T> => {
        const my_node = $
        return p_iterate({
            list: $.children,
            end_info: null,
            assign: (iterator) => iterator.build_list({
                'has_more_items': ($) => true,
                'handle': () => iterator.consume(
                    ($) => P_unreachable_code_path("has more items -> true"),
                    ($): T => callback($, my_node),
                )
            }),
            on_dangling_item: ($) => P_unreachable_code_path("build_list processes all items"),
        })
    }

    export const process_children = <T extends p_di.Value>(
        $: d_in.Node,
        abort: Abort<d_function.Error_Inner>,
        location_description: string,
        callback: (
            iterator: p_pi.Iterator<d_in.Node, null>,
            parent: d_in.Node,
        ) => T
    ): T => {
        const parent = $
        return p_iterate({
            list: $.children,
            end_info: null,
            assign: (iterator): T => callback(iterator, parent),
            on_dangling_item: ($) => abort({
                'parent': parent,
                'context': location_description,
                'cause': ['unexpected node', $],
                'expected': ['nothing', null]
            }),
        })
    }

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
                'parent': $v_node,
                'cause': ['unexpected node', $],
                'expected': ['something', "`SourceFile`"],
                'context': "SourceFile"
            }),
        () => node_helpers.process_children(
            $,
            abort,
            "SourceFile",
            (iterator) => {
                return {
                    'statements': iterator_helpers.consume(
                        iterator,
                        abort,
                        $,
                        "SourceFile['statements']",
                        ($) => Statements(
                            $,
                            abort,
                            {
                                'parent': $
                            }
                        )
                    ),
                    'end of file': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        $,
                        "SourceFile['end of file']",
                        "EndOfFileToken",
                        ($) => $
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
> = ($, abort, $p) => node_helpers.process_children_as_list(
    $,
    abort,
    {
        'context': "Statements",
    },
    ($, parent): d_out.Statement => {
        switch ($.kind) {
            case "ImportDeclaration": return ['import declaration', node_helpers.process_children(
                $,
                abort,
                "ImportDeclaration",
                (iterator) => ({
                    'import keyword': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        $,
                        "ImportDeclaration['import keyword']",
                        "ImportKeyword",
                        ($) => $
                    ),
                    'clause': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        $,
                        "ImportDeclaration['clause']",
                        "ImportClause",
                        ($): d_out.Import_Declaration['clause'] => node_helpers.process_children(
                            $,
                            abort,
                            "ImportClause",
                            (iterator, parent): d_out.Import_Declaration['clause'] => {
                                return {
                                    'type': iterator.peek(
                                        () => abort({
                                            'context': "ImportClause['type']",
                                            'parent': $,
                                            'cause': ['end of node list', null],
                                            'expected': ['something', "NamedImports or NamespaceImport"]
                                        }),
                                        ($): d_out.Import_Clause['type'] => {
                                            switch ($.kind) {
                                                case "NamedImports": return iterator_helpers.consume_and_expect(
                                                    iterator,
                                                    abort,
                                                    $,
                                                    "ImportClause['named imports']",
                                                    "NamedImports",
                                                    ($): d_out.Import_Clause['type'] => {
                                                        const my_node = $
                                                        return ['named imports', node_helpers.process_children_as_list(
                                                            $,
                                                            abort,
                                                            {
                                                                'context': "ImportClause['named imports']",
                                                            },
                                                            ($): d_out.Import_Specifier => {
                                                                switch ($.kind) {
                                                                    case "ImportSpecifier": return {
                                                                        'identifier': iterator_helpers.consume_and_expect(
                                                                            iterator,
                                                                            abort,
                                                                            $,
                                                                            "ImportSpecifier['identifier']",
                                                                            "Identifier",
                                                                            ($) => $
                                                                        )
                                                                    }
                                                                    default: return abort({
                                                                        'parent': my_node,
                                                                        'context': "ImportClause['named imports']",
                                                                        'cause': ['unexpected node', $],
                                                                        'expected': ['something', "ImportSpecifier"]
                                                                    })
                                                                }
                                                            }
                                                        )]
                                                    }
                                                )
                                                case "NamespaceImport": return ['namespace import', iterator_helpers.consume_and_expect(
                                                    iterator,
                                                    abort,
                                                    $,
                                                    "NamespaceImport['identifier']",
                                                    "NamespaceImport",
                                                    ($) => node_helpers.process_children(
                                                        $,
                                                        abort,
                                                        "NamespaceImport",
                                                        (iterator): d_out.Namespace_Import => ({
                                                            'asterisk token': iterator_helpers.consume_and_expect(
                                                                iterator,
                                                                abort,
                                                                $,
                                                                "NamespaceImport['asterisk token']",
                                                                "AsteriskToken",
                                                                ($) => $
                                                            ),
                                                            'as keyword': iterator_helpers.consume_and_expect(
                                                                iterator,
                                                                abort,
                                                                $,
                                                                "NamespaceImport['as keyword']",
                                                                "AsKeyword",
                                                                ($) => $
                                                            ),
                                                            'identifier': iterator_helpers.consume_and_expect(
                                                                iterator,
                                                                abort,
                                                                $,
                                                                "NamespaceImport['identifier']",
                                                                "Identifier",
                                                                ($) => $
                                                            )
                                                        })
                                                    )
                                                )]

                                                default: return abort({
                                                    'parent': parent,
                                                    'context': "ImportClause['type']",
                                                    'cause': ['unexpected node', $],
                                                    'expected': ['something', "NamedImports or NamespaceImport"]
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
                    'from keyword': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        $p.parent,
                        "ImportDeclaration['from keyword']",
                        "FromKeyword",
                        ($) => $
                    ),
                    'string literal': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        $p.parent,
                        "ImportDeclaration['string literal']",
                        "StringLiteral",
                        ($) => $
                    ),
                })
            )]
            case "ModuleDeclaration": return ['module declaration', node_helpers.process_children(
                $,
                abort,
                "ModuleDeclaration",
                (iterator, parent): d_out.Module_Declaration => ({
                    'modifiers': Modifiers(
                        iterator,
                        abort,
                        {
                            'parent': parent
                        }
                    ),
                    'namespace keyword': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        parent,
                        "ModuleDeclaration['namespace keyword']",
                        "NamespaceKeyword",
                        ($) => $
                    ),
                    'identifier': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        parent,
                        "ModuleDeclaration['identifier']",
                        "Identifier",
                        ($) => $
                    ),
                    'module block': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        parent,
                        "ModuleDeclaration['module block']",
                        "ModuleBlock",
                        ($) => node_helpers.process_children(
                            $,
                            abort,
                            "ModuleBlock",
                            (iterator, parent): d_out.Module_Block => ({
                                'open brace token': iterator_helpers.consume_and_expect(
                                    iterator,
                                    abort,
                                    parent,
                                    "ModuleBlock['first punctuation']",
                                    "FirstPunctuation", //FirstPunctuation has the same index in the enum as OpenBraceToken,
                                    ($) => $
                                ),
                                'statements': iterator_helpers.consume_and_expect(
                                    iterator,
                                    abort,
                                    parent,
                                    "ModuleBlock['statements']",
                                    "SyntaxList",
                                    ($) => Statements(
                                        $,
                                        abort,
                                        {
                                            'parent': parent
                                        }
                                    )
                                ),
                                'close brace token': iterator_helpers.consume_and_expect(
                                    iterator,
                                    abort,
                                    parent,
                                    "ModuleBlock['close brace token']",
                                    "CloseBraceToken",
                                    ($) => $,
                                ),
                            })
                        ),
                    ),
                })
            )]
            case "TypeAliasDeclaration": return ['type alias declaration', node_helpers.process_children(
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
                    'type keyword': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        parent,
                        "TypeAliasDeclaration['type keyword']",
                        "TypeKeyword",
                        ($) => $,
                    ),
                    'identifier': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        parent,
                        "TypeAliasDeclaration['identifier']",
                        "Identifier",
                        ($) => $,
                    ),
                    'first assignment': iterator_helpers.consume_and_expect(
                        iterator,
                        abort,
                        parent,
                        "TypeAliasDeclaration['first assignment']",
                        "FirstAssignment",
                        ($) => $,
                    ),
                    'type': iterator_helpers.consume(
                        iterator,
                        abort,
                        parent,
                        "TypeAliasDeclaration['type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    )
                })
            )]
            default: return abort({
                'parent': parent,
                'context': "Statements",
                'cause': ['unexpected node', $],
                'expected': ['something', "`Statement`"]
            })
        }
    }
)

export const Type: p_i.Refiner<
    d_out.Type,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => {
    switch ($.kind) {
        case "TypeReference": return ['type reference', node_helpers.process_children(
            $,
            abort,
            "TypeReference",
            (iterator, parent): d_out.Type_Reference => ({
                'entity name': iterator_helpers.consume(
                    iterator,
                    abort,
                    parent,
                    "TypeReference['entity name']",
                    ($) => Entity_Name(
                        $,
                        abort,
                        {
                            'parent': parent
                        }
                    )
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
        case "LiteralType": return ['literal type', node_helpers.process_children(
            $,
            abort,
            "LiteralType",
            (iterator, parent): d_out.Literal_Type => ({
                'type': iterator_helpers.consume_and_expect(
                    iterator,
                    abort,
                    parent,
                    "LiteralType['type']",
                    "NullKeyword",
                    ($) => ['null', $],
                ),
            })
        )]
        case "TypeLiteral": return ['type literal', node_helpers.process_children(
            $,
            abort,
            "TypeLiteral",
            (iterator, parent): d_out.Type_Literal => ({
                'open brace token': iterator_helpers.consume_and_expect(
                    iterator,
                    abort,
                    parent,
                    "TypeLiteral['open brace token']",
                    "FirstPunctuation", //FirstPunctuation has the same index in the enum as OpenBraceToken,
                    ($) => $
                ),
                'members': iterator_helpers.consume_list_with_syntaxlist_wrapper(
                    iterator,
                    abort,
                    {
                        'context': "TypeLiteral['members']",
                        'parent': parent
                    },
                    ($): d_out.Type_Literal_Member => {
                        switch ($.kind) {
                            case "PropertySignature": return ['property signature', node_helpers.process_children(
                                $,
                                abort,
                                "PropertySignature",
                                (iterator, parent): d_out.Property_Signature => ({
                                    'id': iterator_helpers.consume(
                                        iterator,
                                        abort,
                                        parent,
                                        "PropertySignature['id']",
                                        ($) => String_Literal_Or_Identifier(
                                            $,
                                            abort,
                                        )
                                    ),
                                    'colon token': iterator_helpers.consume_and_expect(
                                        iterator,
                                        abort,
                                        parent,
                                        "PropertySignature['colon token']",
                                        "ColonToken",
                                        ($) => $
                                    ),
                                    'type': iterator_helpers.consume(
                                        iterator,
                                        abort,
                                        parent,
                                        "PropertySignature['type']",
                                        ($) => Type(
                                            $,
                                            abort,
                                        )
                                    )
                                })
                            )]
                            default: return abort({
                                'parent': parent,
                                'context': "TypeLiteral['members']",
                                'cause': ['unexpected node', $],
                                'expected': ['something', "`TypeLiteral_Member`"]
                            })
                        }
                    }
                ),
                'close brace token': iterator_helpers.consume_and_expect(
                    iterator,
                    abort,
                    parent,
                    "TypeLiteral['close brace token']",
                    "CloseBraceToken",
                    ($) => $,
                ),
            })
        )]
        default: return abort({
            'context': "Type",
            'parent': $,
            'cause': ['unexpected node', $],
            'expected': ['something', "a Type"]
        })
    }
}

export const String_Literal_Or_Identifier: p_i.Refiner<
    d_out.String_Literal_Or_Identifier,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => {
    switch ($.kind) {
        case "StringLiteral": return ['string literal', $]
        case "Identifier": return ['identifier', Identifier(
            $,
            abort,
        )]
        default: return abort({
            'parent': $,
            'context': "String_Literal_Or_Identifier",
            'cause': ['unexpected node', $],
            'expected': ['something', "`StringLiteral` or `Identifier`"]
        })
    }
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

    'less than token': iterator_helpers.consume_and_expect(
        iterator,
        abort,
        $p.parent,
        "Type>type reference>Reference['less than token']",
        "FirstBinaryOperator", //FirstBinaryOperator has the same index in the enum as LessThanToken, 
        //but is specified later in the list and is therefor selected as the name, so we unfortunately have to use this name here
        ($) => $,
    ),
    'entries': iterator_helpers.consume_list_with_syntaxlist_wrapper(
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
                )]
            }
        }
    ),
    'greater than token': iterator_helpers.consume_and_expect(
        iterator,
        abort,
        $p.parent,
        "TypeReference['greater than token']",
        "GreaterThanToken",
        ($) => $,
    ),
})

export const Entity_Name: p_i.Refiner_With_Parameter<
    d_out.Entity_Name,
    d_function.Error_Inner,
    d_in.Node,
    {
        'parent': d_in.Node
    }
> = ($, abort, $p) => {

    switch ($.kind) {
        case "FirstNode": return ['qualified name', Qualified_Name(
            $,
            abort,
        )]
        case "Identifier": return ['identifier', $]
        default: return abort({
            'parent': $p.parent,
            'context': "TypeReference['entity name']",
            'cause': ['unexpected node', $],
            'expected': ['something', "`FirstNode` or `Identifier`"]
        })
    }
}

export const Identifier: p_i.Refiner<
    d_out.Identifier,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => $.kind !== "Identifier"
    ? abort({
        'parent': $,
        'context': "Identifier",
        'cause': ['unexpected node', $],
        'expected': ['something', "`Identifier`"]
    })
    : $


export const Qualified_Name: p_i.Refiner<
    d_out.Qualified_Name,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => node_helpers.process_children(
    $,
    abort,
    "QualifiedName",
    (iterator, parent): d_out.Qualified_Name => ({
        'first': iterator_helpers.consume(
            iterator,
            abort,
            parent,
            "QualifiedName['first']",
            ($) => Entity_Name(
                $,
                abort,
                {
                    'parent': parent
                }
            )
        ),
        'dot token': iterator_helpers.consume_and_expect(
            iterator,
            abort,
            parent,
            "QualifiedName['dot token']",
            "DotToken",
            ($) => $,
        ),
        'second': iterator_helpers.consume(
            iterator,
            abort,
            parent,
            "QualifiedName['second']",
            ($) => Identifier(
                $,
                abort,
            )
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
    return iterator_helpers.consume_list_with_syntaxlist_wrapper(
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
                    'parent': $p.parent,
                    'context': "ModuleDeclaration",
                    'cause': ['unexpected node', $],
                    'expected': ['something', "`ExportKeyword`"]
                })
            }
        },
    )
}