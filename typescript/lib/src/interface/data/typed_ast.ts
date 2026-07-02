import * as p_ from 'pareto-core/dist/interface/data'
import * as p_di from 'pareto-core/dist/interface/data'
import * as d_ast from "../../modules/typescript_parser_api/interface/data/dynamic_ast"

import * as h from "../../temp_helpers"


export type Separated_List<T extends p_di.Value> = p_.List<
    | ['entry', T]
    | ['separator', d_ast.Keyword]
>

export type Arguments = {
    'open parenthesis token': d_ast.Keyword
    'arguments': Separated_List<Arguments__L>
    'close parenthesis token': d_ast.Keyword
}

export type Arguments__L =
    ['expression', Expression]
    | ['spread', {
        'dot dot dot token': d_ast.Keyword
        'expression': Expression
    }]


export type Block = {
    'open brace token': d_ast.Keyword
    'statements': Statements
    'close brace token': d_ast.Keyword
}

export type Binding_Pattern = {
    'modifiers': p_.Optional_Value<p_.List<
        | ['readonly', d_ast.Keyword]
        | ['public', d_ast.Keyword]
        | ['declare', d_ast.Keyword]
        | ['decorator', d_ast.Keyword]
        | ['export', d_ast.Keyword]
        | ['override', d_ast.Keyword]
        | ['private', d_ast.Keyword]
        | ['protected', d_ast.Keyword]
        | ['static', d_ast.Keyword]
    >>
    'type':
    | ['array binding pattern', Binding_Pattern__Array]
    | ['identifier', Identifier]
    | ['number keyword', d_ast.Keyword]
    | ['object binding pattern', Binding_Pattern__Object]
    | ['string keyword', d_ast.Keyword]
}

export type Binding_Pattern__Array = {
    'open bracket token': d_ast.Keyword
    'elements': h.Separated_List<Binding_Pattern__Array__Element>
    'close bracket token': d_ast.Keyword
}

export type Binding_Pattern__Array__Element =
    | ['binding element', {
        'dot dot dot token': p_.Optional_Value<d_ast.Keyword>
        'name': Binding_Pattern
        'initializer': p_.Optional_Value<Initializer>
    }]
    | ['omitted expression', null] //synthetic node, used for array destructuring, e.g. [,,a] = [1,2,3]

export type Binding_Pattern__Object = {
    'open brace token': d_ast.Keyword
    'elements': h.Separated_List<Binding_Pattern__Object__Element>
    'close brace token': d_ast.Keyword
}

export type Binding_Pattern__Object__Element = {
    // 'dot dot dot token': p_.Optional_Value<d_ast.Keyword>
    'property name': Property_Name
    'binding': p_.Optional_Value<{
        'colon token': d_ast.Keyword
        'pattern': Binding_Pattern
    }>
    // 'initializer': p_.Optional_Value<Initializer>
}

export type Class = {
    'jsdoc': JSDoc
    'modifiers': p_.Optional_Value<p_.List<
        | ['tbd', null]
    >>
    'class keyword': d_ast.Keyword
    'identifier': Identifier
    'type parameters': Type_Parameters
    'heritage': Heritage
    'body': Class_Body
}

export type Class_Body = {
    'open brace token': d_ast.Keyword
    'members': p_.List<Class_Body__Member>
    'close brace token': d_ast.Keyword
}

export type Class_Body__Member =
    | ['constructor', Class_Body__Member__Constructor]
    | ['get accessor', Class_Body__Member__Get_Accessor]
    | ['method', Class_Body__Member__Method]
    | ['property', Class_Body__Member__Property]
    | ['set accessor', Class_Body__Member__Set_Accessor]

export type Class_Body__Member__Constructor = {
    'jsdoc': JSDoc
    // 'modifiers': Modifiers
    'constructor keyword': d_ast.Keyword
    'parameters': Parameters
    'body': p_.Optional_Value<Block>
    'semicolon': Optional_Semi_Colon
}

export type Class_Body__Member__Get_Accessor = {
    'jsdoc': JSDoc
    // 'modifiers': Modifiers
    'get keyword': d_ast.Keyword
    'name': Property_Name
    'parameters': Parameters
    'return type': Return_Type_Annotation
    'body': p_.Optional_Value<Block>
    'semicolon': Optional_Semi_Colon
}

export type Class_Body__Member__Method = {
    'jsdoc': JSDoc
    'modifiers': Signature_Modifiers
    // 'asterisk token': p_.Optional_Value<d_ast.Keyword>
    'name': Property_Name
    'type parameters': Type_Parameters
    'parameters': Parameters
    'return type': Return_Type_Annotation
    'body': p_.Optional_Value<Block>
    'semicolon': Optional_Semi_Colon
}

