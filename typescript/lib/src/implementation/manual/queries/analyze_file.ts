import * as p_ from 'pareto-core/dist/implementation/query'
import * as p_temp from 'pareto-core/dist/implementation/transformer'
import p_super_query_result from 'pareto-core/dist/implementation/query/super_query_result'
import p_text_from_list from 'pareto-core/dist/implementation/transformer/specials/text_from_list'

import * as interface_ from "../../../interface/queries"

//data  types
import * as d_process_file_data from "pareto-common/dist/interface/data/process_file_data"
import * as d_parse_typescript_file from "../../../modules/typescript_parser/interface/data/parse_file"

//dependencies
import * as t_prose_to_loc from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/list_of_characters"
import * as t_ast_to_prose from "../transformers/ast/fountain_pen"
import * as r_typed_ast_from_ast from "../refiners/typed_ast/ast"

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
        ($): d_process_file_data.Error => sh.ph.literal("SFSFDF")
    )).refine(
        ($, abort) => {
            r_typed_ast_from_ast.Source_File(
                $.ast.root,
                ($) => abort(
                    p_temp.from.state($.type).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'unexpected': return p_temp.ss($, ($) => sh.ph.literal("unexpected"))
                                case 'missing': return p_temp.ss($, ($) => sh.ph.literal("missing"))
                                case 'expected single token': return p_temp.ss($, ($) => sh.ph.literal("expected single token: " + $.kind))
                                default: return p_temp.au($[0])
                            }
                        }
                    )
                )
            )
            return $
        }
    ).transform(
        ($): d_process_file_data.Result => ({
            'data': t_prose_to_loc.Paragraph(
                t_ast_to_prose.AST($.ast),
                {
                    'indentation': "    ",
                    'newline': "\n"
                }
            )
        })
    )
)

