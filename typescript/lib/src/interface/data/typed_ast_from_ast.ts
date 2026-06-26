
import * as p_ from 'pareto-core/dist/interface/data'

//data types
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_ast from "../../modules/typescript_parser/interface/data/ast"

export type Error = {
    'path': d_path.Node_Path
    'inner': Error_Inner
}

export type Error_Inner = {
    'context': string
    'parent': d_ast.Node
    'cause':
    | ['end of node list', null]
    | ['unexpected node', d_ast.Node]
    'expected': Expected
}

export type Expected =
    | ['nothing', null]
    | ['something', string]