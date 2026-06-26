import * as p_ from 'pareto-core/dist/interface/data'
import * as d_ast from "../../modules/typescript_parser/interface/data/ast"
import { e } from 'pareto-core/dist/implementation/query'

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type TODO = d_ast.Node

export type Statements = p_.List<Statement>

export type Statement =
    | ['import declaration', Import_Declaration]
    | ['interface declaration', Interface_Declaration]
    | ['module declaration', Module_Declaration]
    | ['return statement', {
        'return keyword': null
        'expression': p_.Optional_Value<Expression>
    }]
    | ['switch statement', Switch_Statement]
    | ['type alias declaration', Type_Alias_Declaration]
    | ['variable statement', Variable_Statement]

export type Switch_Statement = {
    'switch keyword': null
    'open parenthesis token': null
    'expression': Expression
    'close parenthesis token': null
    'case block': {
        'open brace token': null
        'clauses': p_.List<Switch_Statement_Case_Clause>
        'close brace token': null
    }
}

export type Switch_Statement_Case_Clause =
    | ['case', {
        'case keyword': null
        'expression': Expression
        'colon token': null
        'statements': Statements
    }]
    | ['default', {
        'default keyword': null
        'colon token': null
        'statements': Statements
    }]

export type Variable_Statement = {
    'modifiers': Optional_Modifiers
    'variable declaration list': Variable_Declaration_List
}

export type Variable_Declaration_List = {
    'const keyword': p_.Optional_Value<null>
    'declarations': p_.List<Variable_Declaration>
}

export type Variable_Declaration = {
    'name': Identifier
    'type': Optional_Type
    'assignment': p_.Optional_Value<{
        'equals token': null
        'expression': Expression
    }>
}

export type Expression =
    | ['array literal', Array_Literal_Expression]
    | ['arrow function', Arrow_Function]
    | ['binary', Binary_Expression]
    | ['block', Block]
    | ['call', Call_Expression]
    | ['conditional', Conditional_Expression]
    | ['identifier', Identifier]
    | ['null keyword', null]
    | ['object literal', Object_Literal_Expression]
    | ['parenthesized', {
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
    }]
    | ['property access', Property_Access_Expression]
    | ['string literal', String_Literal]
    | ['template', Template_Expression]
    | ['true keyword', null]

export type Block = {
    'open brace token': null
    'statements': Statements
    'close brace token': null
}

export type Binary_Expression = {
    'left': Expression
    'operator token':
    | ['equals equals equals token', null]
    | ['exclamation equals equals token', null]
    'right': Expression
}

export type Conditional_Expression = {
    'condition': Expression
    'question token': null
    'when true': Expression
    'colon token': null
    'when false': Expression
}

export type Object_Literal_Expression = {
    'open brace token': null
    'properties': p_.List<Object_Literal_Expression_Property>
    'close brace token': null
}

export type Object_Literal_Expression_Property =
    | ['comma token', null]
    | ['property assignment', Property_Assignment]

export type Property_Assignment = {
    'name': String_Literal_Or_Identifier
    'colon token': null
    'initializer': Expression
}

export type Template_Expression = {
    'head': d_ast.Node
    'template spans': p_.List<Template_Span>
}

export type Template_Span = {
    'expression': Expression
    'template tail': d_ast.Node
}

export type Array_Literal_Expression = {
    'open bracket token': null
    'elements': p_.List<Array_Literal_Expression_Element>
    'close bracket token': null
}

export type Array_Literal_Expression_Element =
    | ['comma token', null]
    | ['expression', Expression]

export type Property_Access_Expression = {
    'expression': Expression
    'dot token': null
    'name': Identifier
}

export type Call_Expression = {
    'expression': Expression
    'open parenthesis token': null
    'arguments': p_.List<Call_Expression_Arguments_Entry>
    'close parenthesis token': null
}

export type Call_Expression_Arguments_Entry =
    | ['comma token', null]
    | ['expression', Expression]

export type Arrow_Function = {
    'open parenthesis token': null
    'parameters': Parameters
    'close parenthesis token': null
    'type': Optional_Type
    'equals greater than token': null
    'body': Expression
}

export type Optional_Type = p_.Optional_Value<{
    'colon token': null
    'type': Type
}>

export type Parameters = p_.List<Parameters_Entry>

export type Parameters_Entry =
    | ['comma token', null]
    | ['parameter', {
        'identifier': Identifier
    }]


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
    | ['identifier', Identifier]
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
    'modifiers': Optional_Modifiers
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
    'modifiers': Optional_Modifiers
    'type keyword': null
    'identifier': Identifier
    'equals token': null
    'type': Type
}

export type Type =
    | ['indexed access', {
        'object type': Type
        'open bracket token': null
        'index type': Type
        'close bracket token': null
    }]
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

export type Call_Signature = TODO

export type Index_Signature = TODO

export type Property_Signature = {
    'modifiers': Optional_Modifiers
    'id': String_Literal_Or_Identifier
    'colon token': null
    'type': Type
    'comma token': p_.Optional_Value<null>
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