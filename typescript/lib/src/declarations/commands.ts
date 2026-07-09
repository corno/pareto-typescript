import * as p_ from 'pareto-core/interface/command_implementation'


import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"
import type * as actions_commands_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as actions_queries_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"
import type * as command_interfaces from "../interface/commands.js"

export type analyse_file = p_.Command_Implementation<
    command_interfaces.analyse_file,
    null,
    {
        'parse file': queries_typescript_parser.queries.parse_file
        'read file': actions_queries_filesystem_unrestricted_api.read_file
    },
    {
        'write to stdout': actions_commands_pareto_stream_api.write_to_stdout
        'log error': actions_commands_pareto_stream_api.log_error
    }
>