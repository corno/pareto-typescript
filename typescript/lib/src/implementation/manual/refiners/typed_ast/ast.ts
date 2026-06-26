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
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Source_File => p_assert(
        abort,
        () => $.kind === "SourceFile"
            ? p_.literal.not_set()
            : p_.literal.set({
                'parent': $,
                'cause': ['unexpected node', $],
                'expected': ['something', "`SourceFile`"],
                'context': "SourceFile"
            }),
        () => context.parse_children(
            "SourceFile",
            (context) => {
                return {
                    'statements': context.consume_and_expect(
                        "SourceFile['statements']",
                        "SyntaxList",
                        ($) => Statements(
                            $,
                            abort,
                        )
                    ),
                    'end of file': context.consume_and_expect(
                        "SourceFile['end of file']",
                        "EndOfFileToken",
                        ($) => null
                    ),
                }
            }
        )
    )
)

export const Statements: p_i.Refiner<
    d_out.Statements,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context) => context.process_children_as_list(
        "Statements",
        ($, context): d_out.Statement => {
            switch ($.kind) {
                case "ImportDeclaration": return ['import declaration', context.parse_children(
                    "ImportDeclaration",
                    (context): d_out.Import_Declaration => ({
                        'import keyword': context.consume_and_expect(
                            "ImportDeclaration['import keyword']",
                            "ImportKeyword",
                            ($) => null
                        ),
                        'clause': context.consume_and_expect(
                            "ImportDeclaration['clause']",
                            "ImportClause",
                            ($, context): d_out.Import_Declaration['clause'] => context.parse_children(
                                "ImportDeclaration['clause']",
                                (context): d_out.Import_Declaration['clause'] => {
                                    return {
                                        'type': context.consume(
                                            "ImportClause['type']",
                                            ($, context) => {

                                                switch ($.kind) {
                                                    case "NamedImports":
                                                        return ['named imports', context.process_children_as_list(
                                                            "NamedImports",
                                                            ($): d_out.Import_Specifier => {
                                                                switch ($.kind) {
                                                                    case "ImportSpecifier": return context.parse_children(
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
                                                    case "NamespaceImport": return ['namespace import', context.parse_children(
                                                        "NamespaceImport",
                                                        (context): d_out.Namespace_Import => ({
                                                            'asterisk token': context.consume_and_expect(
                                                                "NamespaceImport['asterisk token']",
                                                                "AsteriskToken",
                                                                ($) => null
                                                            ),
                                                            'as keyword': context.consume_and_expect(
                                                                "NamespaceImport['as keyword']",
                                                                "AsKeyword",
                                                                ($) => null
                                                            ),
                                                            'identifier': context.consume_and_expect(
                                                                "NamespaceImport['identifier']",
                                                                "Identifier",
                                                                ($) => $
                                                            )
                                                        })
                                                    )]

                                                    default: return abort({
                                                        'parent': $,
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
                            ($) => null
                        ),
                        'string literal': context.consume_and_expect(
                            "ImportDeclaration['string literal']",
                            "StringLiteral",
                            ($) => $
                        ),
                    })
                )]
                case "InterfaceDeclaration": return ['interface declaration', context.parse_children(
                    "InterfaceDeclaration",
                    (context): d_out.Interface_Declaration => ({
                        'interface keyword': context.consume_and_expect(
                            "InterfaceDeclaration['interface keyword']",
                            "InterfaceKeyword",
                            ($) => null
                        ),
                        'identifier': context.consume_and_expect(
                            "InterfaceDeclaration['identifier']",
                            "Identifier",
                            ($) => $
                        ),
                        'type parameters': context.optional(
                            ($) => $.kind === "LessThanToken",
                            (context) => context.call(
                                "InterfaceDeclaration['type parameters']",
                                Type_Parameters
                            )
                        ),
                        'body': context.call(
                            "InterfaceDeclaration['body']",
                            Type_Literal
                        ),
                    })
                )]
                case "ModuleDeclaration": return ['module declaration', context.parse_children(
                    "ModuleDeclaration",
                    (context): d_out.Module_Declaration => ({
                        'modifiers': context.call(
                            "ModuleDeclaration['modifiers']",
                            Modifiers
                        ),
                        'namespace keyword': context.consume_and_expect(
                            "ModuleDeclaration['namespace keyword']",
                            "NamespaceKeyword",
                            ($) => null
                        ),
                        'identifier': context.consume_and_expect(
                            "ModuleDeclaration['identifier']",
                            "Identifier",
                            ($) => $
                        ),
                        'module block': context.consume_and_expect(
                            "ModuleDeclaration['module block']",
                            "ModuleBlock",
                            ($, context) => context.parse_children(
                                "ModuleBlock",
                                (context): d_out.Module_Block => ({
                                    'open brace token': context.consume_and_expect(
                                        "ModuleBlock['first punctuation']",
                                        "OpenBraceToken",
                                        ($) => null
                                    ),
                                    'statements': context.consume_and_expect(
                                        "ModuleBlock['statements']",
                                        "SyntaxList",
                                        ($) => Statements(
                                            $,
                                            abort,
                                        )
                                    ),
                                    'close brace token': context.consume_and_expect(
                                        "ModuleBlock['close brace token']",
                                        "CloseBraceToken",
                                        ($) => null,
                                    ),
                                })
                            ),
                        ),
                    })
                )]
                case "TypeAliasDeclaration": return ['type alias declaration', context.parse_children(
                    "TypeAliasDeclaration",
                    (context): d_out.Type_Alias_Declaration => ({
                        'modifiers': context.call(
                            "TypeAliasDeclaration['modifiers']",
                            Modifiers
                        ),
                        'type keyword': context.consume_and_expect(
                            "TypeAliasDeclaration['type keyword']",
                            "TypeKeyword",
                            ($) => null,
                        ),
                        'identifier': context.consume_and_expect(
                            "TypeAliasDeclaration['identifier']",
                            "Identifier",
                            ($) => $,
                        ),
                        'equals token': context.consume_and_expect(
                            "TypeAliasDeclaration['equals token']",
                            "EqualsToken",
                            ($) => null,
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
                    'parent': $,
                    'context': "Statements",
                    'cause': ['unexpected node', $],
                    'expected': ['something', "a statement"]
                })
            }
        }
    )
)

export const Type: p_i.Refiner<
    d_out.Type,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Type => {
        switch ($.kind) {
            case "LiteralType": return ['literal type', context.parse_children(
                "LiteralType",
                (context): d_out.Literal_Type => ({
                    'type': context.consume(
                        "LiteralType['type']",
                        ($, context) => {
                            switch ($.kind) {
                                case "FalseKeyword": return ['false keyword', null]
                                case "NullKeyword": return ['null', null]
                                case "StringLiteral": return ['string literal', $]
                                case "TrueKeyword": return ['true keyword', null]
                                default: return abort({
                                    'parent': $,
                                    'context': "LiteralType['type']",
                                    'cause': ['unexpected node', $],
                                    'expected': ['something', "`NullKeyword` or `StringLiteral`"]
                                })
                            }
                        },
                    ),
                })
            )]
            case "NumberKeyword": return ['number keyword', null]
            case "StringKeyword": return ['string keyword', null]
            case "TupleType": return ['tuple type', context.parse_children(
                "TupleType",
                (context): d_out.Tuple_Type => ({
                    'open bracket token': context.consume_and_expect(
                        "TupleType['open bracket token']",
                        "OpenBracketToken",
                        ($) => null
                    ),
                    'elements': context.consume_syntax_list(
                        "TupleType['elements']",
                        ($) => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
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
                        ($) => null,
                    ),
                })
            )]
            case "TypeLiteral": return ['type literal', context.parse_children(
                "TypeLiteral",
                (context): d_out.Type_Literal => context.call(
                    "TypeLiteral",
                    Type_Literal
                )
            )]
            case "TypeReference": return ['type reference', context.parse_children(
                "TypeReference",
                (context): d_out.Type_Reference => ({
                    'entity name': context.consume(
                        "TypeReference['entity name']",
                        ($) => Entity_Name(
                            $,
                            abort,
                        )
                    ),
                    'type arguments': context.optional(
                        ($) => $.kind === "LessThanToken",
                        (context) => context.call(
                            "TypeReference['type arguments']",
                            Type_Arguments
                        )
                    ),
                })
            )]
            case "UnionType": return ['union type', context.parse_children(
                "UnionType",
                (context): d_out.Union_Type => ({
                    'members': context.consume_syntax_list(
                        "UnionType['members']",
                        ($): d_out.Union_Type_Member => {
                            switch ($.kind) {
                                case "BarToken": return ['bar token', null]
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
)

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

export const Type_Literal: p_pi.Production_With_Parameter<
    d_out.Type_Literal,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node,
        'location description': string
    }
> = (iterator, abort, $p): d_out.Type_Literal => h.create_iterator_context(
    iterator,
    abort,
    $p.parent,
    (context): d_out.Type_Literal => ({
        'open brace token': context.consume_and_expect(
            "TypeLiteral['open brace token']",
            "OpenBraceToken",
            ($) => null
        ),
        'members': context.consume_syntax_list(
            "TypeLiteral['members']",
            ($, context): d_out.Type_Literal_Member => {
                switch ($.kind) {
                    case "CallSignature": return ['call signature', $]
                    case "IndexSignature": return ['index signature', $]
                    case "PropertySignature": return ['property signature', context.parse_children(
                        "PropertySignature",
                        (context): d_out.Property_Signature => ({
                            'modifiers': context.optional(
                                ($) => $.kind === "SyntaxList",
                                (context) => context.call(
                                    "PropertySignature['modifiers']",
                                    Modifiers
                                )
                            ),
                            'id': context.consume(
                                "PropertySignature['id']",
                                ($, parent) => String_Literal_Or_Identifier(
                                    $,
                                    abort,
                                )
                            ),
                            'colon token': context.consume_and_expect(
                                "PropertySignature['colon token']",
                                "ColonToken",
                                ($) => null
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
            ($) => null,
        ),
    })
)

export const Type_Arguments: p_pi.Production_With_Parameter<
    d_out.Type_Arguments,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node,
        'location description': string
    }
> = (iterator, abort, $p): d_out.Type_Arguments => h.create_iterator_context(
    iterator,
    abort,
    $p.parent,
    (context): d_out.Type_Arguments => ({

        'less than token': context.consume_and_expect(
            "TypeArguments['less than token']",
            "LessThanToken",
            ($) => null,
        ),
        'entries': context.consume_syntax_list(
            "TypeArguments['entries']",
            ($): d_out.Type_Arguments_Entry => {
                switch ($.kind) {
                    case "CommaToken": return ['comma token', null]
                    default: return ['type', Type(
                        $,
                        abort,
                    )]
                }
            }
        ),
        'greater than token': context.consume_and_expect(
            "TypeArguments['greater than token']",
            "GreaterThanToken",
            ($) => null,
        ),
    })
)
export const Type_Parameters: p_pi.Production_With_Parameter<
    d_out.Type_Parameters,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node,
        'location description': string
    }
> = (iterator, abort, $p): d_out.Type_Parameters => h.create_iterator_context(
    iterator,
    abort,
    $p.parent,
    (context): d_out.Type_Parameters => ({

        'less than token': context.consume_and_expect(
            "TypeParameters['less than token']",
            "LessThanToken",
            ($) => null,
        ),
        'entries': context.consume_syntax_list(
            "TypeParameters['entries']",
            ($, context): d_out.Type_Parameters_Entry => {
                switch ($.kind) {
                    // case "CommaToken": return ['comma token', $]
                    case "TypeParameter": return context.parse_children(
                        "TypeParameter",
                        (context): d_out.Type_Parameters_Entry => ({
                            'identifier': context.consume_and_expect(
                                "TypeParameter['identifier']",
                                "Identifier",
                                ($) => $
                            )
                        })
                    )
                    default: return abort({
                        'parent': $p.parent,
                        'context': "TypeParameters['entries']",
                        'cause': ['unexpected node', $],
                        'expected': ['something', "`CommaToken` or `TypeParameter`"]
                    })
                }
            }
        ),
        'greater than token': context.consume_and_expect(
            "TypeParameters['greater than token']",
            "GreaterThanToken",
            ($) => null,
        ),
    })
)

export const Entity_Name: p_i.Refiner<
    d_out.Entity_Name,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => {

    switch ($.kind) {
        case "QualifiedName": return ['qualified name', Qualified_Name(
            $,
            abort,
        )]
        case "Identifier": return ['identifier', $]
        default: return abort({
            'parent': $,
            'context': "TypeReference['entity name']",
            'cause': ['unexpected node', $],
            'expected': ['something', "`QualifiedName` or `Identifier`"]
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
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context) => context.parse_children(
        "QualifiedName",
        (context): d_out.Qualified_Name => ({
            'first': context.consume(
                "QualifiedName['first']",
                ($) => Entity_Name(
                    $,
                    abort,
                )
            ),
            'dot token': context.consume_and_expect(
                "QualifiedName['dot token']",
                "DotToken",
                ($) => null,
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
)

export const Modifiers: p_pi.Production_With_Parameter<
    d_out.Modifiers,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node
    }
> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p.parent,
    (context) => {
        return context.consume_syntax_list(
            "Modifiers",
            ($): d_out.Modifier => {
                switch ($.kind) {
                    case "ExportKeyword": return ['export', null]
                    case "ReadonlyKeyword": return ['readonly', null]
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