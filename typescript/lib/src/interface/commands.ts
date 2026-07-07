import * as p_ from 'pareto-core/interface/command'

//data types
import * as d_main from "pareto-resources/interface/data/temp_main"

import * as queries_typescript_parser from "pareto-untyped-syntax-tree-api/interface/queries"
import * as commands_stream from "pareto-stream/interface/commands"
import * as commands_resources from "pareto-resources/interface/resources"

export namespace commands {

    export type analyse_file = p_.Command<d_main.Error, d_main.Parameters>

}

export namespace procedures {

    export type analyse_file = p_.Command_Procedure<
        commands.analyse_file,
        null,
        {
            'parse file': queries_typescript_parser.queries.parse_file
            'read file': commands_resources.filesystem_unrestricted.queries.read_file
        },
        {
            'write to stdout': commands_stream.commands.write_to_stdout
            'log error': commands_stream.commands.log_error
        }
    >

}