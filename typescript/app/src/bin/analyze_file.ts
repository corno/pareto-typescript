#!/usr/bin/env -S node --enable-source-maps

import * as p_h from 'pareto-host-nodejs/index'

import * as rs_filesystem_unrestricted from "pareto-resource-filesystem-unrestricted/index"
import * as rs_stream from "pareto-resource-stream/index"
import * as rs_typescript_parser from "pareto-resource-typescript-parser/index"

import { $$ as c_command } from "lib/implementation/manual/commands/analyze_file"


p_h.run_main_command(
    () => c_command(
        null,
        {
            'parse file': rs_typescript_parser.$.queries['parse file'],
            'read file': rs_filesystem_unrestricted.$.queries['read file'],
        },
        {
            'write to stdout': rs_stream.$.commands['write to stdout'],
            'log error': rs_stream.$.commands['log error'],
        },
    ),
)
