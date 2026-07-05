import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_in from "../../../../modules/typescript_parser_api/interface/data/untyped_syntax_tree"

export namespace interface_ {
    export type Node = p_i.Transformer_With_Parameter<
        d_in.Node,
        d_out.Phrase,
        {
            'depth': number
        }
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

// export const AST: p_i.Transformer<d_in.AST, d_out.Paragraph> = ($) => sh.pg.sentences([
//     sh.sentence([
//         Node($.root)
//     ])
// ])

export const Node: interface_.Node = ($, $p) => $p.depth === 0
    ? sh.ph.literal("...") :
    sh.ph.composed([
        sh.ph.literal(`Node: ${$.kind}`),
        sh.ph.indent(
            sh.pg.sentences(
                p_.from.list($.children).map(
                    ($) => sh.sentence([
                        Node($, {
                            'depth': $p.depth - 1,
                        })
                    ]),
                )
            )
        )
    ])