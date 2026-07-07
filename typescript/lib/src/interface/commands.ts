import * as p_ from 'pareto-core/interface/command'


import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"
import * as command_actions_pareto_stream_api from "pareto-stream-api/interface/command_actions"
import * as query_actions_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/query_actions"
import * as command_actions from "./command_actions.js"

export type analyse_file = p_.Command<
    command_actions.analyse_file,
    null,
    {
        'parse file': queries_typescript_parser.queries.parse_file
        'read file': query_actions_filesystem_unrestricted_api.read_file
    },
    {
        'write to stdout': command_actions_pareto_stream_api.write_to_stdout
        'log error': command_actions_pareto_stream_api.log_error
    }
>