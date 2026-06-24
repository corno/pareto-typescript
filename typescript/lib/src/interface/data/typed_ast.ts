import * as p_ from 'pareto-core/dist/interface/data'

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type Statements = p_.List<Statement>

export type Statement =
| ['import declaration', null]
| ['module declaration', null]