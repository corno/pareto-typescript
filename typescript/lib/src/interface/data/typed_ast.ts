import * as p_ from 'pareto-core/dist/interface/data'
import * as d_ast from "../../modules/typescript_parser/interface/data/ast"

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type Statements = p_.List<Statement>

export type Statement =
    | ['import declaration', Import_Declaration]
    | ['interface declaration', Interface_Declaration]
    | ['module declaration', Module_Declaration]
    | ['type alias declaration', Type_Alias_Declaration]


export type Import_Declaration = {
    'import keyword': null
    'clause': Import_Clause
    'from keyword': null
    'string literal': String_Literal
}

export type Import_Clause = {
    'type':
    | ['named imports', p_.List<Import_Specifier>]
    | ['namespace import', Namespace_Import]
}

export type Namespace_Import = {
    'asterisk token': null
    'as keyword': null
    'identifier': Identifier
}

export type Import_Specifier = {
    'identifier': Identifier
}

export type Module_Declaration = {
    'modifiers': Modifiers
    'namespace keyword': null
    'identifier': Identifier
    'module block': Module_Block
}

export type Modifiers = p_.List<Modifier>

export type Optional_Modifiers = p_.Optional_Value<Modifiers>

export type Modifier =
    | ['export', null]
    | ['readonly', null]

export type Module_Block = {
    'open brace token': null
    'statements': Statements
    'close brace token': null
}

export type Type_Alias_Declaration = {
    'modifiers': Modifiers
    'type keyword': null
    'identifier': Identifier
    'equals token': null
    'type': Type
}

export type Type =
    | ['literal type', Literal_Type]
    | ['number keyword', null]
    | ['string keyword', null]
    | ['tuple type', Tuple_Type]
    | ['type literal', Type_Literal]
    | ['type reference', Type_Reference]
    | ['union type', Union_Type]

export type Interface_Declaration = {
    'interface keyword': null
    'identifier': Identifier
    'type parameters': p_.Optional_Value<Type_Parameters>
    'body': Type_Literal
    // 'heritage clauses': p_.Optional_Value<p_.List<Heritage_Clause>>
    // 'body': Type_Literal
}

export type Type_Parameters = {
    'less than token': null
    'entries': p_.List<Type_Parameters_Entry>
    'greater than token': null
}

export type Type_Parameters_Entry = {
    'identifier': Identifier
}

export type Union_Type = {
    'members': p_.List<Union_Type_Member>
}

export type Tuple_Type = {
    readonly 'open bracket token': null
    'elements': p_.List<Tuple_Type_Member>
    'close bracket token': null
}

export type Tuple_Type_Member =
    | ['comma token', null]
    | ['type', Type]

export type Union_Type_Member =
    | ['type', Type]
    | ['bar token', null]

export type Type_Reference = {
    // 'entity name': null
    'entity name': Entity_Name
    'type arguments': p_.Optional_Value<Type_Arguments>
}

export type Type_Literal = {
    'open brace token': null
    'members': p_.List<Type_Literal_Member>
    'close brace token': null
}

export type Type_Literal_Member =
    | ['property signature', Property_Signature]
    | ['index signature', Index_Signature]
    | ['call signature', Call_Signature]

export type Call_Signature = d_ast.Node

export type Index_Signature = d_ast.Node

export type Property_Signature = {
    'modifiers': Optional_Modifiers
    'id': String_Literal_Or_Identifier
    'colon token': null
    'type': Type
}

export type String_Literal_Or_Identifier =
    | ['string literal', String_Literal]
    | ['identifier', Identifier]

export type Entity_Name =
    | ['identifier', Identifier]
    | ['qualified name', Qualified_Name]

export type Qualified_Name = {
    'first': Entity_Name
    'dot token': null
    'second': Identifier
}

export type Identifier = d_ast.Node

export type Type_Arguments = {
    'less than token': null
    'entries': p_.List<Type_Arguments_Entry>
    'greater than token': null
}

export type Type_Arguments_Entry =
    | ['comma token', null]
    | ['type', Type]


export type Literal_Type = {
    'type':
    | ['false keyword', null]
    | ['null', null]
    | ['string literal', String_Literal]
    | ['true keyword', null]
}

export type String_Literal = d_ast.Node