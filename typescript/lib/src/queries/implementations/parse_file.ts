import * as p_ from 'pareto-core/implementation/query'
import * as p_temp from 'pareto-core/implementation/transformer'
import p_super_query_result from 'pareto-core/implementation/query/super_query_result'

import type * as query_interfaces_file_in_file_out from "pareto-common/modules/file_in_stream_out/queries/interfaces"
import type * as query_interfaces from "../interfaces.js"
import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/queries/interfaces"

//data  types
import type * as s_parse_typescript_file from "../../schemas/parse_file/schema.js"


//dependencies
import * as r_cst_from_ust from "../../schemas/concrete_syntax_tree/refiners/untyped_syntax_tree.js"

export const $$: p_.Query_Implementation<
    query_interfaces.parse_file,
    null,
    {
        'parse file': queries_typescript_parser.queries.parse_file
    }
> = p_.query(
    ($d, $s, $q) => p_super_query_result($q['parse file'](
        {
            'data': $d.data,
        },
        ($): s_parse_typescript_file.Error => ['untyped', null]
    )).refine(
        ($, abort): s_parse_typescript_file.Result => {
            const typed = r_cst_from_ust.Source_File(
                $['untyped syntax tree'].root,
                ($) => abort(
                    ['untyped', null]
                ),
            )


            return ({
                'source file': typed
            })
        }
    )
)

