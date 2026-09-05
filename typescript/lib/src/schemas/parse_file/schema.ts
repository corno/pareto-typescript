import * as p_ from 'pareto-core/schema'

//schemas
import type * as s_ust from "../concrete_syntax_tree/schema.js"
import type * as s_parse_untyped from "pareto-untyped-syntax-tree-api/schemas/parse_file/schema"
import type * as s_typed from "../concrete_syntax_tree_from_untyped_syntax_tree/schema.js"

export type Parameters = {
    'data': p_.List<number>
}

export type Error =
| ['untyped', s_parse_untyped.Error]
| ['typed', s_typed.Error_Inner]

export type Result = {
    'source file': s_ust.Source_File
}