export type Class_Body__Member__Property = {
    'jsdoc': JSDoc
    'modifiers': Signature_Modifiers
    'name': Property_Name
    // 'question token': p_.Optional_Value<d_ast.Keyword>
    'type': Optional_Type
    'optional initializer': Optional_Initializer
    'semicolon': Optional_Semi_Colon
}

export type Class_Body__Member__Set_Accessor = {
    'jsdoc': JSDoc
    // 'modifiers': Modifiers
    'set keyword': d_ast.Keyword
    'name': Property_Name
    'parameters': Parameters
    'return type': Return_Type_Annotation
    'body': p_.Optional_Value<Block>
    'semicolon': Optional_Semi_Colon
}

export type Class_Member_Modifiers = p_.Optional_Value<p_.List<Class_Member_Modifiers__L>>

export type Class_Member_Modifiers__L =
    | ['abstract', d_ast.Keyword]
    | ['declare', d_ast.Keyword]
    | ['override', d_ast.Keyword]
    | ['private', d_ast.Keyword]
    | ['protected', d_ast.Keyword]
    | ['public', d_ast.Keyword]
    | ['readonly', d_ast.Keyword]
    | ['static', d_ast.Keyword]

export type Entity_Name =
    | ['identifier', Identifier]
    | ['qualified name', Qualified_Name]

export type Expression =
    | ['array literal', Expression__Array_Literal]
    | ['arrow function', Expression__Arrow_Function]
    | ['assertion', Expression__Assertion]
    | ['as expression', Expression__As]
    | ['await', Expression__Await]
    | ['big int literal', d_ast.Node]
    | ['binary', Expression__Binary]
    | ['call', Expression__Call]
    | ['class', Class]
    | ['conditional', Expression__Conditional]
    | ['delete', Expression__Delete]
    | ['element access', {
        'expression': Expression
        'open bracket token': d_ast.Keyword
        'argument expression': Expression
        'close bracket token': d_ast.Keyword
    }]
    | ['external module reference', {
        'require keyword': d_ast.Keyword
        'open parenthesis token': d_ast.Keyword
        'module name': String_Literal
        'close parenthesis token': d_ast.Keyword
    }]
    | ['false', d_ast.Keyword]
    | ['function', Expression__Function]
    | ['identifier', Identifier]
    | ['import keyword', d_ast.Keyword]
    | ['jsdoc', d_ast.Node]
    | ['meta property', {
        'new keyword': d_ast.Keyword
        'dot token': d_ast.Keyword
        'identifier': Identifier
    }]
    | ['new', {
        'new keyword': d_ast.Keyword
        'expression': Expression
        'arguments': Arguments
    }]
    | ['no substitution template literal', d_ast.Node]
    | ['non null', {
        'expression': Expression
        'exclamation token': d_ast.Keyword
    }]
    | ['null keyword', d_ast.Keyword]
    | ['numeric literal', d_ast.Node]
    | ['object literal', Expression__Object_Literal]
    | ['parenthesized', {
        'open parenthesis token': d_ast.Keyword
        'expression': Expression
        'close parenthesis token': d_ast.Keyword
    }]
    | ['postfix unary', {
        'operand': Expression
        'operator token':
        | ['--', d_ast.Keyword]
        | ['++', d_ast.Keyword]
    }]

    | ['prefix unary', {
        'operator token':
        | ['!', d_ast.Keyword]
        | ['-', d_ast.Keyword]
        | ['+', d_ast.Keyword]
        | ['++', d_ast.Keyword]
        'operand': Expression
    }]
    | ['property access', Expression__Property_Access]
    | ['regular expression literal', d_ast.Node]
    | ['string literal', String_Literal]
    | ['template', Expression__Template]
    | ['this', d_ast.Keyword]
    | ['true keyword', d_ast.Keyword]
    | ['type of', {
        'type of keyword': d_ast.Keyword
        'expression': Expression
    }]
    | ['void', {
        'void keyword': d_ast.Keyword
    }]
    | ['with type arguments', Expression_With_Type_Arguments]

export type Expression__Array_Literal = {
    'open bracket token': d_ast.Keyword
    'elements': h.Separated_List<Expression>
    'close bracket token': d_ast.Keyword
}

export type Expression__Arrow_Function = {
    //clashes with 'parameters'
    // 'modifiers': p_.Optional_Value<p_.List<
    //     ['async', d_ast.Keyword]
    // >>
    'type parameters': Type_Parameters
    'parameters': Expression__Arrow_Function_Parameters
    'type': Optional_Type
    'equals greater than token': d_ast.Keyword
    'body':
    | ['block', Block]
    | ['expression', Expression]
}

