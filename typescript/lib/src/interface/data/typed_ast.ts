import * as p_ from 'pareto-core/dist/interface/data'
import * as d_ast from "../../modules/typescript_parser/interface/data/ast"

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type Statements = p_.List<Statement>

export type Statement =
    | ['import declaration', Import_Declaration]
    | ['module declaration', Module_Declaration]

export type Import_Declaration = {
    'import keyword': d_ast.Node
    'clause': d_ast.Node
    'from keyword': d_ast.Node
}

export type Module_Declaration = {
    'namespaces': p_.List<Namespace_Declaration>
}

export type Namespace_Declaration = {
}