import * as p_i from 'pareto-core/interface/data'

export type Untyped_Syntax_Tree = {
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

export type Keyword = null

export type Comments = p_i.List<string>