export type Expression__Assertion = {
    'less than token': d_ast.Keyword
    'type': Type
    'greater than token': d_ast.Keyword
    'expression': Expression
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

export type Expression__As = {
    'expression': Expression
    'as keyword': d_ast.Keyword
    'type': Type
}

export type Expression__Await = {
    'await keyword': d_ast.Keyword
    'expression': Expression
}

export type Expression__Binary = {
    'left': Expression
    'operator token':
    | ['^', d_ast.Keyword]
    | ['^=', d_ast.Keyword]
    | ['-', d_ast.Keyword]
    | ['-=', d_ast.Keyword]
    | ['!=', d_ast.Keyword]
    | ['!==', d_ast.Keyword]
    | ['??', d_ast.Keyword]
    | ['??=', d_ast.Keyword]
    | ['*', d_ast.Keyword]
    | ['**', d_ast.Keyword]
    | ['**=', d_ast.Keyword]
    | ['*=', d_ast.Keyword]
    | ['/', d_ast.Keyword]
    | ['/=', d_ast.Keyword]
    | ['&', d_ast.Keyword]
    | ['&=', d_ast.Keyword]
    | ['&&', d_ast.Keyword]
    | ['&&=', d_ast.Keyword]
    | ['%', d_ast.Keyword]
    | ['+', d_ast.Keyword]
    | ['+=', d_ast.Keyword]
    | ['<', d_ast.Keyword]
    | ['<<', d_ast.Keyword]
    | ['<<=', d_ast.Keyword]
    | ['<=', d_ast.Keyword]
    | ['=', d_ast.Keyword]
    | ['==', d_ast.Keyword]
    | ['===', d_ast.Keyword]
    | ['>', d_ast.Keyword]
    | ['>=', d_ast.Keyword]
    | ['>>', d_ast.Keyword]
    | ['>>=', d_ast.Keyword]
    | ['>>>=', d_ast.Keyword]
    | ['>>>', d_ast.Keyword]
    | ['|', d_ast.Keyword]
    | ['|=', d_ast.Keyword]
    | ['||', d_ast.Keyword]
    | ['||=', d_ast.Keyword]
    | ['in', d_ast.Keyword]
    | ['instanceof', d_ast.Keyword]
    'right': Expression
}

export type Expression__Call = {
    'callee':
    | ['import', d_ast.Keyword]
    | ['expression', Expression] //the normal case, e.g. `foo()`
    | ['super', d_ast.Keyword]
    'type arguments': Type_Arguments
    'arguments': Arguments
}

export type Expression__Conditional = {
    'condition': Expression
    'question token': d_ast.Keyword
    'when true': Expression
    'colon token': d_ast.Keyword
    'when false': Expression
}

export type Expression__Delete = {
    'delete keyword': d_ast.Keyword
    'expression': Expression
}

export type Expression__Function = {
    jsdoc: JSDoc
    'modifiers': p_.Optional_Value<p_di.List<
        | ['async', d_ast.Keyword]
    >>
    'function keyword': d_ast.Keyword
    'parameters': Parameters
    'body': Block
}

export type Expression__Object_Literal = {
    'open brace token': d_ast.Keyword
    'properties': h.Separated_List<Expression__Object_Literal__Property>
    'close brace token': d_ast.Keyword
}

export type Expression__Object_Literal__Property =
    | ['property', Expression__Object_Literal__Property__Assignment]
    | ['shorthand property', {
        'name': Identifier
    }]
    | ['method', Expression__Object_Literal__Property__Method]

export type Expression__Object_Literal__Property__Assignment = {
    'jsdoc': JSDoc
    'name': Property_Name
    'colon token': d_ast.Keyword
    'initializer': Expression
}

export type Expression__Object_Literal__Property__Method = {
    'name': Property_Name
    'type parameters': Type_Parameters
    'parameters': Parameters
    'return type': Return_Type_Annotation
    'body': Block
}

export type Expression__Property_Access = {
    'expression': Expression
    'dot token':
    | ['.', d_ast.Keyword]
    | ['?.', d_ast.Keyword]
    'identifier':
    | ['named', Identifier]
    | ['private', Identifier]
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

export type Expression_With_Type_Arguments = {
    'expression': Expression
    'type arguments': Type_Arguments
}

export type Heritage = p_.Optional_Value<p_.List<Heritage__Clause>>

export type Heritage__Clause = {
    'extends or implements keyword':
    | ['extends', d_ast.Keyword]
    | ['implements', d_ast.Keyword]
    'types': h.Separated_List<Expression_With_Type_Arguments>
}

export type Identifier = d_ast.Node

export type Import_Specifier = {
    'type keyword': p_.Optional_Value<d_ast.Keyword>
    'identifier': Identifier
    'as': p_.Optional_Value<{
        'as keyword': d_ast.Keyword
        'identifier': Identifier
    }>
}

export type Initializer = {
    'equals token': d_ast.Keyword
    'expression': Expression
}

export type JSDoc = p_.Optional_Value<d_ast.Node>

export type Numeric_Literal = d_ast.Node

export type Object_Type = {
    'open brace token': d_ast.Keyword
    'signatures': p_.List<Object_Type__Signature>
    'close brace token': d_ast.Keyword
}

export type Object_Type__Signature =
    | ['call', Object_Type__Signature__Call]
    | ['construct', Object_Type__Signature__Construct]
    | ['index', Object_Type__Signature__Index]
    | ['method', Object_Type__Signature__Method]
    | ['property', Object_Type__Signature__Property]

export type Object_Type__Signature__Call = {
    'jsdoc': JSDoc
    'parameters': Parameters
    'type': Optional_Type
    'semicolon': Optional_Semi_Colon
}

export type Object_Type__Signature__Construct = {
    'jsdoc': JSDoc
    'new keyword': d_ast.Keyword
    'parameters': Parameters
    'type': Optional_Type
    'semicolon': Optional_Semi_Colon
}

export type Object_Type__Signature__Index = {
    'jsdoc': JSDoc
    'modifiers': Signature_Modifiers
    'open bracket token': d_ast.Keyword
    'parameter': {
        'identifier': Identifier
        'colon token': d_ast.Keyword
        'type': Type //this is too broad, only certain types are allowed; string, number, symbol, template literal, union of those (not fully sure if there's more)
    }
    'close bracket token': d_ast.Keyword
    'colon token': d_ast.Keyword
    'type': Type
    'semicolon': Optional_Semi_Colon
}

export type Object_Type__Signature__Method = {
    'jsdoc': JSDoc
    'identifier': Identifier
    'question token': p_.Optional_Value<d_ast.Keyword>
    'type parameters': Type_Parameters
    'parameters': Parameters
    'return type': Return_Type_Annotation
    'semicolon': Optional_Semi_Colon
    'comma': Optional_Comma
}

export type Object_Type__Signature__Property = {
    'jsdoc': JSDoc
    'modifiers': Signature_Modifiers
    'id': Property_Name
    'question token': p_.Optional_Value<d_ast.Keyword>
    'colon token': d_ast.Keyword
    'type': Type
    'comma token': p_.Optional_Value<d_ast.Keyword>
    'semicolon token': Optional_Semi_Colon
}

export type Optional_Initializer = p_.Optional_Value<Initializer>

export type Optional_Type = p_.Optional_Value<{
    'colon token': d_ast.Keyword
    'type': Type
}>

export type Parameters = {
    'jsdoc': JSDoc
    'open parenthesis token': d_ast.Keyword
    'entries': h.Separated_List<Parameters__Parameter>
    'close parenthesis token': d_ast.Keyword
}

export type Parameters__Parameter = {
    'jsdoc': JSDoc

    // 'modifiers': p_.Optional_Value<p_.List<Parameters__Parameter__Modifier>>
    'dot dot dot token': p_.Optional_Value<d_ast.Keyword>
    'name': Binding_Pattern
    'question token': p_.Optional_Value<d_ast.Keyword>
    'type': Optional_Type
    'initializer': p_.Optional_Value<Initializer>
}

export type Parameter__Modifier =
    | ['private', d_ast.Keyword]
    | ['public', d_ast.Keyword]
    | ['protected', d_ast.Keyword]
    | ['readonly', d_ast.Keyword]

export type Property_Name = {
    'jsdoc': JSDoc
    'type':
    | ['computed', Property_Name__Computed]
    | ['identifier', Identifier]
    | ['numeric literal', Numeric_Literal]
    | ['string literal', String_Literal]
}

export type Property_Name__Computed = {
    'open bracket token': d_ast.Keyword
    'expression': Expression
    'close bracket token': d_ast.Keyword
}

export type Qualified_Name = {
    'first': Entity_Name
    'dot token': d_ast.Keyword
    'second': Identifier
}

export type Return_Type_Annotation = p_.Optional_Value<{
    'colon token': d_ast.Keyword
    'kind':
    | ['type', Type]
    | ['type predicate', {
        'identifier': Identifier
        'is keyword': d_ast.Keyword
        'type': Type
    }]
}>

export type Signature_Modifiers = p_.Optional_Value<p_.List<Signature_Modifiers__L>>

export type Signature_Modifiers__L =

    | ['accessor', d_ast.Keyword]
    | ['async', d_ast.Keyword]
    | ['const', d_ast.Keyword]
    | ['declare', d_ast.Keyword]
    | ['export', d_ast.Keyword]
    | ['override', d_ast.Keyword]
    | ['protected', d_ast.Keyword]
    | ['static', d_ast.Keyword]
    | ['abstract', d_ast.Keyword]
    | ['decorator', d_ast.Keyword]
    | ['private', d_ast.Keyword]
    | ['public', d_ast.Keyword]
    | ['readonly', d_ast.Keyword]

export type Optional_Semi_Colon = p_.Optional_Value<d_ast.Keyword>
export type Optional_Comma = p_.Optional_Value<d_ast.Keyword>

export type Source_File = {
    'statements': Statements
    'end of file': null
}

export type Statement =
    | ['block', Block]
    | ['break', {
        'jsdoc': JSDoc
        'break keyword': d_ast.Keyword
        'identifier': p_.Optional_Value<Identifier>
        'semicolon': Optional_Semi_Colon
    }]
    | ['class', Statement__Class_Declaration]
    | ['continue', {
        'jsdoc': JSDoc
        'continue keyword': d_ast.Keyword
        'label': p_.Optional_Value<Identifier>
        'semicolon': Optional_Semi_Colon
    }]
    | ['do', Statement__Do]
    | ['empty', Statement__Empty]
    | ['enum', Statement__Enum_Declaration]
    | ['export assignment', {
        'jsdoc': JSDoc
        'export keyword': d_ast.Keyword
        'initializer': Initializer
        'semicolon': Optional_Semi_Colon
    }]
    | ['export declaration', Statement__Export_Declaration]
    | ['expression', Statement__Expression]
    | ['for', Statement__For]
    | ['for in', Statement__For_In]
    | ['for of', Statement__For_Of]
    | ['function', Statement__Function_Declaration]
    | ['if', Statement__If]
    | ['import', Statement__Import_Declaration]
    | ['import equals', {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'import keyword': d_ast.Keyword
        'identifier': Identifier
        'initializer': Initializer
        'semicolon': Optional_Semi_Colon
    }]
    | ['interface', Statement__Interface]
    | ['labeled', Statement__Labeled]
    | ['module', Statement__Module_Declaration]
    | ['namespace export', Statement__Namespace_Export]
    | ['return', {
        'jsdoc': JSDoc
        'return keyword': d_ast.Keyword
        'expression': p_.Optional_Value<Expression>
        'semicolon': Optional_Semi_Colon
    }]
    | ['switch', Statement__Switch]
    | ['throw', {
        'jsdoc': JSDoc
        'throw keyword': d_ast.Keyword
        'expression': Expression
        'semicolon': Optional_Semi_Colon
    }]
    | ['try', Statement__Try]
    | ['type alias', Statement__Type_Alias_Declaration]
    | ['variable', Statement__Variable]
    | ['while', {
        'while keyword': d_ast.Keyword
        'open parenthesis token': d_ast.Keyword
        'expression': Expression
        'close parenthesis token': d_ast.Keyword
        'statement': Statement
    }]

export type Statement__Class_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Statement_Modifiers
    'class': Class
    'semicolon': Optional_Semi_Colon
}

export type Statement__Do = {
    'jsdoc': JSDoc
    'do keyword': d_ast.Keyword
    'statement': Statement
    'while keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'expression': Expression
    'close parenthesis token': d_ast.Keyword
    'semicolon': Optional_Semi_Colon
}

export type Statement__Empty = {
    'semicolon token': d_ast.Keyword
}

export type Statement__Enum_Declaration = {
    'jsdoc': JSDoc
    'modifiers': p_.Optional_Value<p_.List<
        | ['async', d_ast.Keyword]
        | ['decorator', d_ast.Keyword]
        | ['const', d_ast.Keyword]
        | ['declare', d_ast.Keyword]
        | ['default', d_ast.Keyword]
        | ['export', d_ast.Keyword]
    >>
    'enum keyword': d_ast.Keyword
    'identifier': Identifier
    'open brace token': d_ast.Keyword
    'members': h.Separated_List<Statement__Enum_Declaration__Member>
    'close brace token': d_ast.Keyword
    'semicolon': Optional_Semi_Colon
}

export type Statement__Enum_Declaration__Member = {
    'jsdoc': JSDoc
    'name': Property_Name
    'initializer': Optional_Initializer
    // 'comma token': p_.Optional_Value<d_ast.Keyword>
}

export type Statement__Export_Declaration = {
    'jsdoc': JSDoc
    'export keyword': d_ast.Keyword
    'type keyword': p_.Optional_Value<d_ast.Keyword>
    'type':
    | ['all', {
        'asterisk token': d_ast.Keyword
        'as': p_.Optional_Value<{
            'as keyword': d_ast.Keyword
            'identifier': Identifier
        }>
    }]
    | ['named', {
        'open brace token': d_ast.Keyword
        'exports': h.Separated_List<Statement__Export_Declaration_Entry>
        'close brace token': d_ast.Keyword
    }]
    | ['namespace', {
        'asterisk token': d_ast.Keyword
        'as keyword': d_ast.Keyword
        'identifier': Identifier
    }]
    'from clause': p_.Optional_Value<{
        'from keyword': d_ast.Keyword
        'string literal': String_Literal
    }>
    'semicolon': Optional_Semi_Colon
}

export type Statement__Expression = {
    'jsdoc': JSDoc
    'expression': Expression
    'semicolon': Optional_Semi_Colon
}

export type Statement__Export_Declaration_Entry = {
    'identifier': Identifier
    'as': p_.Optional_Value<{
        'as keyword': d_ast.Keyword
        'identifier': Identifier
    }>
}

export type Statement__For = {
    'jsdoc': JSDoc
    'for keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'initializer':
    | ['variable declaration list', Variable_Declaration_List]
    | ['expression', Expression]
    // | ['empty', d_ast.Keyword]
    'semicolon token': d_ast.Keyword
    'condition': p_.Optional_Value<Expression>
    'semicolon token 2': d_ast.Keyword
    'incrementor': p_.Optional_Value<Expression>
    'close parenthesis token': d_ast.Keyword
    'statement': Statement
    'semicolon': Optional_Semi_Colon
}

export type Statement__For_In = {
    'for keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'variable declaration list': Variable_Declaration_List
    'in keyword': d_ast.Keyword
    'expression': Expression
    'close parenthesis token': d_ast.Keyword
    'statement': Statement
    'semicolon': Optional_Semi_Colon
}

export type Statement__For_Of = {
    'for keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'variable declaration list': Variable_Declaration_List
    'of keyword': d_ast.Keyword
    'expression': Expression
    'close parenthesis token': d_ast.Keyword
    'statement': Statement
    'semicolon': Optional_Semi_Colon
}

export type Statement__Function_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Statement_Modifiers
    'function keyword': d_ast.Keyword
    'identifier': Identifier
    'type parameters': Type_Parameters
    'parameters': Parameters
    'return type annotation': Return_Type_Annotation //FIXME Return Type_Annotation
    'body': p_.Optional_Value<Block>
    'semicolon': Optional_Semi_Colon
}

