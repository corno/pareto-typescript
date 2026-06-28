import * as p_ from 'pareto-core/dist/interface/data'
import * as d_ast from "../../modules/typescript_parser/interface/data/ast"

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type TODO = d_ast.Node

export type Statements = p_.List<Statement>

export type Statement =
    | ['block', Block]
    | ['break', {
        'break keyword': null
        'semicolon': Semi_Colon
    }]
    | ['class', TODO]
    | ['do', {
        'do keyword': null
        'statement': Statement
        'while keyword': null
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
        'semicolon': Semi_Colon
    }]
    | ['export declaration', Export_Declaration]
    | ['expression', {
        'expression': Expression
        'semicolon': Semi_Colon
    }]
    | ['for', For_Statement]
    | ['for in', {
        'for keyword': null
        'open parenthesis token': null
        'variable declaration list': Variable_Declaration_List
        'in keyword': null
        'expression': Expression
        'close parenthesis token': null
        'statement': Statement
        'semicolon': Semi_Colon
    }]
    | ['function', Function_Declaration]
    | ['if', {
        'if keyword': null
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
        'then statement': Statement
        'else': p_.Optional_Value<{
            'else keyword': null
            'statement': Statement
        }>
        'semicolon': Semi_Colon
    }]
    | ['import', Import_Declaration]
    | ['interface', Interface_Declaration]
    | ['namespace', Module_Declaration] //aka 'module'
    | ['return', {
        'jsdoc': JSDoc
        'return keyword': null
        'expression': p_.Optional_Value<Expression>
        'semicolon': Semi_Colon
    }]
    | ['switch', Switch_Statement]
    | ['throw', {
        'throw keyword': null
        'expression': Expression
        'semicolon': Semi_Colon
    }]
    | ['type alias', Type_Alias_Declaration]
    | ['variable', Variable_Statement]
    | ['while', {
        'while keyword': null
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
        'statement': Statement
    }]

export type Class_Declaration = {
    'class keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'heritage clauses': p_.Optional_Value<p_.List<Heritage_Clause>>
    'body': Class_Body
    'semicolon': Semi_Colon
}

export type Heritage_Clause = {
    'extends or implements keyword': null
    'types': p_.List<Heritage_Clause_Type>
}

export type Heritage_Clause_Type = {
    'expression': Entity_Name
    'type arguments': Type_Arguments
}

export type Class_Body = {
    'open brace token': null
    'members': p_.List<Class_Body_Member>
    'close brace token': null
}

export type Class_Body_Member =
    | ['constructor', {
        'jsdoc': JSDoc
        'modifiers': Modifiers
        'constructor keyword': null
        'parameters': Parameters
        'body': Block
    }]
    | ['method', {
        'jsdoc': JSDoc
        'modifiers': Modifiers
        'asterisk token': p_.Optional_Value<null>
        'identifier': Identifier
        'type parameters': Type_Parameters
        'parameters': Parameters
        'type': Optional_Type
        'body': Block
    }]
    | ['property', {
        'jsdoc': JSDoc
        'modifiers': Modifiers
        'identifier': Identifier
        'question token': p_.Optional_Value<null>
        'colon token': null
        'type': Type
    }]

export type Function_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'function keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'parameters': Parameters
    'return type annotation': Optional_Type //FIXME Return Type_Annotation
    'body': Block
    'semicolon': Semi_Colon
}

export type Return_Type_Annotation = p_.Optional_Value<{
    'colon token': null
    'kind': 
    | ['type', Type]
    | ['type predicate', {
        'identifier': Identifier
        'is keyword': null
        'type': Type
    }]
}>

export type For_Statement = {
    'for keyword': null
    'open parenthesis token': null
    'variable declaration list': Variable_Declaration_List
    'semicolon token': null
    'condition': p_.Optional_Value<Expression>
    'semicolon token 2': null
    'incrementor': p_.Optional_Value<Expression>
    'close parenthesis token': null
    'statement': Statement
    'semicolon': Semi_Colon
}

export type Semi_Colon = p_.Optional_Value<null>

export type JSDoc = p_.Optional_Value<d_ast.Node>

export type Export_Declaration = {
    'export keyword': null
    'type':
    | ['all', {
        'asterisk token': null
        'as': p_.Optional_Value<{
            'as keyword': null
            'identifier': Identifier
        }>
    }]
    | ['named exports', {
        'open brace token': null
        'exports': p_.List<Export_Declaration_Entry>
        'close brace token': null
    }]
    'from clause': p_.Optional_Value<{
        'from keyword': null
        'string literal': String_Literal
    }>
    'semicolon': Semi_Colon
}

