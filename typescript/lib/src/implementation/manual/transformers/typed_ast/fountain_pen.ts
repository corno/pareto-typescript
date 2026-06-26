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

export const Statement: p_i.Transformer<d_in.Statement, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'import declaration': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("import "),
                p_.from.state($.clause.type).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'identifier': return p_.ss($, ($) => sh.ph.literal($.text))
                            case 'named imports': return p_.ss($, ($) => sh.ph.composed([
                                sh.ph.literal("{"),
                                sh.ph.composed(
                                    p_.from.list($).map(
                                        ($) => sh.ph.literal($.identifier.text)
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
                p_.from.optional($['type parameters']).decide(
                    ($) => Type_Parameters($),
                    () => sh.ph.nothing()
                ),
                sh.ph.literal(" "),
                Type_Literal($['body']),
            ]))
            case 'module declaration': return p_.ss($, ($) => sh.ph.composed([
                Optional_Modifiers($['modifiers']),
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
                sh.ph.literal("return "),
                p_.from.optional($['expression']).decide(
                    ($) => Expression($),
                    () => sh.ph.nothing()
                )
            ]))
            case 'type alias declaration': return p_.ss($, ($) => sh.ph.composed([
                Optional_Modifiers($['modifiers']),
                sh.ph.literal("type "),
                sh.ph.literal($['identifier'].text),
                sh.ph.literal(" = "),
                Type($['type']),
            ]))
            case 'variable statement': return p_.ss($, ($) => sh.ph.composed([
                Optional_Modifiers($['modifiers']),
                p_.from.optional($['variable declaration list']['const keyword']).decide(
                    ($) => sh.ph.literal("const "),
                    () => sh.ph.literal("let ")
                ),
                sh.ph.composed(
                    p_.from.list($['variable declaration list']['declarations']).map(
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
            ]))
            default: return p_.au($[0])
        }
    }
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
                sh.ph.literal("("),
                sh.ph.composed(
                    p_.from.list($['parameters']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'comma token': return p_.ss($, ($) => sh.ph.literal(", "))
                                    case 'parameter': return p_.ss($, ($) => sh.ph.literal($.identifier.text))
                                    default: return p_.au($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal(") "),
                Optional_Type($['type']),
                sh.ph.literal("=> "),
                Expression($['body']),
            ]))
            case 'binary': return p_.ss($, ($) => sh.ph.composed([
                Expression($['left']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'equals equals equals token': return p_.ss($, ($) => sh.ph.literal(" === "))
                            default: return p_.au($[0])
                        }
                    }
                ),
                Expression($['right']),
            ]))
            case 'block': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.indent(
                    Statements($['statements'])
                ),
                sh.ph.literal("}"),
            ]))
            case 'call': return p_.ss($, ($) => sh.ph.composed([
                Expression($['expression']),
                sh.ph.literal("("),
                sh.ph.composed(
                    p_.from.list($['arguments']).map(
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
                sh.ph.literal(")"),
            ]))
            case 'conditional': return p_.ss($, ($) => sh.ph.composed([
                Expression($['condition']),
                sh.ph.literal(" ? "),
                Expression($['when true']),
                sh.ph.literal(" : "),
                Expression($['when false']),
            ]))
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
                                        String_Literal_Or_Identifier($['name']),
                                        sh.ph.literal(": "),
                                        Expression($['initializer']),
                                    ]))
                                    default: return p_.au($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal("}"),
            ]))
            case 'null keyword': return p_.ss($, ($) => sh.ph.literal("null"))
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
                            sh.ph.literal($['template tail'].text),
                        ])
                    )
                )
            ]))
            default: return p_.au($[0])
        }
    }
)

export const Modifiers: p_i.Transformer<d_in.Modifiers, d_out.Phrase> = ($) => sh.ph.composed(
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
)

export const Type: p_i.Transformer<d_in.Type, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
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
            case 'number keyword': return p_.ss($, ($) => sh.ph.literal("number"))
            case 'string keyword': return p_.ss($, ($) => sh.ph.literal("string"))
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
            case 'type reference': return p_.ss($, ($) => sh.ph.composed([
                Entity_Name($['entity name']),
                p_.from.optional($['type arguments']).decide(
                    ($) => Type_Arguments($),
                    () => sh.ph.nothing()
                )
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
                                        Optional_Modifiers($.modifiers),
                                        String_Literal_Or_Identifier($['id']),
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

export const Optional_Modifiers: p_i.Transformer<d_in.Optional_Modifiers, d_out.Phrase> = ($) => p_.from.optional($).decide(
    ($) => Modifiers($),
    () => sh.ph.nothing()
)

export const String_Literal_Or_Identifier: p_i.Transformer<d_in.String_Literal_Or_Identifier, d_out.Phrase> = ($) => p_.from.state($).decide(
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

export const Type_Arguments: p_i.Transformer<d_in.Type_Arguments, d_out.Phrase> = ($) => sh.ph.composed([
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
])

export const Type_Parameters: p_i.Transformer<d_in.Type_Parameters, d_out.Phrase> = ($) => sh.ph.rich(
    p_.from.list($['entries']).map(
        ($) => sh.ph.literal($.identifier.text)
    ),
    sh.ph.nothing(),
    sh.ph.literal("<"),
    sh.ph.literal(","),
    sh.ph.literal(">"),
)