import * as p_di from "pareto-core/interface/data"

//data types
import type * as d_path from "pareto-resources/interface/generated/liana/schemas/fs_unrestricted_path/data"
import type * as d_ast from "pareto-untyped-syntax-tree-api/interface/data/untyped_syntax_tree"

export type Error = {
    'path': d_path.Node_Path
    'inner': Error_Inner
}

export type Refiner_Parameters = {
    'parent': d_ast.Node
    'path': string
}

export type Error_Inner = {
    'context node': d_ast.Node
    'path': string
    'type':
    | ['not a leaf', {
        'found': string
    }]
    | ['wrong root', {
        'found': string
    }]
    | ['refiner called for wrong kind', {
        'parent': d_ast.Node
        'expected': string
        'found': string
    }]
    | ['dangling child', {
        'found': d_ast.Node
    }]
    | ['missing child', {
        'kind': p_di.Optional_Value<string>
    }]
    | ['assertion failed', {
        'expected': string
        'found': string
    }]
    | ['unknown option', {
        'found': string
    }]
}