export type Export_Declaration_Entry =
    | ['comma token', null]
    | ['export specifier', {
        'identifier': Identifier
        'as': p_.Optional_Value<{
            'as keyword': null
            'identifier': Identifier
        }>
    }]

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
    'semicolon': Semi_Colon
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
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'variable declaration list': Variable_Declaration_List
    'semicolon': Semi_Colon
}

export type Variable_Declaration_List = {
    'mutability':
    | ['const keyword', null]
    | ['let keyword', null]
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
    | ['as expression', {
        'expression': Expression
        'as keyword': null
        'type': Type
    }]
    | ['binary', Binary_Expression]
    | ['call', Call_Expression]
    | ['conditional', Conditional_Expression]
    | ['element access', {
        'expression': Expression
        'open bracket token': null
        'argument expression': Expression
        'close bracket token': null
    }]
    | ['false keyword', null]
    | ['identifier', Identifier]
    | ['new', {
        'new keyword': null
        'expression': Expression
        'arguments': Arguments
    }]
    | ['no substitution template literal', d_ast.Node]
    | ['non null', {
        'expression': Expression
        'exclamation token': null
    }]
    | ['null keyword', null]
    | ['numeric literal', d_ast.Node]
    | ['object literal', Object_Literal_Expression]
    | ['parenthesized', {
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
    }]
    | ['postfix unary', {
        'operand': Expression
        'operator token':
        | ['minus minus token', null]
        | ['plus plus token', null]
    }]

    | ['prefix unary', {
        'operator token':
        | ['exclamation token', null]
        | ['minus token', null]
        | ['plus token', null]
        'operand': Expression
    }]
    | ['property access', Property_Access_Expression]
    | ['regular expression literal', d_ast.Node]
    | ['string literal', String_Literal]
    | ['template', Template_Expression]
    | ['true keyword', null]
    | ['type of', {
        'type of keyword': null
        'expression': Expression
    }]

export type Block = {
    'open brace token': null
    'statements': Statements
    'close brace token': null
}

export type Binary_Expression = {
    'left': Expression
    'operator token':
    | ['asterisk equals token', null]
    | ['asterisk token', null]
    | ['ampersand ampersand token', null]
    | ['bar bar token', null]
    | ['equals token', null]
    | ['equals equals equals token', null]
    | ['exclamation equals equals token', null]
    | ['greater than equals token', null]
    | ['greater than token', null]
    | ['instanceof', null]
    | ['less than equals token', null]
    | ['less than token', null]
    | ['minus equals token', null]
    | ['minus token', null]
    | ['percent token', null]
    | ['plus equals token', null]
    | ['plus token', null]
    | ['slash token', null]
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
    | ['shorthand property assignment', {
        'name': String_Literal_or_Identifier
    }]
    | ['method', null]

export type Property_Assignment = {
    'jsdoc': JSDoc
    'name': String_Literal_or_Identifier
    'colon token': null
    'initializer': Expression
}

export type Template_Expression = {
    'head': d_ast.Node
    'template spans': p_.List<Template_Span>
}

export type Template_Span = {
    'expression': Expression
    'suffix':
    | ['middle', d_ast.Node]
    | ['tail', d_ast.Node]
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

export type Arguments = {
    'open parenthesis token': null
    'arguments': p_.List<Call_Expression_Arguments_Entry>
    'close parenthesis token': null

}

export type Call_Expression = {
    'expression': Expression
    'type arguments': Type_Arguments
    'arguments': Arguments
}

export type Call_Expression_Arguments_Entry =
    | ['comma token', null]
    | ['expression', Expression]
    | ['spread', {
        'dot dot dot token': null
        'expression': Expression
    }]

export type Arrow_Function = {
    'type parameters': Type_Parameters
    'parameters': Arrow_Function_Parameters
    'type': Optional_Type
    'equals greater than token': null
    'body':
    | ['block', Block]
    | ['expression', Expression]
}

export type Optional_Type = p_.Optional_Value<{
    'colon token': null
    'type': Type
}>

export type Arrow_Function_Parameters =
    | ['with parentheses', Parameters]
    | ['without parentheses', Without_Parentheses]

export type Without_Parentheses = {
    'parameter': {
        'identifier': Identifier
        'type': Optional_Type
    }
}

export type Parameters = {
    'open parenthesis token': null
    'entries': p_.List<Parameters_Entry>
    'close parenthesis token': null
}

export type Parameters_Entry =
    | ['comma token', null]
    | ['parameter', {
        'dot dot dot token': p_.Optional_Value<null>
        'identifier': Identifier
        'question token': p_.Optional_Value<null>
        'type': Optional_Type
    }]


export type Import_Declaration = {
    'import keyword': null
    'clause': Import_Clause
    'from keyword': null
    'string literal': String_Literal
    'semicolon': Semi_Colon
}

export type Import_Clause = {
    'type':
    | ['named imports', Named_Imports]
    | ['namespace import', Namespace_Import]
    | ['identifier', Identifier]
}

export type Named_Imports = {
    'open brace token': null
    'entries': p_.List<Import_Specifier>
    'close brace token': null
}

export type Namespace_Import = {
    'asterisk token': null
    'as keyword': null
    'identifier': Identifier
}

export type Import_Specifier =
    | ['comma token', null]
    | ['import specifier', {
        'identifier': Identifier
        'as': p_.Optional_Value<{
            'as keyword': null
            'identifier': Identifier
        }>
    }]

export type Module_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'namespace keyword': null
    'identifier': Identifier
    'module block': Module_Block
    'semicolon': Semi_Colon
}

export type Modifiers = p_.Optional_Value<p_.List<Modifier>>

export type Modifier =
    | ['default', null]
    | ['export', null]
    | ['readonly', null]

export type Module_Block = {
    'open brace token': null
    'statements': Statements
    'close brace token': null
}

export type Type_Alias_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'type keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'equals token': null
    'type': Type
    'semicolon': Semi_Colon
}

export type Type =
    | ['any', null]
    | ['array', {
        'element type': Type
        'open bracket token': null
        'close bracket token': null
    }]
    | ['boolean', null]
    | ['function', Function_Type]
    | ['indexed access', {
        'object type': Type
        'open bracket token': null
        'index type': Type
        'close bracket token': null
    }]
    | ['literal type', Literal_Type]
    | ['never', null]
    | ['number', null]
    | ['string', null]
    | ['symbol', null]
    | ['tuple type', Tuple_Type]
    | ['type literal', Type_Literal_And_Interface_And_Class_Body]
    | ['type operator', {
        'readonly keyword': null
        'type': Type
    }]
    | ['type reference', Type_Reference]
    | ['union type', Union_Type]
    | ['undefined', null]
    | ['unknown', null]
    | ['void', null]

export type Function_Type = {
    'type parameters': Type_Parameters
    'parameters': Parameters
    'type': Optional_Type
    'equals greater than token': null
    'return type': Type
}

export type Interface_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'interface keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'body': Type_Literal_And_Interface_And_Class_Body
    // 'heritage clauses': p_.Optional_Value<p_.List<Heritage_Clause>>
    // 'body': Type_Literal
    'semicolon': Semi_Colon
}

