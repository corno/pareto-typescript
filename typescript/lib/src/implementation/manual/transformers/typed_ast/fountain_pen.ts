import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_in from "../../../../interface/data/typed_ast"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Source_File: p_i.Transformer<d_in.Source_File, d_out.Paragraph> = ($) => Statements($.statements)

export const Statements: p_i.Transformer<d_in.Statements, d_out.Paragraph> = ($) => sh.pg.composed(
    p_.from.list($).map(
        ($) => sh.pg.sentences([
            sh.sentence([
                Statement($),
            ]),
            sh.sentence([]),
        ]),
    )
)

export const Block: p_i.Transformer<d_in.Block, d_out.Phrase> = ($) => sh.ph.composed([
    sh.ph.literal("{"),
    sh.ph.indent(
        Statements($['statements'])
    ),
    sh.ph.literal("}"),
])

export const Statement: p_i.Transformer<d_in.Statement, d_out.Phrase> = ($) => sh.ph.composed([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'block': return p_.ss($, ($) => Block($))
                case 'break': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("break"),
                ]))
                // case 'class declaration': return p_.ss($, ($) => sh.ph.composed([
                //     sh.ph.literal("class "),
                //     sh.ph.literal($.identifier.text),
                //     Type_Parameters($['type parameters']),
                //     p_.from.optional($['heritage clauses']).decide(
                //         ($) => sh.ph.composed([
                //             sh.ph.literal(" extends "),
                //             sh.ph.composed(
                //                 p_.from.list($).map(
                //                     ($) => Heritage_Clause($)
                //                 )
                //             )
                //         ]),
                //         () => sh.ph.nothing()
                //     ),
                //     sh.ph.literal(" {"),
                //     sh.ph.indent(
                //         sh.pg.composed([
                //             sh.pg.sentences([
                //                 sh.sentence([]),
                //             ]),
                //             sh.pg.composed(
                //                 p_.from.list($.body.members).map(
                //                     ($) => sh.pg.sentences([
                //                         sh.sentence([
                //                             p_.from.state($).decide(
                //                                 ($) => {
                //                                     switch ($[0]) {
                //                                         case 'constructor': return p_.ss($, ($) => sh.ph.composed([
                //                                             sh.ph.literal("constructor"),
                //                                             Parameters($['parameters']),
                //                                             Block($['body']),

                //                                         ]))
                //                                         case 'method': return p_.ss($, ($) => sh.ph.composed([
                //                                             sh.ph.literal($.identifier.text),
                //                                             Parameters($['parameters']),
                //                                             Optional_Type($['type']),
                //                                             Block($['body']),
                //                                         ]))
                //                                         case 'property': return p_.ss($, ($) => sh.ph.composed([
                //                                             sh.ph.literal($.identifier.text),
                //                                             Optional_Type($['type']),
                //                                         ]))
                //                                         default: return p_.au($[0])
                //                                     }
                //                                 }
                //                             )
                //                         ]),
                //                     ])
                //                 )
                //             )

                //         ]),

                //     ),
                // ]))
                case 'do': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("do "),
                    Statement($['statement']),
                    sh.ph.literal(" while ("),
                    Expression($['expression']),
                    sh.ph.literal(")"),
                ]))
                case 'export declaration': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("export "),
                    p_.from.state($['type']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'named exports': return p_.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("{"),
                                    sh.ph.composed(
                                        p_.from.list($['exports']).map(
                                            ($) => p_.from.state($).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                                        case 'export specifier': return p_.ss($, ($) => sh.ph.composed([
                                                            sh.ph.literal($.identifier.text),
                                                            p_.from.optional($['as']).decide(
                                                                ($) => sh.ph.composed([
                                                                    sh.ph.literal(" as "),
                                                                    sh.ph.literal($['identifier'].text),
                                                                ]),
                                                                () => sh.ph.nothing()
                                                            )
                                                        ]))
                                                        default: return p_.au($[0])
                                                    }
                                                }
                                            )
                                        )
                                    ),
                                    sh.ph.literal("}"),
                                ]))
                                default: return p_.au($[0])
                            }
                        }
                    )
                ]))
                case 'expression': return p_.ss($, ($) => sh.ph.composed([
                    Expression($['expression']),
                    Semi_Colon($['semicolon']),
                ]))
                case 'for': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("for ("),
                    Variable_Declaration_List($['variable declaration list']),
                    sh.ph.literal("; "),
                    p_.from.optional($['condition']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal("; "),
                    p_.from.optional($['incrementor']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal(") "),
                    Statement($['statement']),
                ]))
                case 'for in': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("for ("),
                    Variable_Declaration_List($['variable declaration list']),
                    sh.ph.literal(" in "),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['statement']),
                ]))
                case 'function declaration': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("function "),
                    sh.ph.literal($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    Parameters($['parameters']),
                    Optional_Type($['type']),
                    sh.ph.literal(" "),
                    Block($['body']),
                ]))
                case 'if': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("if ("),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['then statement']),
                    p_.from.optional($['else']).decide(
                        ($) => sh.ph.composed([
                            sh.ph.literal(" else "),
                            Statement($['statement']),
                        ]),
                        () => sh.ph.nothing()
                    )
                ]))
                case 'import declaration': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("import "),
                    p_.from.state($.clause.type).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'identifier': return p_.ss($, ($) => sh.ph.literal($.text))
                                case 'named imports': return p_.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("{"),
                                    sh.ph.composed(
                                        p_.from.list($.entries).map(
                                            ($): d_out.Phrase => p_.from.state($).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                                        case 'import specifier': return p_.ss($, ($) => sh.ph.composed([
                                                            sh.ph.literal($.identifier.text),
                                                            p_.from.optional($['as']).decide(
                                                                ($) => sh.ph.composed([
                                                                    sh.ph.literal(" as "),
                                                                    sh.ph.literal($['identifier'].text),
                                                                ]),
                                                                () => sh.ph.nothing()
                                                            )
                                                        ]))
                                                        default: return p_.au($[0])
                                                    }
                                                }
                                            )
                                        )
                                    ),
                                    sh.ph.literal("}"),

                                ]))
                                case 'namespace import': return p_.ss($, ($) => sh.ph.composed([
                                    sh.ph.literal("* as "),
                                    sh.ph.literal($['identifier'].text)
                                ]))
                                default: return p_.au($[0])
                            }
                        }
                    ),
                    sh.ph.literal(" from "),
                    sh.ph.literal($['string literal'].text)
                ]))
                case 'interface declaration': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("interface "),
                    sh.ph.literal($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    sh.ph.literal(" "),
                    Type_Literal($['body']),
                ]))
                case 'module declaration': return p_.ss($, ($) => sh.ph.composed([
                    JSDoc($['jsdoc']),
                    Modifiers($['modifiers']),
                    sh.ph.literal("namespace "),
                    sh.ph.literal($['identifier'].text),
                    sh.ph.literal(" {"),
                    sh.ph.indent(
                        sh.pg.composed([
                            sh.pg.sentences([
                                sh.sentence([]),
                            ]),
                            Statements($['module block']['statements'])
                        ]),
                    ),
                    sh.ph.literal("}")
                ]))
                case 'return statement': return p_.ss($, ($) => sh.ph.composed([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("return "),
                    p_.from.optional($['expression']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    )
                ]))
                case 'switch': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("switch ("),
                    Expression($['expression']),
                    sh.ph.literal(") {"),
                    sh.ph.indent(
                        sh.pg.sentences(
                            p_.from.list($['case block']['clauses']).map(
                                ($): d_out.Sentence => sh.sentence([
                                    p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'case': return p_.ss($, ($) => sh.ph.composed([
                                                    sh.ph.literal("case "),
                                                    Expression($['expression']),
                                                    sh.ph.literal(":"),
                                                    sh.ph.indent(
                                                        Statements($['statements'])
                                                    )
                                                ]))
                                                case 'default': return p_.ss($, ($) => sh.ph.composed([
                                                    sh.ph.literal("default:"),
                                                    sh.ph.indent(
                                                        Statements($['statements'])
                                                    )
                                                ]))
                                                default: return p_.au($[0])
                                            }
                                        }
                                    )
                                ])
                            )
                        ),
                    ),
                    sh.ph.literal("}")
                ]))
                case 'throw': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("throw "),
                    Expression($['expression']),
                    Semi_Colon($['semicolon']),
                ]))
                case 'type alias declaration': return p_.ss($, ($) => sh.ph.composed([
                    JSDoc($['jsdoc']),
                    Modifiers($['modifiers']),
                    sh.ph.literal("type "),
                    sh.ph.literal($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    sh.ph.literal(" = "),
                    Type($['type']),
                ]))
                case 'variable statement': return p_.ss($, ($) => sh.ph.composed([
                    p_.from.optional($['jsdoc']).decide(
                        ($) => sh.ph.composed([
                            sh.ph.literal("/**"),
                            sh.ph.literal($.text),
                            sh.ph.literal("*/")
                        ]),
                        () => sh.ph.nothing()
                    ),
                    Modifiers($['modifiers']),
                    Variable_Declaration_List($['variable declaration list']),
                ]))
                case 'while': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("while ("),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['statement'])
                ]))
                default: return p_.au($[0])
            }
        }
    ),
    // p_.from.optional($['semicolon token']).decide(
    //     ($) => sh.ph.literal(";"),
    //     () => sh.ph.nothing()
    // )
])

