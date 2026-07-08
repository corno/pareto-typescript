import * as p_ from 'pareto-core/implementation/transformer'
import * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_in from "../../../../interface/data/concrete_syntax_tree_from_ast.js"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}

//dependencies
import * as t_path_to_text from "pareto-resources/implementation/manual/transformers/unrestricted_path/text"
import * as t_ast_to_prose from "pareto-untyped-syntax-tree-api/implementation/manual/transformers/untyped_syntax_tree/prose"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const Error: interface_.Error = ($) => sh.ph.composed([
    sh.ph.literal($.inner.path),
    sh.ph.literal(": "),
    p_.from.state($.inner.type).decide(
        ($) => {
            switch ($[0]) {
                case 'assertion failed': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("assertion failed"),
                    sh.ph.literal(" (expected: "),
                    sh.ph.literal($.expected),
                    sh.ph.literal(", found: "),
                    sh.ph.literal($.found),
                    sh.ph.literal(")"),
                ]))
                case 'dangling child': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("dangling child :"),
                    sh.ph.literal($.found.kind),
                ]))
                case 'not a leaf': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("not a leaf: '"),
                    sh.ph.literal($.found),
                    sh.ph.literal("'"),
                ]))
                case 'missing child': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("missing"),
                    p_.from.optional($.kind).decide(
                        ($) => sh.ph.composed(
                            p_.literal.list([
                                sh.ph.literal(": "),
                                sh.ph.literal($)
                            ])
                        ),
                        () => sh.ph.nothing(),
                    ),
                ]))
                case 'refiner called for wrong kind': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("refiner called for wrong kind"),
                    sh.ph.literal(" (expected: "),
                    sh.ph.literal($.expected),
                    sh.ph.literal(", found: "),
                    sh.ph.literal($.found),
                    sh.ph.literal(")"),
                ]))
                case 'unknown option': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.literal("unknown option: '"),
                    sh.ph.literal($.found),
                    sh.ph.literal("'")
                ]))
                case 'wrong root': return p_.option($, ($) => sh.ph.literal("wrong root"))
                default: return p_.exhaustive($[0])
            }
        }
    ),
    sh.ph.literal(" @ "),
    sh.ph.literal(t_path_to_text.Node_Path($.path)),
    sh.ph.literal(`:${$.inner['context node'].location.line}:${$.inner['context node'].location.column}`),



    sh.ph.literal(": "),
    sh.ph.indent(sh.pg.sentences([
        sh.sentence([
            sh.ph.literal("snippet:"),
        ]),
        sh.sentence([
            t_ast_to_prose.Node(
                $.inner['context node'],
                {
                    'depth': 3,
                }
            ),
        ])
    ]))
])