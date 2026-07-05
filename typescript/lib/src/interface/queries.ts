import * as p_ from 'pareto-core/interface/query'

import * as queries_common from "pareto-common/interface/queries"
import * as queries_typescript_parser from "../modules/typescript_parser_api/interface/queries.js"

export namespace functions {

    export type analyze_typescript_file = p_.Query_Function<
        queries_common.queries.process_file_data,
        null,
        {
            'parse file': queries_typescript_parser.queries.parse_file
        }
    >

}
