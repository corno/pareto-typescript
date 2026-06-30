import * as p_di from 'pareto-core/dist/interface/data'

//data types
import * as d_ast from "./dynamic_ast"

export type Parameters = {
    'data': string
}

export type Error =
| ['syntax errors', {
    'messages': p_di.List<string>
}]

export type Result = {
    'ast': d_ast.AST
}