export const Variable_Declaration_List: p_i.Transformer<d_in.Variable_Declaration_List, d_out.Phrase> = ($) => sh.ph.composed([
    p_.from.state($.mutability).decide(
        ($) => {
            switch ($[0]) {
                case 'const keyword': return sh.ph.literal("const ")
                case 'let keyword': return sh.ph.literal("let ")
                default: return sh.ph.nothing()
            }
        }
    ),
    sh.ph.composed(
        p_.from.list($['declarations']).map(
            ($) => sh.ph.composed([
                sh.ph.literal($.name.text),
                Optional_Type($.type),
                p_.from.optional($['assignment']).decide(
                    ($) => sh.ph.composed([
                        sh.ph.literal(" = "),
                        Expression($['expression']),
                    ]),
                    () => sh.ph.nothing()
                )
            ])
        )
    )
])

export const Semi_Colon: p_i.Transformer<d_in.Semi_Colon, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => sh.ph.literal(";"),
    () => sh.ph.nothing()
)

export const JSDoc: p_i.Transformer<d_in.JSDoc, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed([
        sh.ph.literal("/**"),
        sh.ph.literal($.text),
        sh.ph.literal("*/")
    ]),
    () => sh.ph.nothing()
)

export const Optional_Type: p_i.Transformer<d_in.Optional_Type, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed([
        sh.ph.literal(": "),
        Type($['type']),
    ]),
    () => sh.ph.nothing()
)

