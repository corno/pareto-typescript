import * as p_ from 'pareto-core/query'

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
        'parse file': queries_typescript_parser.parse_file
    }
> = p_.query(
    (e, $s, $q) => e.query(
        ($d) => $q['parse file'](
            {
                'data': $d.data,
            },
            ($): s_parse_typescript_file.Error => ['untyped', $]
        )
    ).refine(
        ($, abort): s_parse_typescript_file.Result => {
            const typed = r_cst_from_ust.Source_File(
                $['untyped syntax tree'].root,
                ($) => abort(
                    ['typed', $]
                ),
            )


            return ({
                'source file': typed
            })
        }
    )
)

