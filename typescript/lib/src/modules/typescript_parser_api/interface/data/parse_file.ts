
//data types
import * as d_ast from "./dynamic_ast"

export type Parameters = {
    'data': string
}

export type Error =
| ['to be implemented', null]

export type Result = {
    'ast': d_ast.AST
}