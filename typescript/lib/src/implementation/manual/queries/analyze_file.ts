import * as p_ from 'pareto-core/dist/implementation/query'
import * as p_temp from 'pareto-core/dist/implementation/transformer'
import p_super_query_result from 'pareto-core/dist/implementation/query/super_query_result'
import p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import * as interface_ from "../../../interface/queries"

//data  types
import * as d_process_file_data from "pareto-common/dist/interface/data/process_file_data"
import * as d_parse_typescript_file from "../../../modules/typescript_parser/interface/data/parse_file"
import * as d_fp from "pareto-fountain-pen/dist/interface/generated/liana/schemas/prose/data"

//dependencies
import * as t_prose_to_loc from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/list_of_characters"
import * as t_ast_to_prose from "../transformers/ast/fountain_pen"
import * as r_typed_ast_from_ast from "../refiners/typed_ast/temp_wrapper"
import * as t_typed_ast_from_ast_to_prose from "../transformers/typed_ast_from_ast/fountain_pen"
import * as t_typed_ast_to_prose from "../transformers/typed_ast/fountain_pen"

//shorthands
import * as sh from "pareto-fountain-pen/dist/shorthands/prose/deprecated"

export const $$: interface_.functions.analyze_typescript_file = p_.query_function(
    ($d, $s, $q) => p_super_query_result<d_parse_typescript_file.Result, d_process_file_data.Error>($q['parse file'](
        {
            'data': p_text_from_list(
                $d.data,
                ($) => $
            )
        },
        ($): d_process_file_data.Error => p_temp.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'to be implemented': return p_temp.ss($, ($) => sh.ph.literal("to be implemented"))
                    default: return p_temp.au($[0])
                }
            }
        )
    )).refine(
        ($, abort): d_fp.Paragraph => {
            const typed = r_typed_ast_from_ast.Source_File(
                $.ast.root,
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
                t_ast_to_prose.AST($.ast),
                t_typed_ast_to_prose.Source_File(
                    typed,
                )
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

