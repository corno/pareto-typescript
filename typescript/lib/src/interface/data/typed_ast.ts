import * as p_ from 'pareto-core/dist/interface/data'
import * as d_ast from "../../modules/typescript_parser_api/interface/data/dynamic_ast"

export type TODO = d_ast.Node

export type Arguments = {
    'open parenthesis token': null
    'arguments': p_.List<Expression__Call__Arguments_Entry>
    'close parenthesis token': null

}

export type Block = {
    'open brace token': null
    'statements': Statements
    'close brace token': null
}

export type Binding_Pattern =
    | ['identifier', Identifier]
    | ['array binding pattern', Binding_Pattern__Array]
    | ['object binding pattern', Binding_Pattern__Object]

export type Binding_Pattern__Array = {
    'open bracket token': null
    'elements': p_.List<Binding_Pattern__Array__Element>
    'close bracket token': null
}

export type Binding_Pattern__Array__Element =
    | ['comma token', null]
    | ['binding element', {
        'dot dot dot token': p_.Optional_Value<null>
        'name': Binding_Pattern
        'initializer': p_.Optional_Value<Initializer>
    }]
    | ['omitted expression', null]

export type Binding_Pattern__Object = {
    'open brace token': null
    'elements': p_.List<
        | ['comma token', null]
        | ['binding element', Binding_Pattern__Object__Element]
    >
    'close brace token': null
}

export type Binding_Pattern__Object__Element = {
    // 'dot dot dot token': p_.Optional_Value<null>
    'property name': Property_Name
    'colon token': null
    'name': Binding_Pattern
    // 'initializer': p_.Optional_Value<Initializer>
}

export type Class_Body = {
    'open brace token': null
    'members': p_.List<Class_Body__Member>
    'close brace token': null
}

export type Class_Body__Member =
    | ['constructor', Class_Body__Member__Constructor]
    // | ['method', Class_Body__Member__Method]
    // | ['property', Class_Body__Member__Property]

export type Class_Body__Member__Constructor = {
    'jsdoc': JSDoc
    // 'modifiers': Modifiers
    'constructor keyword': null
    'parameters': Parameters
    'body': Block
}

export type Class_Body__Member__Method = {
    'jsdoc': JSDoc
    // 'modifiers': Modifiers
    // 'asterisk token': p_.Optional_Value<null>
    'identifier': Identifier
    // 'type parameters': Type_Parameters
    'parameters': Parameters
    // 'type': Optional_Type
    'body': Block
}

export type Class_Body__Member__Property = {
    'jsdoc': JSDoc
    // 'modifiers': Modifiers
    'identifier': Identifier
    // 'question token': p_.Optional_Value<null>
    'colon token': null
    'type': Type
}

export type Entity_Name =
    | ['identifier', Identifier]
    | ['qualified name', Qualified_Name]

export type Expression =
    | ['array literal', Expression__Array_Literal]
    | ['arrow function', Expression__Arrow_Function]
    | ['as expression', {
        'expression': Expression
        'as keyword': null
        'type': Type
    }]
    | ['await', {
        'await keyword': null
        'expression': Expression
    }]
    | ['big int literal', d_ast.Node]
    | ['binary', Expression__Binary]
    | ['call', Expression__Call]
    | ['class expression', {
        'class keyword': null
        'identifier': Identifier
        'body': Class_Body
    }]
    | ['conditional', Expression__Conditional]
    | ['delete', {
        'delete keyword': null
        'expression': Expression
    }]
    | ['element access', {
        'expression': Expression
        'open bracket token': null
        'argument expression': Expression
        'close bracket token': null
    }]
    | ['external module reference', {
        'require keyword': null
        'open parenthesis token': null
        'module name': String_Literal
        'close parenthesis token': null
    }]
    | ['false', null]
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
    | ['object literal', Expression__Object_Literal]
    | ['parenthesized', {
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
    }]
    | ['postfix unary', {
        'operand': Expression
        'operator token':
        | ['--', null]
        | ['++', null]
    }]

    | ['prefix unary', {
        'operator token':
        | ['!', null]
        | ['-', null]
        | ['+', null]
        'operand': Expression
    }]
    | ['property access', Expression__Property_Access]
    | ['regular expression literal', d_ast.Node]
    | ['string literal', String_Literal]
    | ['template', Expression__Template]
    | ['this', null]
    | ['true keyword', null]
    | ['type of', {
        'type of keyword': null
        'expression': Expression
    }]
    | ['void', {
        'void keyword': null
    }]

