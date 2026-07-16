import * as p_ from 'pareto-core/implementation/command'

//interface dependencies
import type * as command_interfaces from "../../interface/commands.js"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/interface/commands"
import type * as query_interfaces_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/interface/queries"
import type * as query_interfaces_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"

//schemas
import type * as s_main from "../../interface/schemas/main.js"

//dependencies
// import * as c_file_to_file from "pareto-common/implementation/commands/file_in_file_out"
import * as c_file_in_stream_out from "pareto-common/modules/file_in_stream_out/implementation/command/operation"
import * as q_analyze_typescript_file from "../queries/analyze_file.js"

// type MyError =
//     | ['parse node path', s_parse_node_path.Error]
//     | ['parse file', s_parse_file.Error]
//     | ['write to stdout', null]

export const $$: p_.Command_Implementation<
    command_interfaces.analyse_file,
    {
        'indentation': string
    },
    {
        'parse file': query_interfaces_typescript_parser.queries.parse_file
        'read file': query_interfaces_filesystem_unrestricted_api.read_file
    },
    {
        'log lines': command_interfaces_pareto_stream_api.log_lines
        'log error lines': command_interfaces_pareto_stream_api.log_error_lines
    }
> = p_.command(
    ($d, $s, $q, $c) => [

        c_file_in_stream_out.$$(
            {
                'indentation': $s.indentation,
            },
            {
                'read file': $q['read file'],
                'process data': q_analyze_typescript_file.$$(
                    null,
                    {
                        'parse file': $q['parse file']
                    },
                )
            },
            {
                'log error lines': $c['log error lines'],
                'log lines': $c['log lines'],
            },
        ).execute(
            {
                'arguments': $d.arguments
            },
            ($): s_main.Error => $
        ),

    ]
)
