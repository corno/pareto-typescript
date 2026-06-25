
import * as p_ from 'pareto-core/dist/interface/data'

//data types
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_ast from "../../modules/typescript_parser/interface/data/ast"

export type Error = {
    'path': d_path.Node_Path
    'inner': Error_Inner
}

export type Error_Inner = {
    'cause':
    | ['end of node list', {
        'parent': d_ast.Node
    }]
    | ['unexpected node', d_ast.Node]
    'expected': Expected
}

export type Expected =
    | ['nothing', null]
    | ['something', p_.List<string>]