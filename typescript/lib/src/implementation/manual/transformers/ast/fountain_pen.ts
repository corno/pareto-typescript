import * as p_ from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/transformer'

//data types
import * as d_out from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"
import * as d_in from "../../../../modules/typescript_parser/interface/data/ast"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const AST: p_i.Transformer<d_in.AST, d_out.Paragraph> = ($) => sh.pg.sentences([
    sh.sentence([
        Node($.root)
    ])
])

export const Node: p_i.Transformer<d_in.Node, d_out.Phrase> = ($) => sh.ph.composed([
    sh.ph.literal(`Node: ${$.kind}`),
    sh.ph.indent(
        sh.pg.sentences(
            p_.from.list($.children).map(
                ($) => sh.sentence([
                    Node($)
                ]),
            )
        )
    )
])