export const Expression: p_i.Transformer<d_in.Expression, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'array literal': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.composed(
                    p_.from.list($['elements']).map(
                        ($) => sh.ph.composed([
                            p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                        case 'expression': return p_.ss($, ($) => Expression($))
                                        default: return p_.au($[0])
                                    }
                                }
                            ),
                        ])
                    )
                ),
                sh.ph.literal("]"),
            ]))
            case 'arrow function': return p_.ss($, ($) => sh.ph.composed([
                Type_Parameters($['type parameters']),
                p_.from.state($['parameters']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'with parentheses': return p_.ss($, ($) => Parameters($))
                            case 'without parentheses': return p_.ss($, ($) => sh.ph.composed([
                                sh.ph.literal($.parameter.identifier.text),
                                Optional_Type($.parameter.type)
                            ]))
                            default: return p_.au($[0])
                        }
                    }
                ),
                Optional_Type($['type']),
                sh.ph.literal(" => "),
                p_.from.state($['body']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'block': return p_.ss($, ($) => Block($))
                            case 'expression': return p_.ss($, ($) => Expression($))
                            default: return p_.au($[0])
                        }
                    }
                ),
            ]))
            case 'as expression': return p_.ss($, ($) => sh.ph.composed([
                Expression($['expression']),
                sh.ph.literal(" as "),
                Type($['type']),
            ]))
            case 'binary': return p_.ss($, ($) => sh.ph.composed([
                Expression($['left']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'asterisk equals token': return p_.ss($, ($) => sh.ph.literal(" *= "))
                            case 'asterisk token': return p_.ss($, ($) => sh.ph.literal(" * "))
                            case 'ampersand ampersand token': return p_.ss($, ($) => sh.ph.literal(" && "))
                            case 'bar bar token': return p_.ss($, ($) => sh.ph.literal(" || "))
                            case 'equals token': return p_.ss($, ($) => sh.ph.literal(" = "))
                            case 'equals equals equals token': return p_.ss($, ($) => sh.ph.literal(" === "))
                            case 'exclamation equals equals token': return p_.ss($, ($) => sh.ph.literal(" !== "))
                            case 'greater than equals token': return p_.ss($, ($) => sh.ph.literal(" >= "))
                            case 'greater than token': return p_.ss($, ($) => sh.ph.literal(" > "))
                            case 'less than equals token': return p_.ss($, ($) => sh.ph.literal(" <= "))
                            case 'less than token': return p_.ss($, ($) => sh.ph.literal(" < "))
                            case 'minus token': return p_.ss($, ($) => sh.ph.literal(" - "))
                            case 'percent token': return p_.ss($, ($) => sh.ph.literal(" % "))
                            case 'plus equals token': return p_.ss($, ($) => sh.ph.literal(" += "))
                            case 'plus token': return p_.ss($, ($) => sh.ph.literal(" + "))
                            case 'slash token': return p_.ss($, ($) => sh.ph.literal(" / "))
                            default: return p_.au($[0])
                        }
                    }
                ),
                Expression($['right']),
            ]))
            case 'call': return p_.ss($, ($) => sh.ph.composed([
                Expression($['expression']),
                sh.ph.literal("("),
                sh.ph.indent(
                    sh.pg.sentences(
                        p_.from.list($['arguments']).map(
                            ($) => sh.sentence([
                                p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                            case 'expression': return p_.ss($, ($) => Expression($))
                                            default: return p_.au($[0])
                                        }
                                    }
                                ),
                            ])
                        )
                    )
                ),
                sh.ph.literal(")"),
            ]))
            case 'conditional': return p_.ss($, ($) => sh.ph.composed([
                Expression($['condition']),
                sh.ph.literal(" ? "),
                Expression($['when true']),
                sh.ph.literal(" : "),
                Expression($['when false']),
            ]))
            case 'element access': return p_.ss($, ($) => sh.ph.composed([
                Expression($['expression']),
                sh.ph.literal("["),
                Expression($['argument expression']),
                sh.ph.literal("]"),
            ]))
            case 'false keyword': return p_.ss($, ($) => sh.ph.literal("false"))
            case 'identifier': return p_.ss($, ($) => sh.ph.literal($.text))
            case 'object literal': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.composed(
                    p_.from.list($['properties']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                    case 'property assignment': return p_.ss($, ($) => sh.ph.composed([
                                        JSDoc($['jsdoc']),
                                        String_Literal_Or_Identifier($['name']),
                                        sh.ph.literal(": "),
                                        Expression($['initializer']),
                                    ]))
                                    case 'shorthand property assignment': return p_.ss($, ($) => sh.ph.composed([
                                        String_Literal_Or_Identifier($['name']),
                                    ]))
                                    default: return p_.au($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal("}"),
            ]))
            case 'no substitution template literal': return p_.ss($, ($) => sh.ph.literal($.text))
            case 'non null': return p_.ss($, ($) => sh.ph.composed([
                Expression($['expression']),
                sh.ph.literal("!"),
            ]))

            case 'null keyword': return p_.ss($, ($) => sh.ph.literal("null"))
            case 'numeric literal': return p_.ss($, ($) => sh.ph.literal($.text))
            case 'parenthesized': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("("),
                Expression($['expression']),
                sh.ph.literal(")"),
            ]))
            case 'postfix unary': return p_.ss($, ($) => sh.ph.composed([
                Expression($['operand']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'minus minus token': return p_.ss($, ($) => sh.ph.literal("--"))
                            case 'plus plus token': return p_.ss($, ($) => sh.ph.literal("++"))
                            default: return p_.au($[0])
                        }
                    }
                )
            ]))
            case 'prefix unary': return p_.ss($, ($) => sh.ph.composed([
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'exclamation token': return p_.ss($, ($) => sh.ph.literal("!"))
                            case 'minus token': return p_.ss($, ($) => sh.ph.literal("-"))
                            case 'plus token': return p_.ss($, ($) => sh.ph.literal("+"))
                            default: return p_.au($[0])
                        }
                    }
                ),
                Expression($['operand']),
            ]))
            case 'property access': return p_.ss($, ($) => sh.ph.composed([
                Expression($['expression']),
                sh.ph.literal("."),
                sh.ph.literal($['name'].text),
            ]))
            case 'string literal': return p_.ss($, ($) => sh.ph.literal($.text))
            case 'template': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal($.head.text),
                sh.ph.composed(
                    p_.from.list($['template spans']).map(
                        ($) => sh.ph.composed([
                            Expression($['expression']),
                            p_.from.state($['suffix']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'middle': return p_.ss($, ($) => sh.ph.literal($.text))
                                        case 'tail': return p_.ss($, ($) => sh.ph.literal($.text))
                                        default: return p_.au($[0])
                                    }
                                }
                            )
                        ])
                    )
                )
            ]))
            case 'true keyword': return p_.ss($, ($) => sh.ph.literal("true"))
            case 'type of': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("typeof "),
                Expression($['expression']),
            ]))
            default: return p_.au($[0])
        }
    }
)

