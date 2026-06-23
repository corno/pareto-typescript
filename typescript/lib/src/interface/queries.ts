import * as p_ from 'pareto-core/dist/interface/query'

import * as queries_common from "pareto-common/dist/interface/queries"
import * as queries_typescript_parser from "../modules/typescript_parser/interface/queries"

import * as d_serialize_prose from "pareto-fountain-pen/dist/interface/data/prose_serialize"

export namespace functions {

    export type analyze_typescript_file = p_.Query_Function<
        queries_common.queries.process_file_data,
        null,
        {
            'parse file': queries_typescript_parser.queries.parse_file
        }
    >

}