export type Expression__Array_Literal = {
    'open bracket token': null
    'elements': p_.List<Expression__Array_Literal__Element>
    'close bracket token': null
}

export type Expression__Array_Literal__Element =
    | ['comma token', null]
    | ['expression', Expression]

export type Expression__Arrow_Function = {
    'type parameters': Type_Parameters
    'parameters': Expression__Arrow_Function_Parameters
    'type': Optional_Type
    'equals greater than token': null
    'body':
    | ['block', Block]
    | ['expression', Expression]
}

export type Expression__Arrow_Function_Parameters =
    | ['with parentheses', Parameters]
    | ['without parentheses', Expression__Arrow_Function__Without_Parentheses]

export type Expression__Arrow_Function__Without_Parentheses = {
    'parameter': {
        'jsdoc': JSDoc
        'name': Binding_Pattern
        'type': Optional_Type
    }
}

export type Expression__Binary = {
    'left': Expression
    'operator token':
    | ['^', null]
    | ['^=', null]
    | ['-', null]
    | ['-=', null]
    | ['!=', null]
    | ['!==', null]
    | ['??', null]
    | ['??=', null]
    | ['*', null]
    | ['**', null]
    | ['**=', null]
    | ['*=', null]
    | ['/', null]
    | ['/=', null]
    | ['&', null]
    | ['&=', null]
    | ['&&', null]
    | ['&&=', null]
    | ['%', null]
    | ['+', null]
    | ['+=', null]
    | ['<', null]
    | ['<<', null]
    | ['<<=', null]
    | ['<=', null]
    | ['=', null]
    | ['==', null]
    | ['===', null]
    | ['>', null]
    | ['>=', null]
    | ['>>', null]
    | ['>>=', null]
    | ['>>>=', null]
    | ['>>>', null]
    | ['|', null]
    | ['|=', null]
    | ['||', null]
    | ['||=', null]
    | ['in', null]
    | ['instanceof', null]
    'right': Expression
}

export type Expression__Call = {
    'expression': Expression
    'type arguments': Type_Arguments
    'arguments': Arguments
}

export type Expression__Call__Arguments_Entry =
    | ['comma token', null]
    | ['expression', Expression]
    | ['spread', {
        'dot dot dot token': null
        'expression': Expression
    }]

export type Expression__Conditional = {
    'condition': Expression
    'question token': null
    'when true': Expression
    'colon token': null
    'when false': Expression
}

export type Expression__Object_Literal = {
    'open brace token': null
    'properties': p_.List<Expression__Object_Literal__Property>
    'close brace token': null
}

export type Expression__Object_Literal__Property =
    | ['comma token', null]
    | ['property assignment', Expression__Object_Literal__Property__Assignment]
    | ['shorthand property assignment', {
        'name': Property_Name
    }]
    | ['method', null]

export type Expression__Object_Literal__Property__Assignment = {
    'jsdoc': JSDoc
    'name': Property_Name
    'colon token': null
    'initializer': Expression
}

export type Expression__Property_Access = {
    'expression': Expression
    'dot token': null
    'name': Identifier
}

export type Expression__Template = {
    'head': d_ast.Node
    'template spans': p_.List<Expression__Template_Span>
}

export type Expression__Template_Span = {
    'expression': Expression
    'suffix':
    | ['middle', d_ast.Node]
    | ['tail', d_ast.Node]
}

export type Identifier = d_ast.Node

export type Import_Specifier =
    | ['comma token', null]
    | ['import specifier', {
        'identifier': Identifier
        'as': p_.Optional_Value<{
            'as keyword': null
            'identifier': Identifier
        }>
    }]

