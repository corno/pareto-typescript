import * as p_ from 'pareto-core/dist/interface/data'

export type Source_File = {
    'statements': Statements
}

export type Statements = p_.List<Statement>

export type Statement =
| ['import declaration', null]