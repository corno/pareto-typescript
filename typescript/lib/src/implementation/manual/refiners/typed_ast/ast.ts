import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import p_assert from 'pareto-core/dist/implementation/refiner/specials/assert'

//data types
import * as d_in from "../../../../modules/typescript_parser/interface/data/ast"
import * as d_out from "../../../../interface/data/typed_ast"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_function from "../../../../interface/data/typed_ast_from_ast"

import * as h from "../../../../temp_helpers"


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
        () => h.node_helpers.process_children_as_group(
            $,
            abort,
            "SourceFile",
            (context) => {
                return {
                    'statements': context.consume_and_expect(
                        "SourceFile['statements']",
                        "SyntaxList",
                        ($) => Statements(
                            $,
                            abort,
                            {
                                'parent': $
                            }
                        )
                    ),
                    'end of file': context.consume_and_expect(
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
> = ($, abort, $p) => h.node_helpers.process_children_as_list(
    $,
    ($, parent): d_out.Statement => {
        switch ($.kind) {
            case "ImportDeclaration": return ['import declaration', h.node_helpers.process_children_as_group(
                $,
                abort,
                "ImportDeclaration",
                (context) => ({
                    'import keyword': context.consume_and_expect(
                        "ImportDeclaration['import keyword']",
                        "ImportKeyword",
                        ($) => $
                    ),
                    'clause': context.consume_and_expect(
                        "ImportDeclaration['clause']",
                        "ImportClause",
                        ($): d_out.Import_Declaration['clause'] => h.node_helpers.process_children_as_group(
                            $,
                            abort,
                            "ImportDeclaration['clause']",
                            (context): d_out.Import_Declaration['clause'] => {
                                return {
                                    'type': context.consume(
                                        "ImportClause['type']",
                                        ($) => {

                                            switch ($.kind) {
                                                case "NamedImports":
                                                    return ['named imports', h.node_helpers.process_children_as_list(
                                                        $,
                                                        ($): d_out.Import_Specifier => {
                                                            switch ($.kind) {
                                                                case "ImportSpecifier": return h.node_helpers.process_children_as_group(
                                                                    $,
                                                                    abort,
                                                                    "ImportSpecifier",
                                                                    (context) => ({
                                                                        'identifier': context.consume_and_expect(
                                                                            "ImportSpecifier['identifier']",
                                                                            "Identifier",
                                                                            ($) => $
                                                                        )
                                                                    })
                                                                )
                                                                default: return abort({
                                                                    'parent': $, //this is not correct
                                                                    'context': "ImportClause['named imports']",
                                                                    'cause': ['unexpected node', $],
                                                                    'expected': ['something', "ImportSpecifier"]
                                                                })
                                                            }
                                                        }
                                                    )]
                                                case "NamespaceImport": return ['namespace import', h.node_helpers.process_children_as_group(
                                                    $,
                                                    abort,
                                                    "NamespaceImport",
                                                    (context): d_out.Namespace_Import => ({
                                                        'asterisk token': context.consume_and_expect(
                                                            "NamespaceImport['asterisk token']",
                                                            "AsteriskToken",
                                                            ($) => $
                                                        ),
                                                        'as keyword': context.consume_and_expect(
                                                            "NamespaceImport['as keyword']",
                                                            "AsKeyword",
                                                            ($) => $
                                                        ),
                                                        'identifier': context.consume_and_expect(
                                                            "NamespaceImport['identifier']",
                                                            "Identifier",
                                                            ($) => $
                                                        )
                                                    })
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
                                }
                            }
                        )
                    ),
                    'from keyword': context.consume_and_expect(
                        "ImportDeclaration['from keyword']",
                        "FromKeyword",
                        ($) => $
                    ),
                    'string literal': context.consume_and_expect(
                        "ImportDeclaration['string literal']",
                        "StringLiteral",
                        ($) => $
                    ),
                })
            )]
            case "ModuleDeclaration": return ['module declaration', h.node_helpers.process_children_as_group(
                $,
                abort,
                "ModuleDeclaration",
                (context): d_out.Module_Declaration => ({
                    'modifiers': context.call(Modifiers),
                    'namespace keyword': context.consume_and_expect(
                        "ModuleDeclaration['namespace keyword']",
                        "NamespaceKeyword",
                        ($) => $
                    ),
                    'identifier': context.consume_and_expect(
                        "ModuleDeclaration['identifier']",
                        "Identifier",
                        ($) => $
                    ),
                    'module block': context.consume_and_expect(
                        "ModuleDeclaration['module block']",
                        "ModuleBlock",
                        ($) => h.node_helpers.process_children_as_group(
                            $,
                            abort,
                            "ModuleBlock",
                            (context): d_out.Module_Block => ({
                                'open brace token': context.consume_and_expect(
                                    "ModuleBlock['first punctuation']",
                                    "FirstPunctuation", //FirstPunctuation has the same index in the enum as OpenBraceToken,
                                    ($) => $
                                ),
                                'statements': context.consume_and_expect(
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
                                'close brace token': context.consume_and_expect(
                                    "ModuleBlock['close brace token']",
                                    "CloseBraceToken",
                                    ($) => $,
                                ),
                            })
                        ),
                    ),
                })
            )]
            case "TypeAliasDeclaration": return ['type alias declaration', h.node_helpers.process_children_as_group(
                $,
                abort,
                "TypeAliasDeclaration",
                (context): d_out.Type_Alias_Declaration => ({
                    'modifiers': context.call(Modifiers),
                    'type keyword': context.consume_and_expect(
                        "TypeAliasDeclaration['type keyword']",
                        "TypeKeyword",
                        ($) => $,
                    ),
                    'identifier': context.consume_and_expect(
                        "TypeAliasDeclaration['identifier']",
                        "Identifier",
                        ($) => $,
                    ),
                    'first assignment': context.consume_and_expect(
                        "TypeAliasDeclaration['first assignment']",
                        "FirstAssignment",
                        ($) => $,
                    ),
                    'type': context.consume(
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
        case "LiteralType": return ['literal type', h.node_helpers.process_children_as_group(
            $,
            abort,
            "LiteralType",
            (context): d_out.Literal_Type => ({
                'type': context.consume(
                    "LiteralType['type']",
                    ($, parent,) => {
                        switch ($.kind) {
                            case "NullKeyword": return ['null', $]
                            case "StringLiteral": return ['string literal', $]
                            default: return abort({
                                'parent': context.temp_parent,
                                'context': "LiteralType['type']",
                                'cause': ['unexpected node', $],
                                'expected': ['something', "`NullKeyword` or `StringLiteral`"]
                            })
                        }
                    },
                ),
            })
        )]
        case "TupleType": return ['tuple type', h.node_helpers.process_children_as_group(
            $,
            abort,
            "TupleType",
            (context): d_out.Tuple_Type => ({
                'open bracket token': context.consume_and_expect(
                    "TupleType['open bracket token']",
                    "OpenBracketToken",
                    ($) => $
                ),
                'elements': context.consume_list_with_syntaxlist_wrapper(
                    "TupleType['elements']",
                    ($) => {
                        switch ($.kind) {
                            case "CommaToken": return ['comma token', $]
                            default: return ['type', Type(
                                $,
                                abort,
                            )]
                        }
                    }
                ),
                'close bracket token': context.consume_and_expect(
                    "TupleType['close bracket token']",
                    "CloseBracketToken",
                    ($) => $,
                ),
            })
        )]
        case "TypeLiteral": return ['type literal', h.node_helpers.process_children_as_group(
            $,
            abort,
            "TypeLiteral",
            (context): d_out.Type_Literal => ({
                'open brace token': context.consume_and_expect(
                    "TypeLiteral['open brace token']",
                    "FirstPunctuation", //FirstPunctuation has the same index in the enum as OpenBraceToken,
                    ($) => $
                ),
                'members': context.consume_list_with_syntaxlist_wrapper(
                    "TypeLiteral['members']",
                    ($, parent, context): d_out.Type_Literal_Member => {
                        switch ($.kind) {
                            case "PropertySignature": return ['property signature', h.node_helpers.process_children_as_group(
                                $,
                                abort,
                                "PropertySignature",
                                (context): d_out.Property_Signature => ({
                                    'modifiers': context.optional(
                                        ($) => $.kind === "SyntaxList",
                                        (context) => context.call(Modifiers)
                                    ),
                                    'id': context.consume(
                                        "PropertySignature['id']",
                                        ($, parent) => String_Literal_Or_Identifier(
                                            $,
                                            abort,
                                            {
                                                'parent': parent
                                            }
                                        )
                                    ),
                                    'colon token': context.consume_and_expect(
                                        "PropertySignature['colon token']",
                                        "ColonToken",
                                        ($) => $
                                    ),
                                    'type': context.consume(
                                        "PropertySignature['type']",
                                        ($) => Type(
                                            $,
                                            abort,
                                        )
                                    )
                                })
                            )]
                            default: return context.abort("a type literal member")
                        }
                    }
                ),
                'close brace token': context.consume_and_expect(
                    "TypeLiteral['close brace token']",
                    "CloseBraceToken",
                    ($) => $,
                ),
            })
        )]
        case "TypeReference": return ['type reference', h.node_helpers.process_children_as_group(
            $,
            abort,
            "TypeReference",
            (context): d_out.Type_Reference => ({
                'entity name': context.consume(
                    "TypeReference['entity name']",
                    ($) => Entity_Name(
                        $,
                        abort,
                        {
                            'parent': context.temp_parent
                        }
                    )
                ),
                'type parameters': context.optional(
                    ($) => $.kind === "FirstBinaryOperator",
                    (context) => context.call(Type_Parameters)
                ),
            })
        )]
        case "UnionType": return ['union type', h.node_helpers.process_children_as_group(
            $,
            abort,
            "UnionType",
            (context): d_out.Union_Type => ({
                'members': context.consume_list_with_syntaxlist_wrapper(
                    "UnionType['members']",
                    ($): d_out.Union_Type_Member => {
                        switch ($.kind) {
                            case "BarToken": return ['bar token', $]
                            default: return ['type', Type(
                                $,
                                abort,
                            )]
                        }
                    }
                )
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

export const String_Literal_Or_Identifier: p_i.Refiner_With_Parameter<
    d_out.String_Literal_Or_Identifier,
    d_function.Error_Inner,
    d_in.Node,
    {
        'parent': d_in.Node
    }
> = ($, abort, $p) => {
    switch ($.kind) {
        case "StringLiteral": return ['string literal', $]
        case "Identifier": return ['identifier', Identifier(
            $,
            abort,
        )]
        default: return abort({
            'parent': $p.parent,
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
> = (iterator, abort, $p): d_out.Type_Parameters => h.iterator_helpers.create_parse_context(
    iterator,
    abort,
    $p.parent,
    (context) => ({

        'less than token': h.iterator_helpers.consume_and_expect_deprecated(
            iterator,
            abort,
            $p.parent,
            "Type>type reference>Reference['less than token']",
            "FirstBinaryOperator", //FirstBinaryOperator has the same index in the enum as LessThanToken, 
            //but is specified later in the list and is therefor selected as the name, so we unfortunately have to use this name here
            ($) => $,
        ),
        'entries': context.consume_list_with_syntaxlist_wrapper(
            "TypeParameters['entries']",
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
        'greater than token': h.iterator_helpers.consume_and_expect_deprecated(
            iterator,
            abort,
            $p.parent,
            "TypeReference['greater than token']",
            "GreaterThanToken",
            ($) => $,
        ),
    })
)

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
> = ($, abort) => h.node_helpers.process_children_as_group(
    $,
    abort,
    "QualifiedName",
    (context): d_out.Qualified_Name => ({
        'first': context.consume(
            "QualifiedName['first']",
            ($) => Entity_Name(
                $,
                abort,
                {
                    'parent': context.temp_parent
                }
            )
        ),
        'dot token': context.consume_and_expect(
            "QualifiedName['dot token']",
            "DotToken",
            ($) => $,
        ),
        'second': context.consume(
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
    return h.iterator_helpers.create_parse_context(
        iterator,
        abort,
        $p.parent,
        (context) => {
            return context.consume_list_with_syntaxlist_wrapper(
                "Modifiers",
                ($): d_out.Modifier => {
                    switch ($.kind) {
                        case "ExportKeyword": return ['export', $]
                        case "ReadonlyKeyword": return ['readonly', $]
                        default: return abort({
                            'parent': $p.parent,
                            'context': "Modifiers",
                            'cause': ['unexpected node', $],
                            'expected': ['something', "`ExportKeyword` or `ReadonlyKeyword`"]
                        })
                    }
                },
            )

        }
    )
}