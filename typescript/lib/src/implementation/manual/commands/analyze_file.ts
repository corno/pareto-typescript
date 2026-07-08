import * as p_ from 'pareto-core/implementation/command'

import type * as interface_ from "../../../interface/declarations/commands.js"

//data types
import type * as d_main from "pareto-application-api/interface/data/main"

//dependencies
// import * as c_file_to_file from "pareto-common/implementation/manual/commands/file_to_file"
import * as c_file_to_file from "pareto-common/implementation/manual/commands/file_to_stream"
import * as q_analyze_typescript_file from "../queries/analyze_file.js"

// type MyError =
//     | ['parse node path', d_parse_node_path.Error]
//     | ['parse file', d_parse_file.Error]
//     | ['write to stdout', null]

export const $$: interface_.analyse_file = p_.command(
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
            ($): d_main.Error => $
        ),

    ]
)
