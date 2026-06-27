import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import * as p_pi from 'pareto-core/dist/interface/production'
import p_assert from 'pareto-core/dist/implementation/refiner/specials/assert'
import p_variables from 'pareto-core/dist/implementation/refiner/specials/variables'

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

export const Statement: p_i.Refiner<
    d_out.Statement,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Statement => ({
        // 'jsdoc': context.optional(
        //     ($) => $.kind === "JSDoc",
        //     (context) => context.consume_and_expect(
        //         "Statement['jsdoc']",
        //         "JSDoc",
        //         ($) => $
        //     )
        // ),
        'type': p_variables((): d_out.Statement['type'] => {
            switch ($.kind) {
                case "Block": return ['block', Block(
                    $,
                    abort
                )]
                case "BreakStatement": return ['break', context.parse_children(
                    "BreakStatement",
                    (context) => ({
                        'break keyword': context.consume_and_expect(
                            "BreakStatement['break keyword']",
                            "BreakKeyword",
                            ($) => null
                        ),
                        'semicolon token': context.call(
                            "BreakStatement['semicolon token']",
                            Semi_Colon
                        ),
                    })
                )]
                case "DoStatement": return ['do', context.parse_children(
                    "DoStatement",
                    (context) => ({
                        'do keyword': context.consume_and_expect(
                            "DoStatement['do keyword']",
                            "DoKeyword",
                            ($) => null
                        ),
                        'statement': context.consume(
                            "DoStatement['statement']",
                            ($) => Statement(
                                $,
                                abort,
                            )
                        ),
                        'while keyword': context.consume_and_expect(
                            "DoStatement['while keyword']",
                            "WhileKeyword",
                            ($) => null
                        ),
                        'open parenthesis token': context.consume_and_expect(
                            "DoStatement['open parenthesis token']",
                            "OpenParenToken",
                            ($) => null
                        ),
                        'expression': context.consume(
                            "DoStatement['expression']",
                            ($) => Expression(
                                $,
                                abort,
                            )
                        ),
                        'close parenthesis token': context.consume_and_expect(
                            "DoStatement['close parenthesis token']",
                            "CloseParenToken",
                            ($) => null
                        ),
                    })
                )]
                case "ExportDeclaration": return ['export declaration', context.parse_children(
                    "ExportDeclaration",
                    (context): d_out.Export_Declaration => ({
                        'export keyword': context.consume_and_expect(
                            "ExportDeclaration['export keyword']",
                            "ExportKeyword",
                            ($) => null
                        ),
                        'type': context.consume_and_expect(
                            "ExportDeclaration['type']",
                            "NamedExports",
                            ($, context): d_out.Export_Declaration['type'] => ['named exports', context.parse_children(
                                "NamedExports",
                                (context) => ({
                                    'open brace token': context.consume_and_expect(
                                        "NamedExports['open brace token']",
                                        "OpenBraceToken",
                                        ($) => null
                                    ),
                                    'exports': context.consume_syntax_list(
                                        "NamedExports['exports']",
                                        ($, context): d_out.Export_Declaration_Entry => {
                                            switch ($.kind) {
                                                case "CommaToken": return ['comma token', null]
                                                case "ExportSpecifier": return ['export specifier', context.parse_children(
                                                    "ExportSpecifier",
                                                    (context) => ({
                                                        'identifier': context.consume_and_expect(
                                                            "ExportSpecifier['identifier']",
                                                            "Identifier",
                                                            ($) => $
                                                        ),
                                                        'as': context.optional(
                                                            ($) => $.kind === "AsKeyword",
                                                            (context) => ({
                                                                'as keyword': context.consume_and_expect(
                                                                    "ExportSpecifier['as']['as keyword']",
                                                                    "AsKeyword",
                                                                    ($) => null
                                                                ),
                                                                'identifier': context.consume_and_expect(
                                                                    "ExportSpecifier['as']['identifier']",
                                                                    "Identifier",
                                                                    ($) => $
                                                                )
                                                            })
                                                        )
                                                    })
                                                )]
                                                default: return abort({
                                                    'parent': $,
                                                    'context': "NamedExports['exports']",
                                                    'cause': ['unexpected node', $],
                                                    'expected': ['something', "`CommaToken` or `ExportSpecifier`"]
                                                })
                                            }
                                        }
                                    ),
                                    'close brace token': context.consume_and_expect(
                                        "NamedExports['close brace token']",
                                        "CloseBraceToken",
                                        ($) => null
                                    ),
                                })
                            )]
                        )
                    })
                )]
                case "ExpressionStatement": return ['expression', context.parse_children(
                    "ExpressionStatement",
                    (context) => context.consume(
                        "ExpressionStatement",
                        ($) => ({
                            'expression': Expression(
                                $,
                                abort,
                            ),
                            'semicolon token': context.call(
                                "ExpressionStatement['semicolon token']",
                                Semi_Colon
                            )
                        })
                    )
                )]
                case "ForStatement": return ['for', context.parse_children(
                    "ForStatement",
                    (context): d_out.For_Statement => ({
                        'for keyword': context.consume_and_expect(
                            "ForStatement['for keyword']",
                            "ForKeyword",
                            ($) => null
                        ),
                        'open parenthesis token': context.consume_and_expect(
                            "ForStatement['open parenthesis token']",
                            "OpenParenToken",
                            ($) => null
                        ),
                        'variable declaration list': context.consume_and_expect(
                            "ForStatement['variable declaration list']",
                            "VariableDeclarationList",
                            ($) => Variable_Declaration_List($, abort)
                        ),
                        'semicolon token': context.consume_and_expect(
                            "ForStatement['semicolon token']",
                            "SemicolonToken",
                            ($) => null
                        ),
                        'condition': context.optional(
                            ($) => $.kind !== "SemicolonToken",
                            (context) => context.consume(
                                "ForStatement['condition']['expression']",
                                ($) => Expression($, abort)
                            )
                        ),
                        'semicolon token 2': context.consume_and_expect(
                            "ForStatement['semicolon token 2']",
                            "SemicolonToken",
                            ($) => null
                        ),
                        'incrementor': context.optional(
                            ($) => $.kind !== "CloseParenToken",
                            (context) => context.consume(
                                "ForStatement['incrementor']['expression']",
                                ($) => Expression($, abort)
                            )
                        ),
                        'close parenthesis token': context.consume_and_expect(
                            "ForStatement['close parenthesis token']",
                            "CloseParenToken",
                            ($) => null
                        ),
                        'statement': context.consume(
                            "ForStatement['statement']",
                            ($) => Statement($, abort)
                        )
                    })
                )]
                case "ForInStatement": return ['for in', context.parse_children(
                    "ForInStatement",
                    (context) => ({
                        'for keyword': context.consume_and_expect(
                            "ForInStatement['for keyword']",
                            "ForKeyword",
                            ($) => null
                        ),
                        'open parenthesis token': context.consume_and_expect(
                            "ForInStatement['open parenthesis token']",
                            "OpenParenToken",
                            ($) => null
                        ),
                        'variable declaration list': context.consume_and_expect(
                            "ForInStatement['variable declaration list']",
                            "VariableDeclarationList",
                            ($) => Variable_Declaration_List($, abort)
                        ),
                        'in keyword': context.consume_and_expect(
                            "ForInStatement['in keyword']",
                            "InKeyword",
                            ($) => null
                        ),
                        'expression': context.consume(
                            "ForInStatement['expression']",
                            ($) => Expression($, abort)
                        ),
                        'close parenthesis token': context.consume_and_expect(
                            "ForInStatement['close parenthesis token']",
                            "CloseParenToken",
                            ($) => null
                        ),
                        'statement': context.consume(
                            "ForInStatement['statement']",
                            ($) => Statement($, abort)
                        )
                    })
                )]
                case "FunctionDeclaration": return ['function declaration', context.parse_children(
                    "FunctionDeclaration",
                    (context): d_out.Function_Declaration => ({
                        'function keyword': context.consume_and_expect(
                            "FunctionDeclaration['function keyword']",
                            "FunctionKeyword",
                            ($) => null
                        ),
                        'identifier': context.consume_and_expect(
                            "FunctionDeclaration['identifier']",
                            "Identifier",
                            ($) => $
                        ),
                        'type parameters': context.call(
                            "FunctionDeclaration['type parameters']",
                            Type_Parameters
                        ),
                        'parameters': context.call(
                            "FunctionDeclaration['parameters']",
                            Parameters
                        ),
                        'type': context.call(
                            "FunctionDeclaration['type']",
                            Optional_Type
                        ),
                        'body': context.consume(
                            "FunctionDeclaration['body']",
                            ($) => Block(
                                $,
                                abort,
                            )
                        )
                    })
                )]


                case "IfStatement": return ['if', context.parse_children(
                    "IfStatement",
                    (context) => ({
                        'if keyword': context.consume_and_expect(
                            "IfStatement['if keyword']",
                            "IfKeyword",
                            ($) => null
                        ),
                        'open parenthesis token': context.consume_and_expect(
                            "IfStatement['open parenthesis token']",
                            "OpenParenToken",
                            ($) => null
                        ),
                        'expression': context.consume(
                            "IfStatement['expression']",
                            ($) => Expression(
                                $,
                                abort,
                            )
                        ),
                        'close parenthesis token': context.consume_and_expect(
                            "IfStatement['close parenthesis token']",
                            "CloseParenToken",
                            ($) => null
                        ),
                        'then statement': context.consume(
                            "IfStatement['then statement']",
                            ($) => Statement(
                                $,
                                abort,
                            )
                        ),
                        'else': context.optional(
                            ($) => $.kind === "ElseKeyword",
                            (context) => ({
                                'else keyword': context.consume_and_expect(
                                    "IfStatement['else']['else keyword']",
                                    "ElseKeyword",
                                    ($) => null
                                ),
                                'statement': context.consume(
                                    "IfStatement['else']['statement']",
                                    ($) => Statement(
                                        $,
                                        abort,
                                    )
                                )
                            })
                        )
                    })
                )]
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
                                                    case "Identifier": return ['identifier', $]
                                                    case "NamedImports": return ['named imports', context.parse_children(
                                                        "NamedImports",
                                                        (context): d_out.Named_Imports => ({
                                                            'open brace token': context.consume_and_expect(
                                                                "NamedImports['open brace token']",
                                                                "OpenBraceToken",
                                                                ($) => null
                                                            ),
                                                            'entries': context.consume_syntax_list(
                                                                "NamedImports['entries']",
                                                                ($, context): d_out.Import_Specifier => {
                                                                    switch ($.kind) {
                                                                        case "CommaToken": return ['comma token', null]
                                                                        case "ImportSpecifier": return ['import specifier', context.parse_children(
                                                                            "ImportSpecifier",
                                                                            (context) => ({
                                                                                'identifier': context.consume_and_expect(
                                                                                    "ImportSpecifier['identifier']",
                                                                                    "Identifier",
                                                                                    ($) => $
                                                                                ),
                                                                                'as': context.optional(
                                                                                    ($) => $.kind === "AsKeyword",
                                                                                    (context) => ({
                                                                                        'as keyword': context.consume_and_expect(
                                                                                            "ImportSpecifier['as']['as keyword']",
                                                                                            "AsKeyword",
                                                                                            ($) => null
                                                                                        ),
                                                                                        'identifier': context.consume_and_expect(
                                                                                            "ImportSpecifier['as']['identifier']",
                                                                                            "Identifier",
                                                                                            ($) => $
                                                                                        )
                                                                                    })
                                                                                )
                                                                            })
                                                                        )]
                                                                        default: return abort({
                                                                            'parent': $,
                                                                            'context': "NamedImports['entries']",
                                                                            'cause': ['unexpected node', $],
                                                                            'expected': ['something', "`CommaToken` or `ImportSpecifier`"]
                                                                        })
                                                                    }
                                                                }
                                                            ),
                                                            'close brace token': context.consume_and_expect(
                                                                "NamedImports['close brace token']",
                                                                "CloseBraceToken",
                                                                ($) => null
                                                            )
                                                        })
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
                        'type parameters': context.call(
                            "InterfaceDeclaration['type parameters']",
                            Type_Parameters
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
                        'jsdoc': context.call(
                            "ModuleDeclaration['jsdoc']",
                            JSDoc
                        ),
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
                case "ReturnStatement": return ['return statement', context.parse_children(
                    "ReturnStatement",
                    (context) => ({
                        'jsdoc': context.call(
                            "ReturnStatement['jsdoc']",
                            JSDoc
                        ),
                        'return keyword': context.consume_and_expect(
                            "ReturnStatement['return keyword']",
                            "ReturnKeyword",
                            ($) => null
                        ),
                        'expression': context.optional(
                            ($) => true,
                            ($) => context.consume(
                                "ReturnStatement['expression']",
                                ($) => Expression(
                                    $,
                                    abort,
                                )
                            )
                        )
                    })
                )]
                case "SwitchStatement": return ['switch', context.parse_children(
                    "SwitchStatement",
                    (context): d_out.Switch_Statement => ({
                        'switch keyword': context.consume_and_expect(
                            "SwitchStatement['switch keyword']",
                            "SwitchKeyword",
                            ($) => null,
                        ),
                        'open parenthesis token': context.consume_and_expect(
                            "SwitchStatement['open parenthesis token']",
                            "OpenParenToken",
                            ($) => null,
                        ),
                        'expression': context.consume(
                            "SwitchStatement['expression']",
                            ($) => Expression(
                                $,
                                abort,
                            )
                        ),
                        'close parenthesis token': context.consume_and_expect(
                            "SwitchStatement['close parenthesis token']",
                            "CloseParenToken",
                            ($) => null,
                        ),
                        'case block': context.consume(
                            "SwitchStatement['case block']",
                            ($, context) => context.parse_children(
                                "CaseBlock",
                                (context): d_out.Switch_Statement['case block'] => ({
                                    'open brace token': context.consume_and_expect(
                                        "CaseBlock['open brace token']",
                                        "OpenBraceToken",
                                        ($) => null,
                                    ),
                                    'clauses': context.consume_syntax_list(
                                        "CaseBlock['clauses']",
                                        ($, context): d_out.Switch_Statement_Case_Clause => {
                                            switch ($.kind) {
                                                case "CaseClause": return ['case', context.parse_children(
                                                    "CaseClause",
                                                    (context) => ({
                                                        'case keyword': context.consume_and_expect(
                                                            "CaseClause['case keyword']",
                                                            "CaseKeyword",
                                                            ($) => null,
                                                        ),
                                                        'expression': context.consume(
                                                            "CaseClause['expression']",
                                                            ($) => Expression(
                                                                $,
                                                                abort,
                                                            )
                                                        ),
                                                        'colon token': context.consume_and_expect(
                                                            "CaseClause['colon token']",
                                                            "ColonToken",
                                                            ($) => null,
                                                        ),
                                                        'statements': context.consume_and_expect(
                                                            "CaseClause['statements']",
                                                            "SyntaxList",
                                                            ($) => Statements(
                                                                $,
                                                                abort,
                                                            )
                                                        ),
                                                    })
                                                )]
                                                case "DefaultClause": return ['default', context.parse_children(
                                                    "DefaultClause",
                                                    (context) => ({
                                                        'default keyword': context.consume_and_expect(
                                                            "DefaultClause['default keyword']",
                                                            "DefaultKeyword",
                                                            ($) => null,
                                                        ),
                                                        'colon token': context.consume_and_expect(
                                                            "DefaultClause['colon token']",
                                                            "ColonToken",
                                                            ($) => null,
                                                        ),
                                                        'statements': context.consume_and_expect(
                                                            "DefaultClause['statements']",
                                                            "SyntaxList",
                                                            ($) => Statements(
                                                                $,
                                                                abort,
                                                            )
                                                        ),
                                                    })
                                                )]
                                                default: return abort({
                                                    'parent': $,
                                                    'context': "CaseBlock['clauses']",
                                                    'cause': ['unexpected node', $],
                                                    'expected': ['something', "`CaseClause` or `DefaultClause`"]
                                                })
                                            }
                                        }
                                    ),
                                    'close brace token': context.consume_and_expect(
                                        "CaseBlock['close brace token']",
                                        "CloseBraceToken",
                                        ($) => null,
                                    ),
                                })
                            )
                        )
                    })
                )]
                case "ThrowStatement": return ['throw', context.parse_children(
                    "ThrowStatement",
                    (context) => ({
                        'throw keyword': context.consume_and_expect(
                            "ThrowStatement['throw keyword']",
                            "ThrowKeyword",
                            ($) => null
                        ),
                        'expression': context.consume(
                            "ThrowStatement['expression']",
                            ($) => Expression(
                                $,
                                abort,
                            )
                        ),
                        'semicolon token': context.call(
                            "ThrowStatement['semicolon token']",
                            Semi_Colon
                        ),
                    })
                )]
                case "TypeAliasDeclaration": return ['type alias declaration', context.parse_children(
                    "TypeAliasDeclaration",
                    (context): d_out.Type_Alias_Declaration => ({
                        'jsdoc': context.call(
                            "TypeAliasDeclaration['jsdoc']",
                            JSDoc
                        ),
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
                        'type parameters': context.call(
                            "TypeAliasDeclaration['type parameters']",
                            Type_Parameters
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
                case "VariableStatement": return ['variable statement', context.parse_children(
                    "VariableStatement",
                    (context): d_out.Variable_Statement => ({
                        'jsdoc': context.optional(
                            ($) => $.kind === "JSDoc",
                            (context) => context.consume_and_expect(
                                "VariableStatement['jsdoc']",
                                "JSDoc",
                                ($) => $
                            )
                        ),
                        'modifiers': context.call(
                            "VariableStatement['modifiers']",
                            Modifiers
                        ),
                        'variable declaration list': context.consume_and_expect(
                            "VariableStatement['variable declaration list']",
                            "VariableDeclarationList",
                            ($) => Variable_Declaration_List(
                                $,
                                abort,
                            )
                        ),
                    })
                )]
                case "WhileStatement": return ['while', context.parse_children(
                    "WhileStatement",
                    (context) => ({
                        'while keyword': context.consume_and_expect(
                            "WhileStatement['while keyword']",
                            "WhileKeyword",
                            ($) => null
                        ),
                        'open parenthesis token': context.consume_and_expect(
                            "WhileStatement['open parenthesis token']",
                            "OpenParenToken",
                            ($) => null
                        ),
                        'expression': context.consume(
                            "WhileStatement['expression']",
                            ($) => Expression(
                                $,
                                abort,
                            )
                        ),
                        'close parenthesis token': context.consume_and_expect(
                            "WhileStatement['close parenthesis token']",
                            "CloseParenToken",
                            ($) => null
                        ),
                        'statement': context.consume(
                            "WhileStatement['statement']",
                            ($) => Statement(
                                $,
                                abort,
                            )
                        ),
                    })
                )]
                default: return abort({
                    'parent': $,
                    'context': "Statements",
                    'cause': ['unexpected node', $],
                    'expected': ['something', "a statement"]
                })
            }
        }),
        // 'semicolon token': context.
    })
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
        ($, context): d_out.Statement => Statement(
            $,
            abort
        )
    )
)

export const Variable_Declaration_List: p_i.Refiner<
    d_out.Variable_Declaration_List,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Variable_Declaration_List => context.parse_children(
        "VariableDeclarationList",
        (context): d_out.Variable_Declaration_List => ({
            'mutability': context.consume(
                "VariableDeclarationList['mutability']",
                ($) => {
                    switch ($.kind) {
                        case "ConstKeyword": return ['const keyword', null]
                        case "LetKeyword": return ['let keyword', null]
                        default: return abort({
                            'parent': $,
                            'context': "VariableDeclarationList['mutability']",
                            'cause': ['unexpected node', $],
                            'expected': ['something', "`ConstKeyword` or `LetKeyword`"]
                        })
                    }
                }
            ),
            'declarations': context.consume_syntax_list(
                "VariableDeclarationList['declarations']",
                ($, context): d_out.Variable_Declaration => {
                    switch ($.kind) {
                        case "VariableDeclaration": return context.parse_children(
                            "VariableDeclaration",
                            (context): d_out.Variable_Declaration => ({
                                'name': context.consume_and_expect(
                                    "VariableDeclaration['name']",
                                    "Identifier",
                                    ($) => $
                                ),
                                'type': context.call(
                                    "VariableDeclaration['type']",
                                    Optional_Type
                                ),
                                'assignment': context.optional(
                                    ($) => $.kind === "EqualsToken",
                                    (context) => ({
                                        'equals token': context.consume_and_expect(
                                            "VariableDeclaration['assignment']['equals token']",
                                            "EqualsToken",
                                            ($) => null
                                        ),
                                        'expression': context.consume(
                                            "VariableDeclaration['assignment']['expression']",
                                            ($) => Expression(
                                                $,
                                                abort,
                                            )
                                        )
                                    })
                                ),
                            })
                        )
                        default: return abort({
                            'parent': $,
                            'context': "VariableDeclarationList['declarations']",
                            'cause': ['unexpected node', $],
                            'expected': ['something', "VariableDeclaration"]
                        })
                    }
                }
            )
        })
    )
)

export const Expression: p_i.Refiner<
    d_out.Expression,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Expression => {
        switch ($.kind) {
            case "ArrayLiteralExpression": return ['array literal', context.parse_children(
                "ArrayLiteralExpression",
                (context): d_out.Array_Literal_Expression => ({
                    'open bracket token': context.consume_and_expect(
                        "ArrayLiteralExpression['open bracket token']",
                        "OpenBracketToken",
                        ($) => null
                    ),
                    'elements': context.consume_syntax_list(
                        "ArrayLiteralExpression['elements']",
                        ($, context): d_out.Array_Literal_Expression_Element => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                default: return ['expression', Expression(
                                    $,
                                    abort,
                                )]
                            }
                        }
                    ),
                    'close bracket token': context.consume_and_expect(
                        "ArrayLiteralExpression['close bracket token']",
                        "CloseBracketToken",
                        ($) => null
                    ),
                })
            )]
            case "ArrowFunction": return ['arrow function', context.parse_children(
                "ArrowFunction",
                (context): d_out.Arrow_Function => ({
                    'type parameters': context.call(
                        "ArrowFunction['type parameters']",
                        Type_Parameters
                    ),
                    'parameters': context.peek(
                        "ArrowFunction['parameters']",
                        ($): d_out.Arrow_Function_Parameters => $.kind === "SyntaxList"
                            ? ['without parentheses', context.consume_and_expect(
                                "ArrowFunction['parameters']",
                                "SyntaxList",
                                ($, context): d_out.Without_Parentheses => context.parse_children(
                                    "SyntaxList",
                                    (context): d_out.Without_Parentheses => ({
                                        'parameter': context.consume_and_expect(
                                            "SyntaxList['parameter']",
                                            "Parameter",
                                            ($, context) => context.parse_children(
                                                "Parameter",
                                                (context) => ({

                                                    'identifier': context.consume_and_expect(
                                                        "Parameter['identifier']",
                                                        "Identifier",
                                                        ($) => $
                                                    ),
                                                    'type': context.call(
                                                        "Parameter['type']",
                                                        Optional_Type
                                                    ),
                                                })
                                            )
                                        )
                                    })
                                )
                            )]
                            : ['with parentheses', context.call(
                                "ArrowFunction['parameters']",
                                Parameters
                            )]
                    ),
                    'type': context.call(
                        "ArrowFunction['type']",
                        Optional_Type
                    ),
                    'equals greater than token': context.consume_and_expect(
                        "ArrowFunction['equals greater than token']",
                        "EqualsGreaterThanToken",
                        ($) => null
                    ),
                    'body': context.consume(
                        "ArrowFunction['body']",
                        ($) => {
                            switch ($.kind) {
                                case "Block": return ['block', Block($, abort)]
                                default: return ['expression', Expression(
                                    $,
                                    abort,
                                )]
                            }
                        }
                    )
                })
            )]
            case "AsExpression": return ['as expression', context.parse_children(
                "AsExpression",
                (context) => ({
                    'expression': context.consume(
                        "AsExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'as keyword': context.consume_and_expect(
                        "AsExpression['as keyword']",
                        "AsKeyword",
                        ($) => null
                    ),
                    'type': context.consume(
                        "AsExpression['type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    )
                })
            )]
            case "BinaryExpression": return ['binary', context.parse_children(
                "BinaryExpression",
                (context): d_out.Binary_Expression => ({
                    'left': context.consume(
                        "BinaryExpression['left']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'operator token': context.consume(
                        "BinaryExpression['operator token']",
                        ($) => {
                            switch ($.kind) {
                                case "AsteriskEqualsToken": return ['asterisk equals token', null]
                                case "AsteriskToken": return ['asterisk token', null]
                                case "AmpersandAmpersandToken": return ['ampersand ampersand token', null]
                                case "BarBarToken": return ['bar bar token', null]
                                case "EqualsToken": return ['equals token', null]
                                case "EqualsEqualsEqualsToken": return ['equals equals equals token', null]
                                case "ExclamationEqualsEqualsToken": return ['exclamation equals equals token', null]
                                case "GreaterThanEqualsToken": return ['greater than equals token', null]
                                case "GreaterThanToken": return ['greater than token', null]
                                case "LessThanEqualsToken": return ['less than equals token', null]
                                case "LessThanToken": return ['less than token', null]
                                case "MinusToken": return ['minus token', null]
                                case "PercentToken": return ['percent token', null]
                                case "PlusEqualsToken": return ['plus equals token', null]
                                case "PlusToken": return ['plus token', null]
                                case "SlashToken": return ['slash token', null]
                                default: return abort({
                                    'parent': $,
                                    'context': "BinaryExpression['operator token']",
                                    'cause': ['unexpected node', $],
                                    'expected': ['something', "`EqualsEqualsEqualsToken` or `ExclamationEqualsEqualsToken`"]
                                })
                            }
                        }
                    ),
                    'right': context.consume(
                        "BinaryExpression['right']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    )
                })
            )]
            case "CallExpression": return ['call', context.parse_children(
                "CallExpression",
                (context): d_out.Call_Expression => ({
                    'expression': context.consume(
                        "CallExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'type arguments': context.call(
                        "CallExpression['type arguments']",
                        Type_Arguments
                    ),
                    'open parenthesis token': context.consume_and_expect(
                        "CallExpression['open parenthesis token']",
                        "OpenParenToken",
                        ($) => null
                    ),
                    'arguments': context.consume_syntax_list(
                        "CallExpression['arguments']",
                        ($) => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                default: return ['expression', Expression(
                                    $,
                                    abort,
                                )]
                            }
                        }
                    ),
                    'close parenthesis token': context.consume_and_expect(
                        "CallExpression['close parenthesis token']",
                        "CloseParenToken",
                        ($) => null
                    ),
                })
            )]
            case "ConditionalExpression": return ['conditional', context.parse_children(
                "ConditionalExpression",
                (context): d_out.Conditional_Expression => ({
                    'condition': context.consume(
                        "ConditionalExpression['condition']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'question token': context.consume_and_expect(
                        "ConditionalExpression['question token']",
                        "QuestionToken",
                        ($) => null
                    ),
                    'when true': context.consume(
                        "ConditionalExpression['when true']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'colon token': context.consume_and_expect(
                        "ConditionalExpression['colon token']",
                        "ColonToken",
                        ($) => null
                    ),
                    'when false': context.consume(
                        "ConditionalExpression['when false']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    )
                })
            )]
            case "ElementAccessExpression": return ['element access', context.parse_children(
                "ElementAccessExpression",
                (context) => ({
                    'expression': context.consume(
                        "ElementAccessExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'open bracket token': context.consume_and_expect(
                        "ElementAccessExpression['open bracket token']",
                        "OpenBracketToken",
                        ($) => null
                    ),
                    'argument expression': context.consume(
                        "ElementAccessExpression['argument expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'close bracket token': context.consume_and_expect(
                        "ElementAccessExpression['close bracket token']",
                        "CloseBracketToken",
                        ($) => null
                    ),
                })
            )]
            case "FalseKeyword": return ['false keyword', null]
            case "Identifier": return ['identifier', $]
            case "ObjectLiteralExpression": return ['object literal', context.parse_children(
                "ObjectLiteralExpression",
                (context): d_out.Object_Literal_Expression => ({
                    'open brace token': context.consume_and_expect(
                        "ObjectLiteralExpression['open brace token']",
                        "OpenBraceToken",
                        ($) => null
                    ),
                    'properties': context.consume_syntax_list(
                        "ObjectLiteralExpression['properties']",
                        ($, context): d_out.Object_Literal_Expression_Property => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                case "PropertyAssignment": return ['property assignment', context.parse_children(
                                    "PropertyAssignment",
                                    (context): d_out.Property_Assignment => ({
                                        'jsdoc': context.call(
                                            "PropertyAssignment['jsdoc']",
                                            JSDoc
                                        ),
                                        'name': context.consume(
                                            "PropertyAssignment['name']",
                                            ($) => String_Literal_or_Identifier(
                                                $,
                                                abort,
                                            )
                                        ),
                                        'colon token': context.consume_and_expect(
                                            "PropertyAssignment['colon token']",
                                            "ColonToken",
                                            ($) => null
                                        ),
                                        'initializer': context.consume(
                                            "PropertyAssignment['initializer']",
                                            ($) => Expression(
                                                $,
                                                abort,
                                            )
                                        )
                                    })
                                )]
                                case "ShorthandPropertyAssignment": return ['shorthand property assignment', context.parse_children(
                                    "ShorthandPropertyAssignment",
                                    (context) => ({
                                        // 'jsdoc': context.call(
                                        //     "ShorthandPropertyAssignment['jsdoc']",
                                        //     JSDoc
                                        // ),
                                        'name': context.consume(
                                            "ShorthandPropertyAssignment['name']",
                                            ($) => String_Literal_or_Identifier(
                                                $,
                                                abort,
                                            )
                                        ),
                                    })
                                )]
                                default: return abort({
                                    'parent': $,
                                    'context': "ObjectLiteralExpression['properties']",
                                    'cause': ['unexpected node', $],
                                    'expected': ['something', "`CommaToken` or `PropertyAssignment`"]
                                })
                            }
                        }
                    ),
                    'close brace token': context.consume_and_expect(
                        "ObjectLiteralExpression['close brace token']",
                        "CloseBraceToken",
                        ($) => null
                    ),
                })
            )]
            case "NoSubstitutionTemplateLiteral": return ['no substitution template literal', $]
            case "NonNullExpression": return ['non null', context.parse_children(
                "NonNullExpression",
                (context) => ({
                    'expression': context.consume(
                        "NonNullExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'exclamation token': context.consume_and_expect(
                        "NonNullExpression['exclamation token']",
                        "ExclamationToken",
                        ($) => null
                    )
                })
            )]
            case "NullKeyword": return ['null keyword', null]
            case "NumericLiteral": return ['numeric literal', $]
            case "ParenthesizedExpression": return ['parenthesized', context.parse_children(
                "ParenthesizedExpression",
                (context) => ({
                    'open parenthesis token': context.consume_and_expect(
                        "ParenthesizedExpression['open parenthesis token']",
                        "OpenParenToken",
                        ($) => null
                    ),
                    'expression': context.consume(
                        "ParenthesizedExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'close parenthesis token': context.consume_and_expect(
                        "ParenthesizedExpression['close parenthesis token']",
                        "CloseParenToken",
                        ($) => null
                    ),
                })
            )]
            case "PostfixUnaryExpression": return ['postfix unary', context.parse_children(
                "PostfixUnaryExpression",
                (context) => ({
                    'operand': context.consume(
                        "PostfixUnaryExpression['operand']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'operator token': context.consume(
                        "PostfixUnaryExpression['operator token']",
                        ($) => {
                            switch ($.kind) {
                                case "MinusMinusToken": return ['minus minus token', null]
                                case "PlusPlusToken": return ['plus plus token', null]
                                default: return abort({
                                    'parent': $,
                                    'context': "PostfixUnaryExpression['operator token']",
                                    'cause': ['unexpected node', $],
                                    'expected': ['something', "`ExclamationToken` or `MinusMinusToken`"]
                                })
                            }
                        }
                    )
                })
            )]
            case "PrefixUnaryExpression": return ['prefix unary', context.parse_children(
                "PrefixUnaryExpression",
                (context) => ({
                    'operator token': context.consume(
                        "PrefixUnaryExpression['operator token']",
                        ($) => {
                            switch ($.kind) {
                                case "ExclamationToken": return ['exclamation token', null]
                                case "MinusToken": return ['minus token', null]
                                case "PlusToken": return ['plus token', null]
                                default: return abort({
                                    'parent': $,
                                    'context': "PrefixUnaryExpression['operator token']",
                                    'cause': ['unexpected node', $],
                                    'expected': ['something', "`ExclamationToken`"]
                                })
                            }
                        }
                    ),
                    'operand': context.consume(
                        "PrefixUnaryExpression['operand']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    )
                })
            )]
            case "PropertyAccessExpression": return ['property access', context.parse_children(
                "PropertyAccessExpression",
                (context): d_out.Property_Access_Expression => ({
                    'expression': context.consume(
                        "PropertyAccessExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                    'dot token': context.consume_and_expect(
                        "PropertyAccessExpression['dot token']",
                        "DotToken",
                        ($) => null
                    ),
                    'name': context.consume_and_expect(
                        "PropertyAccessExpression['name']",
                        "Identifier",
                        ($) => $
                    )
                })
            )]
            case "StringLiteral": return ['string literal', $]
            case "TemplateExpression": return ['template', context.parse_children(
                "TemplateExpression",
                (context): d_out.Template_Expression => ({
                    'head': context.consume_and_expect(
                        "TemplateExpression['head']",
                        "TemplateHead",
                        ($) => $
                    ),
                    'template spans': context.consume_syntax_list(
                        "TemplateExpression['template spans']",
                        ($, context): d_out.Template_Span => {
                            switch ($.kind) {
                                case "TemplateSpan": return context.parse_children(
                                    "TemplateSpan",
                                    (context): d_out.Template_Span => ({
                                        'expression': context.consume(
                                            "TemplateSpan['expression']",
                                            ($) => Expression(
                                                $,
                                                abort,
                                            )
                                        ),
                                        'template middle or tail': context.consume(
                                            "TemplateSpan['template middle or tail']",
                                            ($) => {
                                                switch ($.kind) {
                                                    case "TemplateTail": return $
                                                    case "TemplateMiddle": return $
                                                    default: return abort({
                                                        'parent': $,
                                                        'context': "TemplateSpan['template middle or tail']",
                                                        'cause': ['unexpected node', $],
                                                        'expected': ['something', "`TemplateTail` or `TemplateMiddle`"]
                                                    })
                                                }
                                            }
                                        )
                                    })
                                )
                                default: return abort({
                                    'parent': $,

                                    'context': "TemplateExpression['template spans']",
                                    'cause': ['unexpected node', $],
                                    'expected': ['something', "TemplateSpan"]
                                })
                            }
                        }
                    )
                })
            )]
            case "TrueKeyword": return ['true keyword', null]
            case "TypeOfExpression": return ['type of', context.parse_children(
                "TypeOfExpression",
                (context) => ({
                    'type of keyword': context.consume_and_expect(
                        "TypeOfExpression['type of keyword']",
                        "TypeOfKeyword",
                        ($) => null
                    ),
                    'expression': context.consume(
                        "TypeOfExpression['expression']",
                        ($) => Expression(
                            $,
                            abort,
                        )
                    ),
                })
            )]
            default: return abort({
                'parent': $,
                'context': "Expression",
                'cause': ['unexpected node', $],
                'expected': ['something', "`StringLiteral` or `ArrowFunction`"]
            })
        }
    }
)
export const Parameters_Entry: p_i.Refiner<
    d_out.Parameters_Entry,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Parameters_Entry => {
        switch ($.kind) {
            case "CommaToken": return ['comma token', null]
            case "Parameter": return ['parameter', context.parse_children(
                "Parameter",
                (context) => ({
                    'identifier': context.consume_and_expect(
                        "Parameter['identifier']",
                        "Identifier",
                        ($) => $
                    ),
                    'question token': context.optional(
                        ($) => $.kind === "QuestionToken",
                        (context) => context.consume_and_expect(
                            "Parameter['question token']",
                            "QuestionToken",
                            ($) => null
                        )
                    ),
                    'type': context.call(
                        "Parameter['type']",
                        Optional_Type
                    )
                })
            )]
            default: return abort({
                'parent': $,
                'context': "Parameters_Entry",
                'cause': ['unexpected node', $],
                'expected': ['something', "`CommaToken` or `Parameter`"]
            })
        }
    }
)

export const Block: p_i.Refiner<
    d_out.Block,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => h.create_node_context(
    $,
    abort,
    (context): d_out.Block => {
        switch ($.kind) {
            case "Block": return context.parse_children(
                "Block",
                (context): d_out.Block => ({
                    'open brace token': context.consume_and_expect(
                        "Block['open brace token']",
                        "OpenBraceToken",
                        ($) => null
                    ),
                    'statements': context.consume_and_expect(
                        "Block['statements']",
                        "SyntaxList",
                        ($) => Statements(
                            $,
                            abort,
                        )
                    ),
                    'close brace token': context.consume_and_expect(
                        "Block['close brace token']",
                        "CloseBraceToken",
                        ($) => null
                    ),
                })
            )
            default: return abort({
                'parent': $,
                'context': "Block",
                'cause': ['unexpected node', $],
                'expected': ['something', "`Block`"]
            })
        }
    }
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
            case "AnyKeyword": return ['any keyword', null]
            case "ArrayType": return ['array', context.parse_children(
                "ArrayType",
                (context) => ({
                    'element type': context.consume(
                        "ArrayType['element type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    ),
                    'open bracket token': context.consume_and_expect(
                        "ArrayType['open bracket token']",
                        "OpenBracketToken",
                        ($) => null
                    ),
                    'close bracket token': context.consume_and_expect(
                        "ArrayType['close bracket token']",
                        "CloseBracketToken",
                        ($) => null
                    ),
                })
            )]
            case "BooleanKeyword": return ['boolean keyword', null]
            case "IndexedAccessType": return ['indexed access', context.parse_children(
                "IndexedAccessType",
                (context) => ({
                    'object type': context.consume(
                        "IndexedAccessType['object type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    ),
                    'open bracket token': context.consume_and_expect(
                        "IndexedAccessType['open bracket token']",
                        "OpenBracketToken",
                        ($) => null
                    ),
                    'index type': context.consume(
                        "IndexedAccessType['index type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    ),
                    'close bracket token': context.consume_and_expect(
                        "IndexedAccessType['close bracket token']",
                        "CloseBracketToken",
                        ($) => null
                    ),
                })
            )]
            case "FunctionType": return ['function', context.parse_children(
                "FunctionType",
                (context): d_out.Function_Type => ({
                    'type parameters': context.call(
                        "FunctionType['type parameters']",
                        Type_Parameters
                    ),
                    'parameters': context.call(
                        "FunctionType['parameters']",
                        Parameters
                    ),
                    'equals greater than token': context.consume_and_expect(
                        "FunctionType['equals greater than token']",
                        "EqualsGreaterThanToken",
                        ($) => null
                    ),
                    'return type': context.consume(
                        "FunctionType['return type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    ),
                    'type': context.call(
                        "FunctionType['type']",
                        Optional_Type
                    )
                })
            )]
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
            case "NeverKeyword": return ['never keyword', null]
            case "NumberKeyword": return ['number keyword', null]
            case "StringKeyword": return ['string keyword', null]
            case "SymbolKeyword": return ['symbol keyword', null]
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
            case "TypeOperator": return ['type operator', context.parse_children(
                "TypeOperator",
                (context) => ({
                    'readonly keyword': context.consume_and_expect(
                        "TypeOperator['readonly keyword']",
                        "ReadonlyKeyword",
                        ($) => null
                    ),
                    'type': context.consume(
                        "TypeOperator['type']",
                        ($) => Type(
                            $,
                            abort,
                        )
                    )
                })
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
                    'type arguments': context.call(
                        "TypeReference['type arguments']",
                        Type_Arguments
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
            case "VoidKeyword": return ['void keyword', null]
            default: return abort({
                'context': "Type",
                'parent': $,
                'cause': ['unexpected node', $],
                'expected': ['something', "a Type"]
            })
        }
    }
)

export const String_Literal_or_Identifier: p_i.Refiner<
    d_out.String_Literal_or_Identifier,
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
                            'jsdoc': context.call(
                                "PropertyAssignment['jsdoc']",
                                JSDoc
                            ),
                            'modifiers': context.call(
                                "PropertySignature['modifiers']",
                                Modifiers
                            ),
                            'id': context.consume(
                                "PropertySignature['id']",
                                ($, parent) => String_Literal_or_Identifier(
                                    $,
                                    abort,
                                )
                            ),
                            'question token': context.optional(
                                ($) => $.kind === "QuestionToken",
                                (context) => context.consume_and_expect(
                                    "PropertySignature['question token']",
                                    "QuestionToken",
                                    ($) => null
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
                            ),
                            'comma token': context.optional(
                                ($) => $.kind === "CommaToken",
                                (context) => context.consume_and_expect(
                                    "PropertySignature['comma token']",
                                    "CommaToken",
                                    ($) => null
                                )
                            ),
                            'semicolon token': context.optional(
                                ($) => $.kind === "SemicolonToken",
                                (context) => context.consume_and_expect(
                                    "PropertySignature['semicolon token']",
                                    "SemicolonToken",
                                    ($) => null
                                )
                            ),
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
    (context): d_out.Type_Arguments => context.optional(
        ($) => $.kind === "LessThanToken",
        (context) => ({

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
    (context): d_out.Type_Parameters => context.optional(
        ($) => $.kind === "LessThanToken",
        (context) => ({
            'less than token': context.consume_and_expect(
                "TypeParameters['less than token']",
                "LessThanToken",
                ($) => null,
            ),
            'entries': context.consume_syntax_list(
                "TypeParameters['entries']",
                ($, context): d_out.Type_Parameters_Entry => {
                    switch ($.kind) {
                        case "CommaToken": return ['comma token', null]
                        case "TypeParameter": return ['type parameter', context.parse_children(
                            "TypeParameter",
                            (context) => ({
                                'identifier': context.consume_and_expect(
                                    "TypeParameter['identifier']",
                                    "Identifier",
                                    ($) => $
                                ),
                                'extends': context.optional(
                                    ($) => $.kind === "ExtendsKeyword",
                                    (context) => ({
                                        'extends keyword': context.consume_and_expect(
                                            "TypeParameter['extends keyword']",
                                            "ExtendsKeyword",
                                            ($) => null
                                        ),
                                        'type': context.consume(
                                            "TypeParameter['type']",
                                            ($) => Type(
                                                $,
                                                abort,
                                            )
                                        )
                                    })
                                )
                            })
                        )]
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

)

export const Parameters: p_pi.Production_With_Parameter<
    d_out.Parameters,
    d_function.Error_Inner,
    d_in.Node,
    null,
    {
        'parent': d_in.Node,
        'location description': string
    }
> = (iterator, abort, $p): d_out.Parameters => h.create_iterator_context(
    iterator,
    abort,
    $p.parent,
    (context): d_out.Parameters => ({
        'open parenthesis token': context.consume_and_expect(
            "Parameters['open parenthesis token']",
            "OpenParenToken",
            ($) => null
        ),
        'entries': context.consume_syntax_list(
            "Parameters['entries']",
            ($, context) => Parameters_Entry(
                $,
                abort,
            )
        ),
        'close parenthesis token': context.consume_and_expect(
            "Parameters['close parenthesis token']",
            "CloseParenToken",
            ($) => null
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
    (context) => context.optional(
        ($) => $.kind === "SyntaxList",
        (context) => context.consume(
            "Modifiers",
            ($, context) => context.process_children_as_list(
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
        )
    )
)


export const Semi_Colon: p_pi.Production_With_Parameter<
    d_out.Semi_Colon,
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
    (context) => context.optional(
        ($) => $.kind === "SemicolonToken",
        (context) => context.consume(
            "Semi_Colon",
            ($) => null
        )
    )
)

export const JSDoc: p_pi.Production_With_Parameter<
    d_out.JSDoc,
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
    (context) => context.optional(
        ($) => $.kind === "JSDoc",
        (context) => context.consume(
            "JSDoc",
            ($) => $
        )
    )
)

export const Optional_Type: p_pi.Production_With_Parameter<
    d_out.Optional_Type,
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
    (context): d_out.Optional_Type => context.optional(
        ($) => $.kind === "ColonToken",
        (context) => ({
            'colon token': context.consume_and_expect(
                "Optional_Type['colon token']",
                "ColonToken",
                ($) => null,
            ),
            'type': context.consume(
                "Optional_Type['type']",
                ($) => Type(
                    $,
                    abort,
                )
            )
        })
    )
)