export type Type_Parameters = p_.Optional_Value<{
    'less than token': null
    'entries': p_.List<Type_Parameters_Entry>
    'greater than token': null
}>

export type Type_Parameters_Entry =
    | ['comma token', null]
    | ['type parameter', {
        'identifier': Identifier
        'extends': p_.Optional_Value<{
            'extends keyword': null
            'type': Type
        }>
    }]

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
    'type arguments': Type_Arguments
}

export type Type_Literal_And_Interface_And_Class_Body = {
    'open brace token': null
    'members': p_.List<Type_Literal_Member>
    'close brace token': null
}

export type Type_Literal_Member =
    | ['call signature', Call_Signature]
    | ['index signature', Index_Signature]
    | ['property signature', Property_Signature]
    | ['method signature', TODO]

export type Call_Signature = {
    'parameters': Parameters
    'type': Optional_Type
}

export type Index_Signature = {
    'open bracket token': null
    'parameter': {
        'identifier': Identifier
        'colon token': null
        'type': Type //this is too broad, only certain types are allowed; string, number, symbol, template literal, union of those (not fully sure if there's more)
    }
    'close bracket token': null
    'colon token': null
    'type': Type
}

export type Property_Signature = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'id': String_Literal_or_Identifier
    'question token': p_.Optional_Value<null>
    'colon token': null
    'type': Type
    'comma token': p_.Optional_Value<null>
    'semicolon token': p_.Optional_Value<null>
}

export type String_Literal_or_Identifier =
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

export type Type_Arguments = p_.Optional_Value<{
    'less than token': null
    'entries': p_.List<Type_Arguments_Entry>
    'greater than token': null
}>

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