export const Parameters: p_i.Transformer<d_in.Parameters, d_out.Phrase> = ($) => sh.ph.composed([
    sh.ph.literal("("),
    sh.ph.composed(
        p_.from.list($.entries).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                        case 'parameter': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal($.identifier.text),
                            p_.from.optional($['question token']).decide(
                                () => sh.ph.literal("?"),
                                () => sh.ph.nothing()
                            ),
                            Optional_Type($.type),
                        ]))
                        default: return p_.au($[0])
                    }
                }
            )
        )
    ),
    sh.ph.literal(")"),
])

export const Modifiers: p_i.Transformer<d_in.Modifiers, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'export': return p_.ss($, ($) => sh.ph.literal("export "))
                        case 'readonly': return p_.ss($, ($) => sh.ph.literal("readonly "))
                        default: return p_.au($[0])
                    }
                }
            )
        )
    ),
    () => sh.ph.nothing()
)

export const Type: p_i.Transformer<d_in.Type, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'any keyword': return p_.ss($, ($) => sh.ph.literal("any"))
            case 'array': return p_.ss($, ($) => sh.ph.composed([
                Type($['element type']),
                sh.ph.literal("[]"),
            ]))
            case 'boolean keyword': return p_.ss($, ($) => sh.ph.literal("boolean"))
            case 'function': return p_.ss($, ($) => sh.ph.composed([
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                Optional_Type($['type']),
                sh.ph.literal(" => "),
                Type($['return type']),
            ]))
            case 'indexed access': return p_.ss($, ($) => sh.ph.composed([
                Type($['object type']),
                sh.ph.literal("["),
                Type($['index type']),
                sh.ph.literal("]"),
            ]))
            case 'literal type': return p_.ss($, ($) => p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'false keyword': return p_.ss($, ($) => sh.ph.literal("false"))
                        case 'null': return p_.ss($, ($) => sh.ph.literal("null"))
                        case 'string literal': return p_.ss($, ($) => sh.ph.literal($.text))
                        case 'true keyword': return p_.ss($, ($) => sh.ph.literal("true"))
                        default: return p_.au($[0])
                    }
                }
            ))
            case 'never keyword': return p_.ss($, ($) => sh.ph.literal("never"))
            case 'number keyword': return p_.ss($, ($) => sh.ph.literal("number"))
            case 'string keyword': return p_.ss($, ($) => sh.ph.literal("string"))
            case 'symbol keyword': return p_.ss($, ($) => sh.ph.literal("symbol"))
            case 'tuple type': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("["),
                sh.ph.composed(
                    p_.from.list($['elements']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                    case 'type': return p_.ss($, ($) => Type($))
                                    default: return p_.au($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal("]"),
            ]))
            case 'type literal': return p_.ss($, ($) => Type_Literal($))
            case 'type operator': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("readonly "),
                Type($['type']),
            ]))
            case 'type reference': return p_.ss($, ($) => sh.ph.composed([
                Entity_Name($['entity name']),
                Type_Arguments($['type arguments']),

            ]))
            case 'union type': return p_.ss($, ($) => sh.ph.composed(
                p_.from.list($['members']).map(
                    ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'type': return p_.ss($, ($) => sh.ph.composed([
                                    Type($),
                                    sh.ph.literal(" "),
                                ]))
                                case 'bar token': return p_.ss($, ($) => sh.ph.literal("| "))
                                default: return p_.au($[0])
                            }
                        }
                    )
                ),
            ))
            case 'void keyword': return p_.ss($, ($) => sh.ph.literal("void"))
            default: return p_.au($[0])
        }
    }
)