export type Statement__If = {
    'if keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'expression': Expression
    'close parenthesis token': d_ast.Keyword
    'then statement': Statement
    'else': p_.Optional_Value<{
        'else keyword': d_ast.Keyword
        'statement': Statement
    }>
    'semicolon': Optional_Semi_Colon
}

export type Statement__Import_Declaration = {
    'jsdoc': JSDoc
    'import keyword': d_ast.Keyword
    'clause': Statement__Import_Clause
    'from keyword': d_ast.Keyword
    'string literal': String_Literal
    'semicolon': Optional_Semi_Colon
}

export type Statement__Import_Clause = {
    'type':
    | ['named imports', Statement__Import__Named_Imports]
    | ['namespace import', Statement__Import__Namespace]
    | ['identifier', Identifier]
}

export type Statement__Import__Namespace = {
    'asterisk token': d_ast.Keyword
    'as keyword': d_ast.Keyword
    'identifier': Identifier
}

export type Statement__Import__Named_Imports = {
    'open brace token': d_ast.Keyword
    'entries': h.Separated_List<Import_Specifier>
    'close brace token': d_ast.Keyword
}


export type Statement__Interface = {
    'jsdoc': JSDoc
    'modifiers': Statement_Modifiers
    'interface keyword': d_ast.Keyword
    'identifier': Identifier
    'type parameters': Type_Parameters
    'heritage': Heritage
    'body': Object_Type
    // 'heritage clauses': p_.Optional_Value<p_.List<Heritage_Clause>>
    // 'body': Type_Literal
    'semicolon': Optional_Semi_Colon
}

