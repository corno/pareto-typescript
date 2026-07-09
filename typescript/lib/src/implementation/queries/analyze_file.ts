import * as p_ from 'pareto-core/implementation/query'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'
import p_text_from_list from 'pareto-core/implementation/transformer/specials/text_from_list'

import type * as interface_ from "../../declarations/queries.js"

//data  types
import type * as d_process_file_data from "pareto-common/interface/data/process_file_data"
import type * as d_parse_typescript_file from "pareto-untyped-syntax-tree-api/interface/data/parse_file"
import type * as d_prose from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_prose_to_loc from "pareto-fountain-pen/implementation/manual/transformers/prose/list_of_characters"
import * as r_typed_ast_from_ast from "../refiners/concrete_syntax_tree/temp_wrapper.js"
import * as t_typed_ast_from_ast_to_prose from "../transformers/concrete_syntax_tree_from_untyped_syntax_tree_refiner/prose.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const $$: interface_.functions.analyze_typescript_file = p_.query(
    ($d, $s, $q) => p_super_query_result<d_parse_typescript_file.Result, d_process_file_data.Error>($q['parse file'](
        {
            'data': p_text_from_list(
                $d.data,
                ($) => $
            ),
            // 'path': t_path_to_string.Node_Path($d.path),
        },
        ($): d_process_file_data.Error => p_temp.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'syntax errors': return p_temp.ss($, ($) => sh.ph.composed(p_.literal.segmented_list([
                        p_.literal.list([
                            sh.ph.literal("Syntax errors:"),
                            sh.ph.indent(
                                sh.pg.sentences(p_temp.from.list($.messages).map(
                                    ($) => sh.sentence([
                                        sh.ph.literal($)
                                    ])
                                ))
                            )
                        ]),
                    ])))
                    default: return p_temp.exhaustive($[0])
                }
            }
        )
    )).refine(
        ($, abort): d_prose.Paragraph => {
            const typed = r_typed_ast_from_ast.Source_File(
                $['untyped syntax tree'].root,
                ($) => abort(
                    t_typed_ast_from_ast_to_prose.Error(
                        $
                    )
                ),
                {
                    'path': $d.path,
                }
            )


            return sh.pg.composed([
                // t_ast_to_prose.AST($.ast),
                // t_typed_ast_to_prose.Source_File(
                //     typed,
                // )
            ])
        }
    ).transform(
        ($): d_process_file_data.Result => ({
            'data': t_prose_to_loc.Paragraph(
                $,
                {
                    'indentation': "    ",
                    'newline': "\n"
                }
            )
        })
    )
)