export const Type_Literal: p_i.Transformer<d_in.Type_Literal, d_out.Phrase> = ($) => sh.ph.composed([
    sh.ph.literal("{"),
    sh.ph.indent(
        sh.pg.composed([
            sh.pg.sentences(
                p_.from.list($['members']).map(
                    ($) => sh.sentence([
                        p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'call signature': return p_.ss($, ($) => sh.ph.composed([
                                        sh.ph.literal("**FIXME: call signature**"),
                                    ]))
                                    case 'index signature': return p_.ss($, ($) => sh.ph.composed([
                                        sh.ph.literal("**FIXME: index signature**"),
                                    ]))
                                    case 'property signature': return p_.ss($, ($) => sh.ph.composed([
                                        JSDoc($['jsdoc']),
                                        Modifiers($.modifiers),
                                        String_Literal_Or_Identifier($['id']),
                                        p_.from.optional($['question token']).decide(
                                            ($) => sh.ph.literal("?"),
                                            () => sh.ph.nothing()
                                        ),
                                        sh.ph.literal(": "),
                                        Type($['type']),
                                    ]))
                                    default: return p_.au($[0])
                                }
                            }
                        ),
                    ])
                )
            ),
        ]),
    ),
    sh.ph.literal("}")
])

export const String_Literal_Or_Identifier: p_i.Transformer<d_in.String_Literal_or_Identifier, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'string literal': return p_.ss($, ($) => sh.ph.literal($.text))
            case 'identifier': return p_.ss($, ($) => sh.ph.literal($.text))
            default: return p_.au($[0])
        }
    }
)