export type Initializer = {
    'equals token': null
    'expression': Expression
}

export type JSDoc = p_.Optional_Value<d_ast.Node>

export type Modifier =
    | ['async', null]
    | ['declare', null]
    | ['default', null]
    | ['export', null]
    | ['readonly', null]

export type Modifiers = p_.Optional_Value<p_.List<Modifier>>

export type Numeric_Literal = d_ast.Node

export type Object_Type = {
    'open brace token': null
    'members': p_.List<Object_Type__Element>
    'close brace token': null
}

export type Object_Type__Element =
    | ['call signature', Object_Type__Element__Call_Signature]
    | ['construct signature', Object_Type__Element__Construct_Signature]
    | ['index signature', Object_Type__Element__Index_Signature]
    | ['property signature', Object_Type__Element__Property_Signature]
    | ['method signature', TODO]

export type Object_Type__Element__Call_Signature = {
    'jsdoc': JSDoc
    'parameters': Parameters
    'type': Optional_Type
    'semicolon': Semi_Colon
}

export type Object_Type__Element__Construct_Signature = {
    'jsdoc': JSDoc
    'new keyword': null
    'parameters': Parameters
    //'type': Optional_Type
    'semicolon': Semi_Colon
}

export type Object_Type__Element__Index_Signature = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'open bracket token': null
    'parameter': {
        'identifier': Identifier
        'colon token': null
        'type': Type //this is too broad, only certain types are allowed; string, number, symbol, template literal, union of those (not fully sure if there's more)
    }
    'close bracket token': null
    'colon token': null
    'type': Type
    'semicolon': Semi_Colon
}

export type Object_Type__Element__Property_Signature = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'id': Property_Name
    'question token': p_.Optional_Value<null>
    'colon token': null
    'type': Type
    'comma token': p_.Optional_Value<null>
    'semicolon token': Semi_Colon
}

export type Optional_Initializer = p_.Optional_Value<Initializer>

export type Optional_Type = p_.Optional_Value<{
    'colon token': null
    'type': Type
}>

export type Parameters = {
    'open parenthesis token': null
    'entries': p_.List<Parameters__Entry>
    'close parenthesis token': null
}

export type Parameters__Entry =
    | ['comma token', null]
    | ['parameter', Parameters__Parameter]

export type Parameters__Parameter = {
    'jsdoc': JSDoc
    'dot dot dot token': p_.Optional_Value<null>
    'name': Binding_Pattern
    'question token': p_.Optional_Value<null>
    'type': Optional_Type
    'initializer': p_.Optional_Value<Initializer>
}

export type Property_Name =
    | ['string literal', String_Literal]
    | ['identifier', Identifier]
    | ['numeric literal', Numeric_Literal]