export type Statement__Labeled = {
    'jsdoc': JSDoc
    'identifier': Identifier
    'colon token': d_ast.Keyword
    'statement': Statement
}

export type Statement__Module_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Statement_Modifiers
    'type':
    | ['module', Statement__Module_Declaration__Module]
    | ['namespace', {
        'keyword': d_ast.Keyword
        'name': Identifier
    }]
    'block': Statement__Module_Declaration__Block
    'semicolon': Optional_Semi_Colon
}

export type Statement__Module_Declaration__Module = {
    'keyword': d_ast.Keyword
    'name': Property_Name
}

export type Statement__Module_Declaration__Block = { //FIXME; is this different from 'Block'?
    'open brace token': d_ast.Keyword
    'statements': Statements
    'close brace token': d_ast.Keyword
}

export type Statement__Namespace_Export = {
    'jsdoc': JSDoc
    'export keyword': d_ast.Keyword
    'as keyword': d_ast.Keyword
    'namespace keyword': d_ast.Keyword
    'identifier': Identifier
    'semicolon': Optional_Semi_Colon
}


export type Statement__Switch = {
    'jsdoc': JSDoc
    'switch keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'expression': Expression
    'close parenthesis token': d_ast.Keyword
    'case block': {
        'open brace token': d_ast.Keyword
        'clauses': p_.List<Statement__Switch_Case_Clause>
        'close brace token': d_ast.Keyword
    }
    'semicolon': Optional_Semi_Colon
}

