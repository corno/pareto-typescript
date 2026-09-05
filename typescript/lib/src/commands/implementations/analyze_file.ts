import * as p_ from 'pareto-core/command'

//interface dependencies
import type * as command_interfaces from "../interfaces.js"
import type * as command_interfaces_pareto_stream_api from "pareto-stream-api/commands/interfaces"
import type * as query_interfaces_filesystem_unrestricted_api from "pareto-filesystem-unrestricted-api/modules/unrestricted/queries/interfaces"
import type * as query_interfaces_typescript_parser from "pareto-untyped-syntax-tree-api/queries/interfaces"

//schemas
import type * as s_main from "pareto-application-api/schemas/main/schema"

//dependencies
// import * as c_file_to_file from "pareto-common/commands/implementations/file_in_file_out"
import * as c_file_in_stream_out from "pareto-common/modules/file_in_stream_out/commands/implementations/operation"
import * as q_analyze_typescript_file from "../../queries/implementations/analyze_file.js"

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
        'parse file': query_interfaces_typescript_parser.parse_file
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
