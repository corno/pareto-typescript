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
    | ['type alias declaration', Type_Alias_Declaration]


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
    'open brace token': d_ast.Node
    'statements': Statements
    'close brace token': d_ast.Node
}

export type Type_Alias_Declaration = {
    'modifiers': Modifiers
    'type keyword': d_ast.Node
    'identifier': d_ast.Node
    'first assignment': d_ast.Node
    'type': Type
}

export type Type =
    | ['type reference', Type_Reference]
    | ['literal type', Literal_Type]
    | ['type literal', Type_Literal]

export type Type_Reference = {
    'entity name': Entity_Name
    'type parameters': p_.Optional_Value<Type_Parameters>
}

export type Type_Literal = d_ast.Node

export type Entity_Name =
    | ['identifier', d_ast.Node]
    | ['qualified name', Qualified_Name]

export type Qualified_Name = null
// export type Qualified_Name = {
//     'first node': {
//         'identifier': d_ast.Node
//         'dot token': d_ast.Node
//         'identifier2': d_ast.Node
//     }
// }

export type Type_Parameters = {
    'less than token': d_ast.Node
    'entries': p_.List<Type_Parameters_Entry>
    'greater than token': d_ast.Node
}

export type Type_Parameters_Entry =
    | ['comma token', d_ast.Node]
    | ['type', Type]


export type Literal_Type = {
    'type':
    | ['null', d_ast.Node]
}