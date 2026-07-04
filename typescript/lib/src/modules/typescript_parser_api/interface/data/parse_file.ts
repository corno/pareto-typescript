import * as p_di from 'pareto-core/dist/interface/data'

//data types
import * as d_ust from "./untyped_syntax_tree"

export type Parameters = {
    'data': string
}

export type Error =
| ['syntax errors', {
    'messages': p_di.List<string>
}]

export type Result = {
    'untyped syntax tree': d_ust.Untyped_Syntax_Tree
}