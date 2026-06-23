import * as p_ from 'pareto-core/dist/implementation/command'

import * as interface_ from "../../../interface/commands"

//data types
import * as d_main from "pareto-resources/dist/interface/data/temp_main"
import * as d_parse_file from "../../../modules/typescript_parser/interface/data/parse_file"
import * as d_write_to_stdout from "pareto-stream/dist/interface/generated/liana/schemas/write_to_stdout/data"

//dependencies
// import * as c_file_to_file from "pareto-common/dist/implementation/manual/commands/file_to_file"
import * as t_prose_to_text from "pareto-fountain-pen/dist/implementation/manual/transformers/prose/text"
import * as t_ast_to_prose from "../transformers/ast/fountain_pen"

type MyError =
    | ['tbd', null]
    | ['parse file', d_parse_file.Error]
    | ['write to stdout', null]

export const $$: interface_.procedures.analyse_file = p_.command_procedure(
    ($d, $s, $q, $c) => [

        p_.s.handle_error<d_main.Error, MyError>(
            [

                p_.s.query(
                    $q['parse file'](
                        {
                            'data': "FOO BAR"
                        },
                        ($): MyError => ['parse file', $]
                    ),
                    ($) => [

                        $c['write to stdout'].execute(
                            {
                                'data': t_prose_to_text.Paragraph(
                                    t_ast_to_prose.AST($.ast),
                                    {
                                        'indentation': "    ",
                                        'newline': "\n"
                                    }
                                )
                            },
                            () => ['write to stdout', null]
                        )

                    ]
                )
            ],
            ($) => [
                $c['write to stderr'].execute(
                    {
                        'data': "error during parsing"
                    },
                    () => ({
                        'exit code': 2
                    })
                )

            ],
            () => ({
                'exit code': 1
            })
        )

    ]
)
