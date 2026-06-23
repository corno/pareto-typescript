import * as p_ from 'pareto-core/dist/interface/command'

//data types
import * as d_main from "pareto-resources/dist/interface/data/temp_main"

import * as queries_typescript_parser from "../modules/typescript_parser/interface/queries"
import * as commands_stream from "pareto-stream/dist/interface/commands"

export namespace commands {

    export type analyse_file = p_.Command<d_main.Error, d_main.Parameters>

}

export namespace procedures {

    export type analyse_file = p_.Command_Procedure<
        commands.analyse_file,
        null,
        {
            'parse file': queries_typescript_parser.queries.parse_file
        },
        {
            'write to stdout': commands_stream.commands.write_to_stdout
            'write to stderr': commands_stream.commands.write_to_stderr
        }
    >

}