export type Qualified_Name = {
    'first': Entity_Name
    'dot token': null
    'second': Identifier
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

export type Semi_Colon = p_.Optional_Value<null>

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type Statement =
    | ['block', Block]
    | ['break', {
        'break keyword': null
        'identifier': p_.Optional_Value<Identifier>
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
    | ['enum', Statement__Enum_Declaration]
    | ['export assignment', {
        'export keyword': null
        'initializer': Initializer
        'semicolon': Semi_Colon
    }]
    | ['export declaration', Statement__Export_Declaration]
    | ['expression', {
        'expression': Expression
        'semicolon': Semi_Colon
    }]
    | ['for', Statement__For]
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
    | ['function', Statement__Function_Declaration]
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
    | ['import', Statement__Import_Declaration]
    | ['import equals', {
        'modifiers': Modifiers
        'import keyword': null
        'identifier': Identifier
        'initializer': Initializer
        'semicolon': Semi_Colon
    }]
    | ['interface', Statement__Interface_Declaration]
    | ['module', Statement__Module_Declaration]
    | ['return', {
        'jsdoc': JSDoc
        'return keyword': null
        'expression': p_.Optional_Value<Expression>
        'semicolon': Semi_Colon
    }]
    | ['switch', Statement__Switch]
    | ['throw', {
        'throw keyword': null
        'expression': Expression
        'semicolon': Semi_Colon
    }]
    | ['try', Statement__Try]
    | ['type alias', Statement__Type_Alias_Declaration]
    | ['variable', Statement__Variable]
    | ['while', {
        'while keyword': null
        'open parenthesis token': null
        'expression': Expression
        'close parenthesis token': null
        'statement': Statement
    }]

export type Statement__Class_Declaration = {
    'jsdoc': JSDoc
    'class keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'heritage clauses': p_.Optional_Value<p_.List<Statement__Class__Heritage_Clause>>
    'body': Class_Body
    'semicolon': Semi_Colon
}

export type Statement__Try = {
    'jsdoc': JSDoc
    'try keyword': null
    'try block': Block
    'catch clause': p_.Optional_Value<{
        'catch keyword': null
        'open parenthesis token': null
        'variable declaration': Variable_Declaration
        'close parenthesis token': null
        'block': Block
    }>
    'finally block': p_.Optional_Value<{
        'finally keyword': null
        'block': Block
    }>
    'semicolon': Semi_Colon
}

export type Statement__Class__Heritage_Clause = {
    'extends or implements keyword': null
    'types': p_.List<Statement__Class__Heritage_Clause_Type>
}

export type Statement__Class__Heritage_Clause_Type = {
    'expression': Entity_Name
    'type arguments': Type_Arguments
}

export type Statement__Enum_Declaration = {
    'jsdoc': JSDoc
    'modifiers': p_.Optional_Value<p_.List<
        | ['const', null]
        | ['declare', null]
        | ['default', null]
        | ['export', null]
    >>
    'enum keyword': null
    'identifier': Identifier
    'open brace token': null
    'members': p_.List<
        | ['comma token', null]
        | ['enum member', Statement__Enum_Declaration__Member]
    >
    'close brace token': null
    'semicolon': Semi_Colon
}

export type Statement__Enum_Declaration__Member = {
    'jsdoc': JSDoc
    'identifier': Identifier
    // 'initializer': p_.Optional_Value<Initializer>
    // 'comma token': p_.Optional_Value<null>
}

export type Statement__Function_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'function keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'parameters': Parameters
    'return type annotation': Return_Type_Annotation //FIXME Return Type_Annotation
    'body': p_.Optional_Value<Block>
    'semicolon': Semi_Colon
}

export type Statement__For = {
    'jsdoc': JSDoc
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

export type Statement__Export_Declaration = {
    'jsdoc': JSDoc
    'export keyword': null
    'type':
    | ['all', {
        'asterisk token': null
        'as': p_.Optional_Value<{
            'as keyword': null
            'identifier': Identifier
        }>
    }]
    | ['named', {
        'open brace token': null
        'exports': p_.List<Statement__Export_Declaration_Entry>
        'close brace token': null
    }]
    | ['namespace', {
        'asterisk token': null
        'as keyword': null
        'identifier': Identifier
    }]
    'from clause': p_.Optional_Value<{
        'from keyword': null
        'string literal': String_Literal
    }>
    'semicolon': Semi_Colon
}

export type Statement__Export_Declaration_Entry =
    | ['comma token', null]
    | ['export specifier', {
        'identifier': Identifier
        'as': p_.Optional_Value<{
            'as keyword': null
            'identifier': Identifier
        }>
    }]

export type Statement__Import_Declaration = {
    'jsdoc': JSDoc
    'import keyword': null
    'clause': Statement__Import_Clause
    'from keyword': null
    'string literal': String_Literal
    'semicolon': Semi_Colon
}

export type Statement__Import_Clause = {
    'type':
    | ['named imports', Statement__Import__Named_Imports]
    | ['namespace import', Statement__Import__Namespace]
    | ['identifier', Identifier]
}

export type Statement__Import__Namespace = {
    'asterisk token': null
    'as keyword': null
    'identifier': Identifier
}

export type Statement__Import__Named_Imports = {
    'open brace token': null
    'entries': p_.List<Import_Specifier>
    'close brace token': null
}


export type Statement__Interface_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'interface keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'body': Object_Type
    // 'heritage clauses': p_.Optional_Value<p_.List<Heritage_Clause>>
    // 'body': Type_Literal
    'semicolon': Semi_Colon
}

export type Statement__Module_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'type':
    | ['module', {
        'keyword': null
        'name': Property_Name
    }]
    | ['namespace', {
        'keyword': null
        'name': Identifier
    }]
    'block': Statement__Module__Declaration__Block
    'semicolon': Semi_Colon
}

export type Statement__Module__Declaration__Block = { //FIXME; is this different from 'Block'?
    'open brace token': null
    'statements': Statements
    'close brace token': null
}


export type Statement__Switch = {
    'jsdoc': JSDoc
    'switch keyword': null
    'open parenthesis token': null
    'expression': Expression
    'close parenthesis token': null
    'case block': {
        'open brace token': null
        'clauses': p_.List<Statement__Switch_Case_Clause>
        'close brace token': null
    }
    'semicolon': Semi_Colon
}

export type Statement__Switch_Case_Clause =
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

export type Statement__Type_Alias_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'type keyword': null
    'identifier': Identifier
    'type parameters': Type_Parameters
    'equals token': null
    'type': Type
    'semicolon': Semi_Colon
}