export const Entity_Name: p_i.Transformer<d_in.Entity_Name, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'identifier': return p_.ss($, ($) => sh.ph.literal($.text))
            case 'qualified name': return p_.ss($, ($) => Qualified_Name($))
            default: return p_.au($[0])
        }
    }
)

export const Qualified_Name: p_i.Transformer<d_in.Qualified_Name, d_out.Phrase> = ($) => sh.ph.composed([
    Entity_Name($['first']),
    sh.ph.literal("."),
    sh.ph.literal($['second'].text),
])

export const Type_Arguments: p_i.Transformer<d_in.Type_Arguments, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed([
        sh.ph.literal("<"),
        sh.ph.composed(
            p_.from.list($['entries']).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                            case 'type': return p_.ss($, ($) => Type($))
                            default: return p_.au($[0])
                        }
                    }
                )
            )
        ),
        sh.ph.literal(">")
    ]),
    () => sh.ph.nothing()
)

export const Type_Parameters: p_i.Transformer<d_in.Type_Parameters, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => sh.ph.rich(
        p_.from.list($['entries']).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                        case 'type parameter': return p_.ss($, ($) => sh.ph.composed([
                            sh.ph.literal($.identifier.text),
                            p_.from.optional($['extends']).decide(
                                ($) => sh.ph.composed([
                                    sh.ph.literal(" extends "),
                                    Type($['type']),
                                ]),
                                () => sh.ph.nothing()
                            )
                        ]))
                        default: return p_.au($[0])
                    }
                }
            )
        ),
        sh.ph.nothing(),
        sh.ph.literal("<"),
        sh.ph.literal(","),
        sh.ph.literal(">"),
    ),
    () => sh.ph.nothing()
)