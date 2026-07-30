import * as p_ from 'pareto-core/implementation/query'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import type * as query_interfaces_file_in_file_out from "pareto-common/modules/file_in_stream_out/queries/interfaces"
import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/queries/interfaces"

//data  types
import type * as s_process_file_data from "pareto-common/modules/file_in_stream_out/schemas/query/schema"
import type * as s_parse_typescript_file from "pareto-untyped-syntax-tree-api/schemas/parse_file/schema"
import type * as s_paragraph from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/schema"

//dependencies
import * as r_typed_ast_from_ast from "../../schemas/concrete_syntax_tree/refiners/temp_wrapper.js"
import * as t_concrete_syntax_tree_from_untyped_syntax_tree_refiner_to_paragraph from "../../schemas/concrete_syntax_tree_from_untyped_syntax_tree/transformers/paragraph.js"

//shorthands
import * as sh from "pareto-fountain-pen/modules/paragraph/schemas/paragraph/shorthands/deprecated"

export const $$: p_.Query_Implementation<
    query_interfaces_file_in_file_out.operation,
    null,
    {
        'parse file': queries_typescript_parser.queries.parse_file
    }
> = p_.query(
    ($d, $s, $q) => p_super_query_result<s_parse_typescript_file.Result, s_process_file_data.Error>($q['parse file'](
        {
            'data': $d.data,
            // 'path': t_path_to_string.Node_Path($d.path),
        },
        ($): s_process_file_data.Error => ({
            'message': p_temp.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'syntax errors': return p_temp.ss($, ($) => sh.ph.composed(p_.literal.segmented_list([
                            p_.literal.list([
                                sh.ph.text("Syntax errors:"),
                                sh.ph.indent(
                                    sh.pg.sentences(p_temp.from.list($.messages).map(
                                        ($) => sh.sentence([
                                            sh.ph.text($)
                                        ])
                                    ))
                                )
                            ]),
                        ])))
                        default: return p_temp.exhaustive($[0])
                    }
                }
            )
        })
    )).refine(
        ($, abort): s_paragraph.Paragraph => {
            const typed = r_typed_ast_from_ast.Source_File(
                $['untyped syntax tree'].root,
                ($) => abort(
                    {
                        'message': t_concrete_syntax_tree_from_untyped_syntax_tree_refiner_to_paragraph.Error(
                            $
                        )
                    }
                ),
                {
                    'path': $d.path,
                }
            )


            return sh.pg.sentences([
                // t_ast_to_prose.AST($.ast),
                // t_typed_ast_to_prose.Source_File(
                //     typed,
                // )
            ])
        }
    ).transform(
        ($): s_process_file_data.Result => ({
            'data': $
        })
    )
)