export type Statement__Variable = {
    'jsdoc': JSDoc
    'modifiers': Modifiers
    'variable declaration list': Variable_Declaration_List
    'semicolon': Semi_Colon
}

export type Statements = p_.List<Statement>

export type String_Literal = d_ast.Node

export type Type =
    | ['any', null]
    | ['array', {
        'element type': Type
        'open bracket token': null
        'close bracket token': null
    }]
    | ['boolean', null]
    | ['function', Type__Function_Type]
    | ['indexed access', {
        'object type': Type
        'open bracket token': null
        'index type': Type
        'close bracket token': null
    }]
    | ['literal type', Type__Literal]
    | ['never', null]
    | ['number', null]
    | ['parenthesized', {
        'open parenthesis token': null
        'type': Type
        'close parenthesis token': null
    }]
    | ['string', null]
    | ['symbol', null]
    | ['tuple type', Type__Tuple]
    | ['type literal', Object_Type]
    | ['type operator', {
        'readonly keyword': null
        'type': Type
    }]
    | ['type reference', Type__Type_Reference]
    | ['union type', Type__Union]
    | ['undefined', null]
    | ['unknown', null]
    | ['void', null]

export type Type__Function_Type = {
    'type parameters': Type_Parameters
    'parameters': Parameters
    'type': Optional_Type
    'equals greater than token': null
    'return type': Type
}
export type Type__Literal = {
    'type':
    | ['false keyword', null]
    | ['null', null]
    | ['numeric literal', Numeric_Literal]
    | ['string literal', String_Literal]
    | ['true keyword', null]
}

export type Type__Union = {
    'members': p_.List<Type__Union__Member>
}

export type Type__Tuple = {
    readonly 'open bracket token': null
    'elements': p_.List<Type__Tuple__Member>
    'close bracket token': null
}

export type Type__Tuple__Member =
    | ['comma token', null]
    | ['type', Type]

export type Type__Union__Member =
    | ['type', Type]
    | ['bar token', null]

export type Type__Type_Reference = {
    // 'entity name': null
    'entity name': Entity_Name
    'type arguments': Type_Arguments
}

export type Type_Arguments = p_.Optional_Value<{
    'less than token': null
    'entries': p_.List<Type_Arguments_Entry>
    'greater than token': null
}>

export type Type_Arguments_Entry =
    | ['comma token', null]
    | ['type', Type]

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

export type Variable_Declaration_List = {
    'mutability':
    | ['await using', {
        'await keyword': null
        'using keyword': null
    }]
    | ['const', null]
    | ['let', null]
    | ['using', null]
    | ['var', null]
    'declarations': p_.List<Variable_Declaration>
}

export type Variable_Declaration = {
    'name': Binding_Pattern
    'type': Optional_Type
    'assignment': p_.Optional_Value<{
        'initializer': Initializer
    }>
}