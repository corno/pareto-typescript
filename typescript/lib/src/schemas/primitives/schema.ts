import type * as s_ast from "pareto-untyped-syntax-tree-api/schemas/untyped_syntax_tree/schema"

export type Keyword = {
    'location': s_ast.Node['location']
    'comments': s_ast.Comments
}

export type Literal = s_ast.Node

export type Blob = null