export type Statement__Switch_Case_Clause =
    | ['case', {
        'case keyword': d_ast.Keyword
        'expression': Expression
        'colon token': d_ast.Keyword
        'statements': Statements
    }]
    | ['default', {
        'default keyword': d_ast.Keyword
        'colon token': d_ast.Keyword
        'statements': Statements
    }]

export type Statement__Try = {
    'jsdoc': JSDoc
    'try keyword': d_ast.Keyword
    'try block': Block
    'catch clause': p_.Optional_Value<Statement__Try__Catch_Clause>
    'finally block': p_.Optional_Value<{
        'finally keyword': d_ast.Keyword
        'block': Block
    }>
    'semicolon': Optional_Semi_Colon
}

export type Statement__Try__Catch_Clause = {
    'catch keyword': d_ast.Keyword
    'open parenthesis token': d_ast.Keyword
    'variable declaration': Variable_Declaration
    'close parenthesis token': d_ast.Keyword
    'block': Block
}

export type Statement__Type_Alias_Declaration = {
    'jsdoc': JSDoc
    'modifiers': Statement_Modifiers
    'type keyword': d_ast.Keyword
    'identifier': Identifier
    'type parameters': Type_Parameters
    'equals token': d_ast.Keyword
    'type': Type
    'semicolon': Optional_Semi_Colon
}

