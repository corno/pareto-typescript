import * as p_ from 'pareto-core/dist/implementation/command'

import * as interface_ from "../../../interface/commands"

//data types
import * as d_main from "pareto-resources/dist/interface/data/temp_main"
import * as d_parse_file from "../../../modules/typescript_parser/interface/data/parse_file"
import * as d_write_to_stdout from "pareto-stream/dist/interface/generated/liana/schemas/write_to_stdout/data"
import * as d_parse_node_path from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/non_normalized_path"

//dependencies
// import * as c_file_to_file from "pareto-common/dist/implementation/manual/commands/file_to_file"
import * as t_prose_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_ast_to_prose from "../transformers/ast/fountain_pen"
import * as r_path_from_text from "pareto-resources/dist/implementation/manual/refiners/path_unrestricted/text"
import * as c_file_to_file from "pareto-common/dist/implementation/manual/commands/file_to_stream"
import * as q_analyze_typescript_file from "../queries/analyze_file"

type MyError =
    | ['parse node path', d_parse_node_path.Error]
    | ['parse file', d_parse_file.Error]
    | ['write to stdout', null]

export const $$: interface_.procedures.analyse_file = p_.command_procedure(
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
