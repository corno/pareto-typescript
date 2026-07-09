import * as p_ from 'pareto-core/interface/query_implementation'

import type * as query_interfaces_pareto_common from "pareto-common/interface/queries"
import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"

export namespace functions {

    export type analyze_typescript_file = p_.Query_Implementation<
        query_interfaces_pareto_common.process_file_data,
        null,
        {
            'parse file': queries_typescript_parser.queries.parse_file
        }
    >

}
