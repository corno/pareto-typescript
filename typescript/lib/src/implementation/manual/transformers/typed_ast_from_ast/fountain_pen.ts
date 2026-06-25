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
    p_.from.state($.inner.cause).decide(
        ($) => {
            switch ($[0]) {
                case 'end of node list': return p_.ss($, ($) => sh.ph.literal(`:${$.parent.location.line}:${$.parent.location.column}`))
                case 'unexpected node': return p_.ss($, ($) => sh.ph.literal(`:${$.location.line}:${$.location.column}`))
                default: return p_.au($[0])
            }
        }
    ),
    sh.ph.literal(": "),
    sh.ph.literal("expected "),
    p_.from.state($.inner.expected).decide(
        ($) => {
            switch ($[0]) {
                case 'nothing': return p_.ss($, ($) => sh.ph.literal("nothing"))
                case 'something': return p_.ss($, ($) => sh.ph.rich(
                    p_.from.list($).map(
                        ($) => sh.ph.composed([
                            sh.ph.literal("'"),
                            sh.ph.literal($),
                            sh.ph.literal("'"),
                        ])
                    ),
                    sh.ph.literal("something (but unknown what... hmmm) "),
                    sh.ph.nothing(),
                    sh.ph.literal(" or "),
                    sh.ph.nothing(),
                ))
                case 'nothing': return p_.ss($, ($) => sh.ph.literal("nothing"))
                default: return p_.au($[0])
            }
        }
    ),
    sh.ph.literal(" but found "),
    p_.from.state($.inner.cause).decide(
        ($) => {
            switch ($[0]) {
                case 'end of node list': return p_.ss($, ($) => sh.ph.literal("nothing"))
                case 'unexpected node': return p_.ss($, ($) => sh.ph.composed([
                    sh.ph.literal("'"),
                    sh.ph.literal($.kind),
                    sh.ph.literal("'"),
                ]))
                default: return p_.au($[0])
            }
        }
    )
])