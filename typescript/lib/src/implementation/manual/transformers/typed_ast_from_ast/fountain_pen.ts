import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_in from "../../../../interface/data/typed_ast_from_ast"

//dependencies
import * as t_path_to_text from "pareto-resources/dist/implementation/manual/transformers/unrestricted_path/text"


//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const Error: p_i.Transformer<d_in.Error, d_out.Phrase> = ($) => sh.ph.composed([
    sh.ph.literal(t_path_to_text.Node_Path($.path)),
    sh.ph.literal(":"),
    sh.ph.literal(`${$.inner.location.line}:${$.inner.location.column}: `),
    p_.from.state($.inner.type).decide(
        ($) => {
            switch ($[0]) {
                case 'unexpected': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("unexpected"),
                    sh.ph.indent(sh.pg.composed([
                        sh.pg.sentences([
                            sh.sentence([
                                p_.from.optional($.kind).decide(
                                    ($) => sh.ph.literal("kind: " + $),
                                    () => sh.ph.literal("kind: <missing>"),
                                )
                            ])
                        ]),
                        sh.pg.sentences([
                            p_.from.optional($.expected).decide(
                                ($) => p_.from.list($).map(
                                    ($) => sh.ph.literal("expected: " + $),
                                ),
                                () => p_.literal.list([
                                    sh.ph.literal("expected end"),
                                ])
                            ),

                        ])
                    ]))
                ]))
                case 'missing': return p_.ss($, ($) => sh.ph.literal("missing"))
                case 'expected single token': return p_.ss($, ($) => sh.ph.literal("expected single token: " + $.kind))
                default: return p_.au($[0])
            }
        }
    )
])