export type Statement__Variable = {
    'jsdoc': JSDoc
    'modifiers': Statement_Modifiers
    'variable declaration list': Variable_Declaration_List
    'semicolon': Optional_Semi_Colon
}

export type Statements = p_.List<Statement>

export type Statement_Modifiers = p_.Optional_Value<p_.List<Statement_Modifiers__L>>

export type Statement_Modifiers__L =
    | ['abstract', d_ast.Keyword]
    | ['async', d_ast.Keyword]
    | ['declare', d_ast.Keyword]
    | ['decorator', d_ast.Keyword]
    | ['default', d_ast.Keyword]
    | ['export', d_ast.Keyword]
    | ['protected', d_ast.Keyword]
    | ['public', d_ast.Keyword]
    | ['static', d_ast.Keyword]

export type String_Literal = d_ast.Node

export type Type =
    | ['any', d_ast.Keyword]
    | ['array', Type__Array]
    | ['big int', d_ast.Keyword]
    | ['boolean', d_ast.Keyword]
    | ['conditional', Type__Conditional]
    | ['constructor', Type__Constructor]
    | ['function', Type__Function_Type]
    | ['indexed access', Type__Indexed_Access]
    | ['infer', Type__Infer]
    | ['intersection', Type__Intersection]
    | ['jsdoc all', Type__JSDoc_All]
    | ['jsdoc function', Type__JSDoc_Function]
    | ['jsdoc non nullable', Type__JSDoc_Non_Nullable]
    | ['jsdoc nullable', Type__JSDoc_Nullable]
    | ['jsdoc unknown', Type__JSDoc_Unknown]
    | ['literal type', Type__Literal]
    | ['mapped', Type__Mapped]
    | ['never', d_ast.Keyword]
    | ['number', d_ast.Keyword]
    | ['object', d_ast.Keyword]
    | ['parenthesized', Type__Parenthesized]
    | ['query', Type__Query]
    | ['string', d_ast.Keyword]
    | ['symbol', d_ast.Keyword]
    | ['tuple type', Type__Tuple]
    | ['type literal', Object_Type]
    | ['type operator', Type__Type_Operator]
    | ['type reference', Type__Type_Reference]
    | ['union type', Type__Union]
    | ['undefined', d_ast.Keyword]
    | ['unknown', d_ast.Keyword]
    | ['void', d_ast.Keyword]

export type Type__Array = {
    'element type': Type
    'open bracket token': d_ast.Keyword
    'close bracket token': d_ast.Keyword
}

export type Type__Conditional = {
    'check type': Type
    'extends keyword': d_ast.Keyword
    'extends type': Type
    'question token': d_ast.Keyword
    'true type': Type
    'colon token': d_ast.Keyword
    'false type': Type
}

export type Type__Constructor = {
    'new keyword': d_ast.Keyword
    // 'type parameters': Type_Parameters
    'parameters': Parameters
    'equals greater than token': d_ast.Keyword
    'type': Type
}

export type Type__Function_Type = {
    'type parameters': Type_Parameters
    'parameters': Parameters
    'type': Optional_Type
    'equals greater than token': d_ast.Keyword
    'return type': Type
}

