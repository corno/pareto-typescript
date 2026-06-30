

//data types
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_ast from "../../modules/typescript_parser_api/interface/data/dynamic_ast"

export type Error = {
    'path': d_path.Node_Path
    'inner': Error_Inner
}

export type Error_Inner = {
    'parent': d_ast.Node
    'problem':
    | ['end of node list', null]
    | ['unexpected node', d_ast.Node]
    'external location description': string
    'module name': string
    'internal path description': string
}

export type Expected =
    | ['nothing', null]
    | ['something', string]