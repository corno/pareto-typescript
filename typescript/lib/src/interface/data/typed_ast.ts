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
    'string literal': d_ast.Node
}

export type Module_Declaration = {
    'modifiers': Modifiers
    'namespace keyword': d_ast.Node
    'identifier': d_ast.Node
    'module block': Module_Block
}

export type Modifiers = p_.List<Modifier>

export type Modifier =
    | ['export', d_ast.Node]

export type Module_Block = {
    'first punctuation': d_ast.Node
    'stuff': p_.List<Module_Block_Stuff>
    'close brace token': d_ast.Node
}

export type Module_Block_Stuff =
| ['type alias declaration', Type_Alias_Declaration]

export type Type_Alias_Declaration = {
    'modifiers': Modifiers
    'type keyword': d_ast.Node
    'identifier': d_ast.Node
    'first assignment': d_ast.Node
    'type': Type
}

export type Type =
    | ['type reference', Type_Reference]
    | ['type literal', Literal_Type]

export type Type_Reference = {
    'first node': {
        'identifier': d_ast.Node
        'dot token': d_ast.Node
        'identifier2': d_ast.Node
    }
    'first binary operator': d_ast.Node
    'type parameters': Type_Parameters
    'greater than token': d_ast.Node
}

export type Type_Parameters = p_.List<Type>


export type Literal_Type = {
    'type':
    | ['null', d_ast.Node]
}