export type Type__Indexed_Access = {
    'object type': Type
    'open bracket token': d_ast.Keyword
    'index type': Type
    'close bracket token': d_ast.Keyword
}

export type Type__Infer = {
    'infer keyword': d_ast.Keyword
    'identifier': Identifier
    'extends': p_.Optional_Value<{
        'extends keyword': d_ast.Keyword
        'type': Type
    }>
}

export type Type__Intersection = h.Separated_List<Type>
export type Type__JSDoc_All = {
    'asterisk token': d_ast.Keyword
}

export type Type__JSDoc_Function = {
    'function keyword': d_ast.Keyword
    'parameters': Parameters
    'type': Optional_Type
}

export type Type__JSDoc_Non_Nullable = {
    'exclamation token before': p_.Optional_Value<d_ast.Keyword>
    'type': Type
    'exclamation token after': p_.Optional_Value<d_ast.Keyword>
}

export type Type__JSDoc_Nullable = {
    'question token before': p_.Optional_Value<d_ast.Keyword>
    'type': Type
    'question token after': p_.Optional_Value<d_ast.Keyword>
}

export type Type__JSDoc_Unknown = {
    'question token': d_ast.Keyword
}

export type Type__Literal = {
    'type':
    | ['false keyword', d_ast.Keyword]
    | ['null', d_ast.Keyword]
    | ['numeric literal', Numeric_Literal]
    | ['string literal', String_Literal]
    | ['true keyword', d_ast.Keyword]
}

export type Type__Mapped = {
    'open brace token': d_ast.Keyword
    // 'readonly keyword': p_.Optional_Value<d_ast.Keyword>
    'open bracket token': d_ast.Keyword
    'type parameter': {
        'identifier': Identifier
        'in keyword': d_ast.Keyword
        'constraint': Type  // the 'in X' part, always required in mapped types
        'as': p_.Optional_Value<{   // the 'as X' remapping clause
            'as keyword': d_ast.Keyword
            'type': Type
        }>
    }
    'close bracket token': d_ast.Keyword
    'colon token': d_ast.Keyword
    'type': Type
    'semicolon': Optional_Semi_Colon
    'dummy syntax list': d_ast.Keyword // I have no idea why there is a SyntaxList. The instance I saw was empty
    'close brace token': d_ast.Keyword
}

export type Type__Parenthesized = {
    'open parenthesis token': d_ast.Keyword
    'type': Type
    'close parenthesis token': d_ast.Keyword
}

export type Type__Query = {
    'typeof keyword': d_ast.Keyword
    'name': Entity_Name
}

export type Type__Union = {
    'members': h.Separated_List<Type>
}

export type Type__Tuple = {
    readonly 'open bracket token': d_ast.Keyword
    'elements': h.Separated_List<Type__Tuple__Element>
    'close bracket token': d_ast.Keyword
}

export type Type__Tuple__Element = 
| ['named', {
    'name': Identifier
    'colon token': d_ast.Keyword
    'type': Type
}]
| ['regular', Type]

export type Type__Type_Operator = {
    'operator':
    | ['key of', d_ast.Keyword]
    | ['unique', d_ast.Keyword]
    | ['readonly', d_ast.Keyword]
    'type': Type
}

export type Type__Type_Reference = {
    'entity name': Entity_Name
    'dot token': p_.Optional_Value<d_ast.Keyword>
    'type arguments': Type_Arguments
}

export type Type_Arguments = p_.Optional_Value<{
    'less than token': d_ast.Keyword
    'entries': h.Separated_List<Type>
    'greater than token': d_ast.Keyword
}>

export type Type_Parameters = p_.Optional_Value<{
    'less than token': d_ast.Keyword
    'entries': h.Separated_List<Type__Parameters__L>
    'greater than token': d_ast.Keyword
}>

export type Type__Parameters__L = {
    'identifier': Identifier
    'extends': p_.Optional_Value<{
        'extends keyword': d_ast.Keyword
        'type': Type
    }>
    'default': p_.Optional_Value<{
        'equals token': d_ast.Keyword
        'type': Type
    }>
}

export type Variable_Declaration = {
    'name': Binding_Pattern
    'exclamation token': p_.Optional_Value<d_ast.Keyword>
    'type': Optional_Type
    'assignment': p_.Optional_Value<{
        'initializer': Initializer
    }>
}

export type Variable_Declaration_List = {
    'mutability':
    | ['await using', Variable_Declaration_List__Mutability__Await_Using]
    | ['const', d_ast.Keyword]
    | ['let', d_ast.Keyword]
    | ['using', d_ast.Keyword]
    | ['var', d_ast.Keyword]
    'declarations': p_.List<Variable_Declaration>
}

export type Variable_Declaration_List__Mutability__Await_Using = {
    'await keyword': d_ast.Keyword
    'using keyword': d_ast.Keyword
}