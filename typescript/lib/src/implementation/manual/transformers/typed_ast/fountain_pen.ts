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
            case 'module declaration': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.composed(
                    p_.from.list($['modifiers']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'export': return p_.ss($, ($) => sh.ph.literal("export "))
                                    default: return p_.au($[0])
                                }
                            }
                        )
                    )
                ),
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
            case 'type alias declaration': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.composed(
                    p_.from.list($['modifiers']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'export': return p_.ss($, ($) => sh.ph.literal("export "))
                                    default: return p_.au($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal("type "),
                sh.ph.literal($['identifier'].text),
                sh.ph.literal(" = "),
                Type($['type']),
            ]))
            default: return p_.au($[0])
        }
    }
)

export const Type: p_i.Transformer<d_in.Type, d_out.Phrase> = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'type reference': return p_.ss($, ($) => sh.ph.composed([
                Entity_Name($['entity name']),
                p_.from.optional($['type parameters']).decide(
                    ($) => Type_Parameters($),
                    () => sh.ph.nothing()
                )
            ]))
            case 'literal type': return p_.ss($, ($) => p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'null': return p_.ss($, ($) => sh.ph.literal("null"))
                        default: return p_.au($[0])
                    }
                }
            ))
            case 'type literal': return p_.ss($, ($) => sh.ph.composed([
                sh.ph.literal("{"),
                sh.ph.indent(
                    sh.pg.composed([
                        sh.pg.sentences(
                            p_.from.list($['members']).map(
                                ($) => sh.sentence([
                                    p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'property signature': return p_.ss($, ($) => sh.ph.composed([
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
            ]))
            default: return p_.au($[0])
        }
    }
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

export const Type_Parameters: p_i.Transformer<d_in.Type_Parameters, d_out.Phrase> = ($) => sh.ph.composed([
    sh.ph.literal("<"),
    sh.ph.indent(
        sh.pg.rich(
            p_.from.list($['entries']).map_optionally(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'comma token': return p_.ss($, ($) => p_.literal.not_set())
                            case 'type': return p_.ss($, ($) => p_.literal.set(sh.sentence([
                                Type($),
                            ])))
                            default: return p_.au($[0])
                        }
                    }
                )
            ),
            null,
            false,
            null,
            sh.ph.literal(","),
            null
        )

    ),
    sh.ph.literal(">")
])