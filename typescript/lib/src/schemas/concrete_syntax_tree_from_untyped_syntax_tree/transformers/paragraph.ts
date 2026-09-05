import * as p_ from 'pareto-core/transformer'

//schemas
import type * as s_in from "../schema.js"
import type * as s_out from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

namespace declarations {
    export type Error = p_.Transformer<
        s_in.Error,
        s_out.Phrase
    >
}

//dependencies
import * as ser_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/serializers"
import * as t_ast_to_paragraph from "pareto-untyped-syntax-tree-api/schemas/untyped_syntax_tree_serialization/transformers/paragraph"

//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

export const Error: declarations.Error = ($) => sh.ph.composed([
    sh.ph.text($.inner.path),
    sh.ph.text(": "),
    p_.from.state($.inner.type).decide(
        ($) => {
            switch ($[0]) {
                case 'assertion failed': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("assertion failed"),
                    sh.ph.text(" (expected: "),
                    sh.ph.text($.expected),
                    sh.ph.text(", found: "),
                    sh.ph.text($.found),
                    sh.ph.text(")"),
                ]))
                case 'dangling child': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("dangling child :"),
                    sh.ph.text($.found.kind),
                ]))
                case 'not a leaf': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("not a leaf: '"),
                    sh.ph.text($.found),
                    sh.ph.text("'"),
                ]))
                case 'missing child': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("missing"),
                    p_.from.optional($.kind).decide(
                        ($) => sh.ph.composed(
                            p_.literal.list([
                                sh.ph.text(": "),
                                sh.ph.text($)
                            ])
                        ),
                        () => sh.ph.nothing(),
                    ),
                ]))
                case 'refiner called for wrong kind': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("refiner called for wrong kind"),
                    sh.ph.text(" (expected: "),
                    sh.ph.text($.expected),
                    sh.ph.text(", found: "),
                    sh.ph.text($.found),
                    sh.ph.text(")"),
                ]))
                case 'unknown option': return p_.option($, ($) => sh.ph.composed([
                    sh.ph.text("unknown option: '"),
                    sh.ph.text($.found),
                    sh.ph.text("'")
                ]))
                case 'wrong root': return p_.option($, ($) => sh.ph.text("wrong root"))
                default: return p_.exhaustive($[0])
            }
        }
    ),
    sh.ph.text(" @ "),
    sh.ph.text(ser_path.Node_Path($.path)),
    sh.ph.text(`:${$.inner['context node'].location.line}:${$.inner['context node'].location.column}`),



    sh.ph.text(": "),
    sh.ph.indent(sh.pg.sentences([
        sh.sentence([
            sh.ph.text("snippet:"),
        ]),
        sh.sentence([
            t_ast_to_paragraph.Node(
                $.inner['context node'],
                {
                    'depth': 3,
                }
            ),
        ])
    ]))
])