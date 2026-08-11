import * as p_ from 'pareto-core/interface/schema'

//schemas
import type * as s_ust from "../concrete_syntax_tree/schema.js"

export type Parameters = {
    'data': p_.List<number>
}

export type Error =
| ['untyped', null]
| ['typed', null]

export type Result = {
    'source file': s_ust.Source_File
}