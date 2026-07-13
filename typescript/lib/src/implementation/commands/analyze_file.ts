import * as p_ from 'pareto-core/implementation/command'

//interface dependencies
import type * as command_interfaces from "../../interface/commands.js"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/interface/queries"
import type * as query_interfaces_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"

//schemas
import type * as s_main from "../../interface/schemas/main.js"

//dependencies
// import * as c_file_to_file from "pareto-common/implementation/commands/file_to_file"
import * as c_file_to_file from "pareto-common/implementation/commands/file_in_stream_out"
import * as q_analyze_typescript_file from "../queries/analyze_file.js"

// type MyError =
//     | ['parse node path', s_parse_node_path.Error]
//     | ['parse file', s_parse_file.Error]
//     | ['write to stdout', null]

export const $$: p_.Command_Implementation<
    command_interfaces.analyse_file,
    null,
    {
        'parse file': query_interfaces_typescript_parser.queries.parse_file
        'read file': query_interfaces_filesystem_unrestricted_api.read_file
    },
    {
        'write to stdout': command_interfaces_pareto_stream_api.write_to_stdout
        'log error': command_interfaces_pareto_stream_api.log_error
    }
> = p_.command(
    ($d, $s, $q, $c) => [

        c_file_to_file.$$(
            null,
            {
                'read file': $q['read file'],
                'process data': q_analyze_typescript_file.$$(
                    $s,
                    {
                        'parse file': $q['parse file']
                    },
                )
            },
            {
                'log error': $c['log error'],
                'write to stdout': $c['write to stdout'],
            },
        ).execute(
            {
                'arguments': $d.arguments
            },
            ($): s_main.Error => $
        ),

    ]
)
