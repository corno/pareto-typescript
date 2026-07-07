import * as p_ from 'pareto-core/interface/query'

import * as query_actions_pareto_common from "pareto-common/interface/query_actions"
import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"

export namespace functions {

    export type analyze_typescript_file = p_.Query_Function<
        query_actions_pareto_common.process_file_data,
        null,
        {
            'parse file': queries_typescript_parser.queries.parse_file
        }
    >

}
