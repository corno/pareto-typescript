import * as p_i from 'pareto-core/dist/interface/data'

export type AST = {
    'root': Node
    'trailing comments': Comments
}

export type Node = {
    'kind': string
    'children': p_i.List<Node>
    'comments': Comments
    'location': {
        'line': number
        'column': number
    }
    'text': string
}

export type Comments = p_i.List<string>