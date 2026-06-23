#!/usr/bin/env -S node --enable-source-maps

import * as p_h from 'pareto-host-nodejs'

import { $$ as c_command } from "lib/dist/implementation/manual/commands/analyze_file"

import { $$ as q_parse_file } from "../temp/queries/parse_file"


p_h.run_main_command(
    ($r) => c_command(
        null,
        {
            'parse file': q_parse_file,
            'read file': $r['filesystem unrestricted'].queries['read file'],
        },
        {
            'write to stdout': $r.stream.commands['write to stdout'],
            'log error': $r.stream.commands['log error'],
        },
    ),
)
