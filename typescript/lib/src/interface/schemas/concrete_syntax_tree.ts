import * as p_ from 'pareto-core/interface/data'
import * as p_di from 'pareto-core/interface/data'

import type * as s_primitives from "./primitives.js"

import * as h from "../../implementation/to_be_generated/temp_helper_types.js"

export type Arguments = {
    'question dot token': p_.Optional_Value<s_primitives.Keyword>
    'type arguments': Type_Arguments
    'error recovery': Error_Recovery
    'open parenthesis token': s_primitives.Keyword
    'arguments': Separated_List<Arguments.L>
    'close parenthesis token': s_primitives.Keyword
}

export namespace Arguments {
    export type L =
        ['expression', Expression]
        | ['spread', {
            'dot dot dot token': s_primitives.Keyword
            'expression': Expression
        }]
}

export type As_Alias = {
    'as keyword': s_primitives.Keyword
    'identifier':
    | ['identifier', Identifier]
    | ['string literal', String_Literal]
}

export type Binding_Pattern = {
    'jsdoc': JSDoc
    'modifiers': p_.Optional_Value<p_.List< //seems very similar to the signature modifiers, but not exactly the same I guess
        | ['async', s_primitives.Keyword]
        | ['declare', s_primitives.Keyword]
        | ['decorator', {
            'at token': s_primitives.Keyword
            'expression': Expression
        }]
        | ['export', s_primitives.Keyword]
        | ['override', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        | ['static', s_primitives.Keyword]
    >>
    'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
    'type':
    | ['array binding pattern', Binding_Pattern.Array]
    | ['identifier', Identifier]
    | ['number keyword', s_primitives.Keyword]
    | ['object binding pattern', Binding_Pattern.Object]
    | ['string keyword', s_primitives.Keyword]
}

export namespace Binding_Pattern {
    export type Array = {
        'open bracket token': s_primitives.Keyword
        'elements': h.Separated_List<Array.Element>
        'close bracket token': s_primitives.Keyword
    }
    export namespace Array {
        export type Element =
            | ['binding element', {
                'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
                'name': Binding_Pattern
                'initializer': Optional_Initializer
            }]
            | ['omitted expression', null] //synthetic node, used for array destructuring, e.g. [,,a] = [1,2,3]
    }
    export type Object = {
        'open brace token': s_primitives.Keyword
        'elements': h.Separated_List<Object.Element>
        'close brace token': s_primitives.Keyword
    }
    export namespace Object {
        export type Element = {
            'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
            'property name': Property_Name
            'binding': p_.Optional_Value<{
                'colon token': s_primitives.Keyword
                'pattern': Binding_Pattern
            }>
            'initializer': Optional_Initializer
        }
    }
}

export type Block = {
    'jsdoc': JSDoc
    'open brace token': s_primitives.Keyword
    'statements': Statements
    'close brace token': s_primitives.Keyword
}

export type Class = {
    'jsdoc': JSDoc
    'modifiers': p_.Optional_Value<p_.List<
        | ['abstract', s_primitives.Keyword]
        | ['declare', s_primitives.Keyword]
        | ['decorator', {
            'at token': s_primitives.Keyword
            'expression': Expression
        }]
    >>
    'class keyword': s_primitives.Keyword
    'identifier': p_.Optional_Value<Identifier>
    'type parameters': Type_Parameters
    'heritage': Heritage
    'body': Class_Body
}

export type Class_Body = {
    'open brace token': s_primitives.Keyword
    'members': p_.List<Class_Body.Member>
    'close brace token': s_primitives.Keyword
}

export namespace Class_Body {
    export type Member =
        | ['constructor', Member.Constructor]
        | ['get accessor', Member.Get_Accessor]
        | ['index signature', Object_Type.Signature.Index]
        | ['method', Member.Method]
        | ['property', Member.Property]
        | ['semicolon element', { 'jsdoc': JSDoc }]
        | ['set accessor', Member.Set_Accessor]
        | ['static block', Member.Static_Block]
    export namespace Member {
        export type Constructor = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'constructor keyword':
            | ['constructor keyword', s_primitives.Keyword]
            | ['constructor keyword as string literal', s_primitives.Keyword]
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
        }
        export type Get_Accessor = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'get keyword': s_primitives.Keyword
            'name': Property_Name
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
        }
        export type Method = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'asterisk token': p_.Optional_Value<s_primitives.Keyword>
            'name': Property_Name
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
        }
        export type Property = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'name': Property_Name
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'exclamation token': p_.Optional_Value<s_primitives.Keyword>
            'type': Optional_Type
            'initializer': Optional_Initializer
            'semicolon': Semi_Colon
        }
        export type Set_Accessor = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'set keyword': s_primitives.Keyword
            'name': Property_Name
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
        }
        export type Static_Block = {
            'modifiers': Statement_Modifiers
            'static keyword': s_primitives.Keyword
            'body': Block
        }
    }
}

export type Entity_Name =
    | ['identifier', Identifier]
    | ['qualified name', Qualified_Name]

export type Error_Recovery = p_.Optional_Value<{
    'entries': Separated_List<Type>
    'greater than token': p_.Optional_Value<s_primitives.Keyword>
}>

export type Expression =
    | ['array literal', Expression.Array_Literal]
    | ['arrow function', Expression.Arrow_Function]
    | ['assertion', Expression.Assertion]
    | ['as expression', Expression.As]
    | ['await', Expression.Await]
    | ['big int literal', s_primitives.Literal]
    | ['binary', Expression.Binary]
    | ['call', Expression.Call]
    | ['class', Class]
    | ['conditional', Expression.Conditional]
    | ['delete', Expression.Delete]
    | ['element access', {
        'expression': Expression
        'question dot token': p_.Optional_Value<s_primitives.Keyword>
        'open bracket token': s_primitives.Keyword
        'argument expression': Expression
        'close bracket token': s_primitives.Keyword
    }]
    | ['external module reference', {
        'require keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'module name': String_Literal
        'close parenthesis token': s_primitives.Keyword
    }]
    | ['false', s_primitives.Keyword]
    | ['function', Expression.Function]
    | ['identifier', Identifier]
    | ['import keyword', s_primitives.Keyword]
    | ['jsdoc', s_primitives.Blob]
    | ['meta property', Expression.Meta_Property]
    | ['new', {
        'new keyword': s_primitives.Keyword
        'expression': Expression
        'arguments': p_.Optional_Value<Arguments>
    }]
    | ['no substitution template literal', s_primitives.Literal]
    | ['non null', {
        'expression': Expression
        'exclamation token': s_primitives.Keyword
    }]
    | ['null keyword', s_primitives.Keyword]
    | ['numeric literal', s_primitives.Literal]
    | ['object literal', Expression.Object_Literal]
    | ['omitted expression', null]
    | ['parenthesized', {
        'jsdoc': JSDoc
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
    }]
    | ['postfix unary', {
        'operand': Expression
        'operator token':
        | ['--', s_primitives.Keyword]
        | ['++', s_primitives.Keyword]
    }]

    | ['prefix unary', {
        'operator token':
        | ['--', s_primitives.Keyword]
        | ['-', s_primitives.Keyword]
        | ['!', s_primitives.Keyword]
        | ['+', s_primitives.Keyword]
        | ['++', s_primitives.Keyword]
        | ['~', s_primitives.Keyword]
        'operand': Expression
    }]
    | ['private identifier', s_primitives.Literal]
    | ['property access', Expression.Property_Access]
    | ['qualified name', Qualified_Name]
    | ['regular expression literal', s_primitives.Literal]
    | ['satisfies', Expression.Satisfies]
    | ['string literal', String_Literal]
    | ['super', s_primitives.Keyword]
    | ['tagged template', Expression.Tagged_Template]
    | ['template', Expression.Template]
    | ['this', s_primitives.Keyword]
    | ['true keyword', s_primitives.Keyword]
    | ['type of', {
        'type of keyword': s_primitives.Keyword
        'expression': Expression
    }]
    | ['void', {
        'void keyword': s_primitives.Keyword
    }]
    | ['yield', {
        'yield keyword': s_primitives.Keyword
        'asterisk token': p_.Optional_Value<s_primitives.Keyword>
        'expression': p_.Optional_Value<Expression>
    }]
    | ['spread element', {
        'dot dot dot token': s_primitives.Keyword
        'expression': Expression
    }]
    | ['with type arguments', Expression_With_Type_Arguments]

export namespace Expression {
    export type Array_Literal = {
        'open bracket token': s_primitives.Keyword
        'elements': h.Separated_List<Expression>
        'close bracket token': s_primitives.Keyword
    }
    export type Arrow_Function = {
        'jsdoc': JSDoc
        'parameters':
        | ['with parentheses', {
            'type parameters': Type_Parameters
            'parameters': Parameters
        }]
        | ['without parentheses', Arrow_Function.Without_Parentheses]
        'type': Return_Type_Annotation
        'equals greater than token': s_primitives.Keyword
        'body':
        | ['block', Block]
        | ['expression', Expression]
    }
    export namespace Arrow_Function {
        export type Without_Parentheses = {
            'parameter': {
                'jsdoc': JSDoc
                'name': Binding_Pattern
                'type': Optional_Type
            }
        }
    }
    export type As = {
        'expression': Expression
        'as keyword': s_primitives.Keyword
        'type': Type
    }
    export type Assertion = {
        'less than token': s_primitives.Keyword
        'type': Type
        'greater than token': s_primitives.Keyword
        'expression': Expression
    }
    export type Await = {
        'await keyword': s_primitives.Keyword
        'expression': Expression
    }
    export type Binary = {
        'left': Expression
        'operator token':
        | ['^', s_primitives.Keyword]
        | ['^=', s_primitives.Keyword]
        | ['-', s_primitives.Keyword]
        | ['-=', s_primitives.Keyword]
        | ['!=', s_primitives.Keyword]
        | ['!==', s_primitives.Keyword]
        | ['??', s_primitives.Keyword]
        | ['??=', s_primitives.Keyword]
        | ['*', s_primitives.Keyword]
        | ['**', s_primitives.Keyword]
        | ['**=', s_primitives.Keyword]
        | ['*=', s_primitives.Keyword]
        | ['/', s_primitives.Keyword]
        | ['/=', s_primitives.Keyword]
        | ['&', s_primitives.Keyword]
        | ['&=', s_primitives.Keyword]
        | ['&&', s_primitives.Keyword]
        | ['&&=', s_primitives.Keyword]
        | ['%', s_primitives.Keyword]
        | ['%=', s_primitives.Keyword]
        | ['+', s_primitives.Keyword]
        | ['+=', s_primitives.Keyword]
        | ['<', s_primitives.Keyword]
        | ['<<', s_primitives.Keyword]
        | ['<<=', s_primitives.Keyword]
        | ['<=', s_primitives.Keyword]
        | ['=', s_primitives.Keyword]
        | ['==', s_primitives.Keyword]
        | ['===', s_primitives.Keyword]
        | ['>', s_primitives.Keyword]
        | ['>=', s_primitives.Keyword]
        | ['>>', s_primitives.Keyword]
        | ['>>=', s_primitives.Keyword]
        | ['>>>=', s_primitives.Keyword]
        | ['>>>', s_primitives.Keyword]
        | ['|', s_primitives.Keyword]
        | ['|=', s_primitives.Keyword]
        | ['||', s_primitives.Keyword]
        | ['||=', s_primitives.Keyword]
        | ['in', s_primitives.Keyword]
        | ['instanceof', s_primitives.Keyword]
        | [',', s_primitives.Keyword]
        'right': Expression
    }
    export type Call = {
        'callee':
        | ['import', s_primitives.Keyword]
        | ['expression', Expression] //the normal case, e.g. `foo()`
        | ['super', s_primitives.Keyword]
        'type arguments': Type_Arguments
        'arguments': Arguments
    }
    export type Conditional = {
        'condition': Expression
        'question token': s_primitives.Keyword
        'when true': Expression
        'colon token': s_primitives.Keyword
        'when false': Expression
    }
    export type Delete = {
        'delete keyword': s_primitives.Keyword
        'expression': Expression
    }
    export type Function = {
        jsdoc: JSDoc
        'modifiers': p_.Optional_Value<p_di.List<
            | ['async', s_primitives.Keyword]
        >>
        'function keyword': s_primitives.Keyword
        'asterisk token': p_.Optional_Value<s_primitives.Keyword>
        'name': p_.Optional_Value<Identifier>
        'type parameters': Type_Parameters
        'parameters': Parameters
        'return type': Return_Type_Annotation
        'body': Block
    }
    export type Meta_Property = {
        'new keyword':
        | ['new keyword', s_primitives.Keyword]
        | ['import keyword', s_primitives.Keyword]
        'dot token': s_primitives.Keyword
        'identifier': Identifier
    }
    export type Object_Literal = {
        'open brace token': s_primitives.Keyword
        'properties': h.Separated_List<Object_Literal.Property>
        'close brace token': s_primitives.Keyword
    }
    export namespace Object_Literal {
        export type Property =
            | ['property', Property.Assignment]
            | ['shorthand property', Property.Shorthand_Property]
            | ['method', Property.Method]
            | ['spread', {
                'dot dot dot token': s_primitives.Keyword
                'expression': Expression
            }]
            | ['get accessor', Property.Get_Accessor]
            | ['set accessor', Property.Set_Accessor]
        export namespace Property {
            export type Assignment = {
                'jsdoc': JSDoc
                'name': Property_Name
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'colon token': s_primitives.Keyword
                'initializer': Expression
            }
            export type Get_Accessor = {
                'jsdoc': JSDoc
                'modifiers': Signature_Modifiers
                'get keyword': s_primitives.Keyword
                'name': Property_Name
                'parameters': Parameters
                'return type': Return_Type_Annotation
                'body': p_.Optional_Value<Block>
            }
            export type Method = {
                'jsdoc': JSDoc
                'modifiers': Signature_Modifiers
                'asterisk token': p_.Optional_Value<s_primitives.Keyword>
                'name': Property_Name
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'exclamation token': p_.Optional_Value<s_primitives.Keyword>
                'type parameters': Type_Parameters
                'parameters': Parameters
                'return type': Return_Type_Annotation
                'body': p_.Optional_Value<Block>
                'semicolon': Semi_Colon
            }
            export type Set_Accessor = {
                'jsdoc': JSDoc
                // 'modifiers': Signature_Modifiers
                'set keyword': s_primitives.Keyword
                'name': Property_Name
                'parameters': Parameters
                'return type': Return_Type_Annotation
                'body': p_.Optional_Value<Block>
            }
            export type Shorthand_Property = {
                'jsdoc': JSDoc
                'name': Identifier
                'initializer': p_.Optional_Value<{
                    'equals token': s_primitives.Keyword
                    'expression': Expression
                }>
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'exclamation token': p_.Optional_Value<s_primitives.Keyword>
            }
        }
    }
    export type Property_Access = {
        'expression': Expression
        'dot token':
        | ['.', s_primitives.Keyword]
        | ['?.', s_primitives.Keyword]
        'identifier':
        | ['named', Identifier]
        | ['private', Identifier]
    }
    export type Satisfies = {
        'expression': Expression
        'satisfies keyword': s_primitives.Keyword
        'type': Type
    }
    export type Tagged_Template = {
        'tag': Expression
        'question dot token': p_.Optional_Value<s_primitives.Keyword>
        'type arguments': Type_Arguments
        'template':
        | ['no substitution template literal', s_primitives.Literal]
        | ['template', Template]
    }
    export type Template = {
        'head': s_primitives.Literal
        'template spans': p_.List<Template_Span>
    }
    export type Template_Span = {
        'expression': Expression
        'suffix':
        | ['middle', s_primitives.Literal]
        | ['tail', s_primitives.Literal]
    }
}

export type Expression_With_Type_Arguments = {
    'expression': Expression
    'type arguments': Type_Arguments
}

export type Heritage = p_.Optional_Value<p_.List<Heritage.Clause>>

export namespace Heritage {
    export type Clause = {
        'extends or implements keyword':
        | ['extends', s_primitives.Keyword]
        | ['implements', s_primitives.Keyword]
        'types': h.Separated_List<Expression_With_Type_Arguments>
    }
}

export type Identifier = s_primitives.Literal

export type Import_Attributes = {
    'open brace token': s_primitives.Keyword
    'entries': h.Separated_List<Import_Attributes.Entry>
    'close brace token': s_primitives.Keyword
}
export namespace Import_Attributes {
    export type Entry = {
        'name': Property_Name
        'colon token': s_primitives.Keyword
        'value': Expression
    }
}

export type Initializer = {
    'equals token': s_primitives.Keyword
    'expression': Expression
}

export type JSDoc = p_.List<s_primitives.Blob>

export type Module_Body =
    | ['module block', Block]
    | ['dotted', {
        'dot token': s_primitives.Keyword
        'module declaration': {
            'name': Identifier
            'block': Module_Body
        }
    }]
    | ['shorthand', Semi_Colon]

export type Numeric_Literal = s_primitives.Literal

export type Object_Type = {
    'open brace token': s_primitives.Keyword
    'signatures': p_.List<Object_Type.Signature>
    'close brace token': s_primitives.Keyword
}

export namespace Object_Type {
    export type Signature =
        | ['call', Signature.Call]
        | ['construct', Signature.Construct]
        | ['get accessor', Signature.Get_Accessor]
        | ['index', Signature.Index]
        | ['method', Signature.Method]
        | ['property', Signature.Property]
        | ['set accessor', Signature.Set_Accessor]
    export namespace Signature {
        export type Call = {
            'jsdoc': JSDoc
            'type parameters': Type_Parameters
            'parameters': Parameters
            'type': Optional_Type
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type Construct = {
            'jsdoc': JSDoc
            'new keyword': s_primitives.Keyword
            'type parameters': Type_Parameters
            'parameters': Parameters
            'type': Optional_Type
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type Get_Accessor = {
            'jsdoc': JSDoc
            'get keyword': s_primitives.Keyword
            'name': Property_Name
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type Set_Accessor = {
            'jsdoc': JSDoc
            'set keyword': s_primitives.Keyword
            'name': Property_Name
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type Index = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'open bracket token': s_primitives.Keyword
            'parameter': h.Separated_List<{
                'jsdoc': JSDoc
                'modifiers': Signature_Modifiers
                'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
                'identifier': Identifier
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'annotation': p_.Optional_Value<{
                    'colon token': s_primitives.Keyword
                    'type': Type
                }>
                'initializer': Optional_Initializer
            }>
            'close bracket token': s_primitives.Keyword
            'return type': Return_Type_Annotation
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type Method = {
            'jsdoc': JSDoc
            'identifier': Property_Name
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type Property = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'id': Property_Name
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'type annotation': Optional_Type
            'initializer': Optional_Initializer
            'comma token': p_.Optional_Value<s_primitives.Keyword>
            'semicolon token': Semi_Colon
        }
    }
}

export type Optional_Initializer = p_.Optional_Value<Initializer>

export type Optional_Type = p_.Optional_Value<{
    'colon token': s_primitives.Keyword
    'type': Type
}>

export type Parameters = {
    'jsdoc': JSDoc
    'open parenthesis token': s_primitives.Keyword
    'entries': h.Separated_List<Parameters.Parameter>
    'close parenthesis token': s_primitives.Keyword
}

export namespace Parameters {
    export type Parameter = {
        'jsdoc': JSDoc

        // 'modifiers': p_.Optional_Value<p_.List<Parameter.Modifier>>
        'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
        'name': Binding_Pattern
        'question token': p_.Optional_Value<s_primitives.Keyword>
        'type': Optional_Type
        'initializer': Optional_Initializer
    }
}

export type Property_Name = {
    'jsdoc': JSDoc
    'modifiers': p_.Optional_Value<p_di.List<
        | ['abstract', s_primitives.Keyword]
        | ['async', s_primitives.Keyword]
        | ['export', s_primitives.Keyword]
        | ['override', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
    >>
    'type':
    | ['big int literal', s_primitives.Literal]
    | ['computed', Property_Name.Computed]
    | ['identifier', Identifier]
    | ['numeric literal', Numeric_Literal]
    | ['private identifier', Identifier]
    | ['string literal', String_Literal]
}

export namespace Property_Name {
    export type Computed = {
        'open bracket token': s_primitives.Keyword
        'expression': Expression
        'close bracket token': s_primitives.Keyword
    }
}

export type Qualified_Name = {
    'first': Entity_Name
    'dot token': s_primitives.Keyword
    'second': Identifier
}

export type Return_Type_Annotation = p_.Optional_Value<{
    'colon token': s_primitives.Keyword
    'kind':
    | ['type', Type]
    | ['type predicate', Type_Predicate]
}>

export type Semi_Colon = p_.Optional_Value<s_primitives.Keyword>

export type Separated_List<T extends p_di.Value> = p_.List<
    | ['entry', T]
    | ['separator', s_primitives.Keyword]
>

export type Signature_Modifiers = p_.Optional_Value<p_.List<Signature_Modifiers.L>>

export namespace Signature_Modifiers {
    export type L =
        | ['abstract', s_primitives.Keyword]
        | ['accessor', s_primitives.Keyword]
        | ['async', s_primitives.Keyword]
        | ['const', s_primitives.Keyword]
        | ['declare', s_primitives.Keyword]
        | ['in', s_primitives.Keyword]
        | ['out', s_primitives.Keyword]
        | ['decorator', {
            'at token': s_primitives.Keyword
            'expression': Expression
        }]
        | ['export', s_primitives.Keyword]
        | ['override', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        | ['static', s_primitives.Keyword]
}

export type Source_File = {
    'statements': Statements
    'end of file': {
        'jsdoc': JSDoc
    }
}

export type Statement =
    | ['block', Block]
    | ['break', Statement.Break]
    | ['class', Statement.Class_Declaration]
    | ['continue', Statement.Continue]
    | ['debugger', Statement.Debugger]
    | ['do', Statement.Do]
    | ['empty', Statement.Empty]
    | ['enum', Statement.Enum_Declaration]
    | ['export assignment', Statement.Export_Assignment]
    | ['export declaration', Statement.Export_Declaration]
    | ['expression', Statement.Expr]
    | ['for', Statement.For]
    | ['for in', Statement.For_In]
    | ['for of', Statement.For_Of]
    | ['function', Statement.Function_Declaration]
    | ['if', Statement.If]
    | ['import', Statement.Import_Declaration]
    | ['import equals', Statement.Import_Equals]
    | ['interface', Statement.Interface]
    | ['labeled', Statement.Labeled]
    | ['module', Statement.Module_Declaration]
    | ['namespace export', Statement.Namespace_Export]
    | ['return', Statement.Return]
    | ['switch', Statement.Switch]
    | ['throw', Statement.Throw]
    | ['try', Statement.Try]
    | ['type alias', Statement.Type_Alias_Declaration]
    | ['variable', Statement.Variable]
    | ['while', Statement.While]
    | ['with', Statement.With]

export namespace Statement {
    export type Break = {
        'jsdoc': JSDoc
        'break keyword': s_primitives.Keyword
        'identifier': p_.Optional_Value<Identifier>
        'semicolon': Semi_Colon
    }
    export type Continue = {
        'jsdoc': JSDoc
        'continue keyword': s_primitives.Keyword
        'label': p_.Optional_Value<Identifier>
        'semicolon': Semi_Colon
    }
    export type Class_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'class': Class
        'semicolon': Semi_Colon
    }
    export type Debugger = {
        'jsdoc': JSDoc
        'debugger keyword': s_primitives.Keyword
        'semicolon': Semi_Colon
    }
    export type Do = {
        'jsdoc': JSDoc
        'do keyword': s_primitives.Keyword
        'statement': Statement
        'while keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'semicolon': Semi_Colon
    }
    export type Empty = {
        'jsdoc': JSDoc
        'semicolon token': s_primitives.Keyword
    }
    export type Enum_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'enum keyword': s_primitives.Keyword
        'identifier': Identifier
        'open brace token': s_primitives.Keyword
        'members': h.Separated_List<Enum_Declaration.Member>
        'close brace token': s_primitives.Keyword
        'semicolon': Semi_Colon
    }
    export type Export_Assignment = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'export keyword': s_primitives.Keyword
        'type':
        | ['default', {
            'default keyword': s_primitives.Keyword
            'expression': Expression
        }]
        | ['equals', Initializer]
        'semicolon': Semi_Colon
    }
    export namespace Enum_Declaration {
        export type Member = {
            'jsdoc': JSDoc
            'name': Property_Name
            'initializer': Optional_Initializer
            // 'comma token': p_.Optional_Value<s_primitives.Keyword>
        }
    }
    export type Export_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'export keyword': s_primitives.Keyword
        'type keyword': p_.Optional_Value<s_primitives.Keyword>
        'type':
        | ['all', {
            'asterisk token': s_primitives.Keyword
            'as': p_.Optional_Value<As_Alias>
        }]
        | ['named', {
            'open brace token': s_primitives.Keyword
            'exports': h.Separated_List<Export_Declaration.Entry>
            'close brace token': s_primitives.Keyword
        }]
        | ['namespace', {
            'asterisk token': s_primitives.Keyword
            'as keyword': s_primitives.Keyword
            'identifier': Identifier
        }]
        'from clause': p_.Optional_Value<{
            'from keyword': s_primitives.Keyword
            'module specifier': Module_Specifier
        }>
        'import attributes': p_.Optional_Value<{
            'with keyword': s_primitives.Keyword
            'open brace token': s_primitives.Keyword
            'elements': h.Separated_List<{
                'name': Identifier
                'colon token': s_primitives.Keyword
                'value': Expression
            }>
            'close brace token': s_primitives.Keyword
        }>
        'semicolon': Semi_Colon
    }
    export namespace Export_Declaration {
        export type Entry = {
            'type keyword': p_.Optional_Value<s_primitives.Keyword>
            'identifier': Identifier
            'as': p_.Optional_Value<As_Alias>
        }
    }
    export type Expr = {
        'jsdoc': JSDoc
        'expression': Expression
        'semicolon': Semi_Colon
    }
    export type For = {
        'jsdoc': JSDoc
        'for keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'initializer': p_.Optional_Value<
            | ['variable declaration list', Variable_Declaration_List]
            | ['expression', Expression]
        >
        'semicolon token': s_primitives.Keyword
        'condition': p_.Optional_Value<Expression>
        'semicolon token 2': s_primitives.Keyword
        'incrementor': p_.Optional_Value<Expression>
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
        'semicolon': Semi_Colon
    }
    export type For_In = {
        'jsdoc': JSDoc
        'for keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'initializer':
        | ['variable declaration list', Variable_Declaration_List]
        | ['expression', Expression]
        'in keyword': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
        'semicolon': Semi_Colon
    }
    export type For_Of = {
        'jsdoc': JSDoc
        'for keyword': s_primitives.Keyword
        'await keyword': p_.Optional_Value<s_primitives.Keyword>
        'open parenthesis token': s_primitives.Keyword
        'initializer':
        | ['variable declaration list', Variable_Declaration_List]
        | ['expression', Expression]
        'of keyword': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
        'semicolon': Semi_Colon
    }
    export type Function_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'function keyword': s_primitives.Keyword
        'asterisk token': p_.Optional_Value<s_primitives.Keyword>
        'identifier': p_.Optional_Value<Identifier>
        'type parameters': Type_Parameters
        'parameters': Parameters
        'return type annotation': Return_Type_Annotation //FIXME Return Type_Annotation
        'body': p_.Optional_Value<Block>
        'semicolon': Semi_Colon
    }
    export type If = {
        'jsdoc': JSDoc
        'if keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'then statement': Statement
        'else': p_.Optional_Value<{
            'else keyword': s_primitives.Keyword
            'statement': Statement
        }>
        'semicolon': Semi_Colon
    }
    export namespace Import {
        export type Clause = {
            'type keyword': p_.Optional_Value<s_primitives.Keyword>
            'type':
            | ['named imports', Named_Imports]
            | ['namespace import', Namespace]
            | ['identifier', {
                'identifier': Identifier
                'named': p_.Optional_Value<{
                    'comma token': s_primitives.Keyword
                    'bindings':
                    | ['named imports', Named_Imports]
                    | ['namespace import', Namespace]
                }>
            }]
            | ['defer', {
                'defer keyword': s_primitives.Keyword
                'import':
                | ['identifier', Identifier]
                | ['namespace import', Namespace]
                | ['named imports', Named_Imports]
            }]
        }
        export type Named_Imports = {
            'open brace token': s_primitives.Keyword
            'entries': h.Separated_List<{
                'type keyword': p_.Optional_Value<s_primitives.Keyword>
                'identifier': Identifier
                'as': p_.Optional_Value<As_Alias>
            }>
            'close brace token': s_primitives.Keyword
        }
        export type Namespace = {
            'asterisk token': s_primitives.Keyword
            'as keyword': s_primitives.Keyword
            'identifier': Identifier
        }
    }
    export type Import_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'import keyword': s_primitives.Keyword
        'clause': p_.Optional_Value<Import.Clause>
        'from keyword': p_.Optional_Value<s_primitives.Keyword>
        'module specifier': Module_Specifier
        'import attributes': p_.Optional_Value<{
            'with keyword': s_primitives.Keyword
            'open brace token': s_primitives.Keyword
            'elements': h.Separated_List<{
                'name': Identifier
                'colon token': s_primitives.Keyword
                'value': Expression
            }>
            'close brace token': s_primitives.Keyword
        }>
        'semicolon': Semi_Colon
    }
    export type Import_Equals = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'import keyword': s_primitives.Keyword
        'type keyword': p_.Optional_Value<s_primitives.Keyword>
        'identifier': Identifier
        'initializer': Initializer
        'semicolon': Semi_Colon
    }
    export type Interface = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'interface keyword': s_primitives.Keyword
        'identifier': Identifier
        'type parameters': Type_Parameters
        'heritage': Heritage
        'body': Object_Type
        // 'heritage clauses': p_.Optional_Value<p_.List<Heritage_Clause>>
        // 'body': Type_Literal
        'semicolon': Semi_Colon
    }
    export type Labeled = {
        'jsdoc': JSDoc
        'identifier': Identifier
        'colon token': s_primitives.Keyword
        'statement': Statement
    }
    export type Module_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'type':
        | ['global', Identifier]
        | ['module', Module_Declaration.Module]
        | ['namespace', {
            'keyword': s_primitives.Keyword
            'name': Identifier
        }]
        'block': p_.Optional_Value<Module_Body>
        'semicolon': Semi_Colon
    }
    export namespace Module_Declaration {
        export type Module = {
            'keyword': s_primitives.Keyword
            'name': Property_Name
        }
    }
    export type Namespace_Export = {
        'jsdoc': JSDoc
        'export keyword': s_primitives.Keyword
        'as keyword': s_primitives.Keyword
        'namespace keyword': s_primitives.Keyword
        'identifier': Identifier
        'semicolon': Semi_Colon
    }
    export type Return = {
        'jsdoc': JSDoc
        'return keyword': s_primitives.Keyword
        'expression': p_.Optional_Value<Expression>
        'semicolon': Semi_Colon
    }
    export type Throw = {
        'jsdoc': JSDoc
        'throw keyword': s_primitives.Keyword
        'expression': Expression
        'semicolon': Semi_Colon
    }
    export type Switch = {
        'jsdoc': JSDoc
        'switch keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'case block': {
            'open brace token': s_primitives.Keyword
            'clauses': p_.List<Switch.Case_Clause>
            'close brace token': s_primitives.Keyword
        }
        'semicolon': Semi_Colon
    }
    export namespace Switch {
        export type Case_Clause =
            | ['case', {
                'case keyword': s_primitives.Keyword
                'expression': Expression
                'colon token': s_primitives.Keyword
                'statements': Statements
            }]
            | ['default', {
                'default keyword': s_primitives.Keyword
                'colon token': s_primitives.Keyword
                'statements': Statements
            }]
    }
    export type Try = {
        'jsdoc': JSDoc
        'try keyword': s_primitives.Keyword
        'try block': Block
        'catch clause': p_.Optional_Value<Try.Catch_Clause>
        'finally block': p_.Optional_Value<{
            'finally keyword': s_primitives.Keyword
            'block': Block
        }>
        'semicolon': Semi_Colon
    }
    export namespace Try {
        export type Catch_Clause = {
            'catch keyword': s_primitives.Keyword
            'binding': p_.Optional_Value<{
                'open parenthesis token': s_primitives.Keyword
                'variable declaration': Variable_Declaration
                'close parenthesis token': s_primitives.Keyword
            }>
            'block': Block
        }
    }
    export type Type_Alias_Declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'type keyword': s_primitives.Keyword
        'identifier': Identifier
        'type parameters': Type_Parameters
        'equals token': s_primitives.Keyword
        'type': Type
        'semicolon': Semi_Colon
    }
    export type Variable = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'variable declaration list': Variable_Declaration_List
        'semicolon': Semi_Colon
    }
    export type While = {
        'jsdoc': JSDoc
        'while keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
    }
    export type With = {
        'jsdoc': JSDoc
        'with keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
    }
}

export type Statement_Modifiers = p_.Optional_Value<p_.List<Statement_Modifiers.L>>

export namespace Statement_Modifiers {
    export type L =
        | ['abstract', s_primitives.Keyword]
        | ['accessor', s_primitives.Keyword]
        | ['async', s_primitives.Keyword]
        | ['const', s_primitives.Keyword]
        | ['declare', s_primitives.Keyword]
        | ['decorator', {
            'at token': s_primitives.Keyword
            'expression': Expression
        }]
        | ['default', s_primitives.Keyword]
        | ['export', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        | ['static', s_primitives.Keyword]
}

export type Statements = p_.List<Statement>

export type String_Literal = s_primitives.Literal

export type Module_Specifier =
    | ['identifier', Identifier]
    | ['string literal', String_Literal]
    | ['template', Expression.Template]

export type Type =
    | ['any', s_primitives.Keyword]
    | ['array', Type.Array]
    | ['big int', s_primitives.Keyword]
    | ['boolean', s_primitives.Keyword]
    | ['conditional', Type.Conditional]
    | ['constructor', Type.Constructor]
    | ['function', Type.Function_Type]
    | ['import type', Type.Import]
    | ['indexed access', Type.Indexed_Access]
    | ['infer', Type.Infer]
    | ['intrinsic', s_primitives.Keyword]
    | ['intersection', Type.Intersection]
    | ['jsdoc all', Type.JSDoc_All]
    | ['jsdoc function', Type.JSDoc_Function]
    | ['jsdoc non nullable', Type.JSDoc_Non_Nullable]
    | ['jsdoc nullable', Type.JSDoc_Nullable]
    | ['jsdoc unknown', Type.JSDoc_Unknown]
    | ['literal type', Type.Literal]
    | ['mapped', Type.Mapped]
    | ['never', s_primitives.Keyword]
    | ['number', s_primitives.Keyword]
    | ['object', s_primitives.Keyword]
    | ['optional type', Type.Optional]
    | ['parenthesized', Type.Parenthesized]
    | ['query', Type.Query]
    | ['string', s_primitives.Keyword]
    | ['symbol', s_primitives.Keyword]
    | ['this', s_primitives.Keyword]
    | ['tuple type', Type.Tuple]
    | ['template literal type', Type.Template_Literal]
    | ['type literal', Object_Type]
    | ['type operator', Type.Type_Operator]
    | ['type predicate', Type_Predicate]
    | ['type reference', Type.Type_Reference]
    | ['rest type', Type.Rest]
    | ['union type', Type.Union]
    | ['undefined', s_primitives.Keyword]
    | ['unknown', s_primitives.Keyword]
    | ['void', s_primitives.Keyword]

export namespace Type {
    export type Array = {
        'element type': Type
        'open bracket token': s_primitives.Keyword
        'close bracket token': s_primitives.Keyword
    }
    export type Conditional = {
        'check type': Type
        'extends keyword': s_primitives.Keyword
        'extends type': Type
        'question token': s_primitives.Keyword
        'true type': Type
        'colon token': s_primitives.Keyword
        'false type': Type
    }
    export type Constructor = {
        'modifiers': Signature_Modifiers
        'new keyword': s_primitives.Keyword
        'type parameters': Type_Parameters
        'parameters': Parameters
        'equals greater than token': s_primitives.Keyword
        'type': Type
    }
    export type Function_Type = {
        'type parameters': Type_Parameters
        'parameters': Parameters
        'type': Optional_Type
        'equals greater than token': s_primitives.Keyword
        'return type': Type
    }
    export type Import = {
        'typeof keyword': p_.Optional_Value<s_primitives.Keyword>
        'import keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'argument': Type
        'attributes': p_.Optional_Value<{
            'comma token': s_primitives.Keyword
            'open brace token': s_primitives.Keyword
            'with keyword': s_primitives.Keyword
            'colon token': s_primitives.Keyword
            'import attributes': Import_Attributes
            'close brace token': s_primitives.Keyword
        }>
        'close parenthesis token': s_primitives.Keyword
        'qualifier': p_.Optional_Value<{
            'dot token': s_primitives.Keyword
            'name': Entity_Name
        }>
        'type arguments': Type_Arguments
        'error recovery': Error_Recovery
    }
    export type Indexed_Access = {
        'object type': Type
        'open bracket token': s_primitives.Keyword
        'index type': Type
        'close bracket token': s_primitives.Keyword
    }
    export type Infer = {
        'infer keyword': s_primitives.Keyword
        'type parameter': {
            'identifier': Identifier
            'extends': p_.Optional_Value<{
                'extends keyword': s_primitives.Keyword
                'type': Type
            }>
        }
    }
    export type Intersection = h.Separated_List<Type>
    export type JSDoc_All = {
        'asterisk token': s_primitives.Keyword
    }
    export type JSDoc_Function = {
        'function keyword': s_primitives.Keyword
        'parameters': Parameters
        'type': Optional_Type
    }
    export type JSDoc_Non_Nullable = {
        'exclamation token before': p_.Optional_Value<s_primitives.Keyword>
        'type': Type
        'exclamation token after': p_.Optional_Value<s_primitives.Keyword>
    }
    export type JSDoc_Nullable = {
        'question token before': p_.Optional_Value<s_primitives.Keyword>
        'type': Type
        'question token after': p_.Optional_Value<s_primitives.Keyword>
    }
    export type JSDoc_Unknown = {
        'question token': s_primitives.Keyword
    }
    export type Literal = {
        'type':
        | ['bigint literal', s_primitives.Literal]
        | ['false keyword', s_primitives.Keyword]
        | ['negative numeric literal', { 'minus token': s_primitives.Keyword, 'value': Numeric_Literal }]
        | ['no substitution template literal', s_primitives.Literal]
        | ['null', s_primitives.Keyword]
        | ['numeric literal', Numeric_Literal]
        | ['string literal', String_Literal]
        | ['true keyword', s_primitives.Keyword]
    }
    export type Mapped = {
        'open brace token': s_primitives.Keyword
        'readonly modifier': p_.Optional_Value<{
            'modifier': p_.Optional_Value<s_primitives.Literal>
            'readonly keyword': s_primitives.Keyword
        }>
        'open bracket token': s_primitives.Keyword
        'type parameter': {
            'identifier': Identifier
            'in keyword': s_primitives.Keyword
            'constraint': Type
        }
        'as': p_.Optional_Value<{
            'as keyword': s_primitives.Keyword
            'type': Type
        }>
        'close bracket token': s_primitives.Keyword
        'question modifier minus': p_.Optional_Value<s_primitives.Keyword>
        'question modifier plus': p_.Optional_Value<s_primitives.Keyword>
        'question modifier question': p_.Optional_Value<s_primitives.Keyword>
        'body': p_.Optional_Value<{
            'colon token': s_primitives.Keyword
            'type': Type
            'semicolon': Semi_Colon
        }>
        'dummy syntax list': p_.List<Object_Type.Signature>
        'close brace token': s_primitives.Keyword
    }
    export type Optional = {
        'type': Type
        'question token': s_primitives.Keyword
    }
    export type Parenthesized = {
        'open parenthesis token': s_primitives.Keyword
        'type': Type
        'close parenthesis token': s_primitives.Keyword
    }
    export type Query = {
        'typeof keyword': s_primitives.Keyword
        'name': Entity_Name
        'type arguments': Type_Arguments
    }
    export type Template_Literal = {
        'head': s_primitives.Literal
        'template spans': p_.List<{
            'type': Type
            'suffix':
            | ['middle', s_primitives.Literal]
            | ['tail', s_primitives.Literal]
        }>
    }
    export type Rest = {
        'dot dot dot token': s_primitives.Keyword
        'type': Type
    }
    export type Tuple = {
        readonly 'open bracket token': s_primitives.Keyword
        'elements': h.Separated_List<Tuple.Element>
        'close bracket token': s_primitives.Keyword
    }
    export namespace Tuple {
        export type Element =
            | ['named', {
                'jsdoc': JSDoc
                'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
                'name': Identifier
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'colon token': s_primitives.Keyword
                'type': Type
            }]
            | ['regular', Type]
    }
    export type Type_Operator = {
        'operator':
        | ['key of', s_primitives.Keyword]
        | ['unique', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        'type': Type
    }
    export type Type_Reference = {
        'entity name': Entity_Name
        'dot token': p_.Optional_Value<s_primitives.Keyword>
        'type arguments': Type_Arguments
        'error recovery': Error_Recovery
    }
    export type Union = {
        'members': h.Separated_List<Type>
    }
}

export type Type_Predicate = {
    'asserts keyword': p_.Optional_Value<s_primitives.Keyword>
    'parameter name':
    | ['identifier', Identifier]
    | ['this', s_primitives.Keyword]
    'is predicate': p_.Optional_Value<{
        'is keyword': s_primitives.Keyword
        'type': Type
    }>
}

export type Type_Arguments = p_.Optional_Value<{
    'less than token': s_primitives.Keyword
    'entries': h.Separated_List<Type>
    'greater than token': s_primitives.Keyword
}>

export type Type_Parameters = p_.Optional_Value<{
    'less than token': s_primitives.Keyword
    'entries': h.Separated_List<Type_Parameters.Entries>
    'greater than token': s_primitives.Keyword
}>

export namespace Type_Parameters {
    export type Entries = {
        'modifiers': p_.Optional_Value<p_.List<
            | ['const', s_primitives.Keyword]
            | ['in', s_primitives.Keyword]
            | ['out', s_primitives.Keyword]
            | ['public', s_primitives.Keyword]
        >>
        'identifier': Identifier
        'extends': p_.Optional_Value<{
            'extends keyword': s_primitives.Keyword
            'type': Type
        }>
        'default': p_.Optional_Value<{
            'equals token': s_primitives.Keyword
            'type': Type
        }>
    }
}

export type Variable_Declaration = {
    'name': Binding_Pattern
    'exclamation token': p_.Optional_Value<s_primitives.Keyword>
    'type': Optional_Type
    'assignment': p_.Optional_Value<{
        'initializer': Initializer
    }>
}

export type Variable_Declaration_List = {
    'mutability':
    | ['await using', Variable_Declaration_List.Mutability.Await_Using]
    | ['const', s_primitives.Keyword]
    | ['let', s_primitives.Keyword]
    | ['using', s_primitives.Keyword]
    | ['var', s_primitives.Keyword]
    'declarations': h.Separated_List<Variable_Declaration>
}

export namespace Variable_Declaration_List {
    export namespace Mutability {
        export type Await_Using = {
            'await keyword': s_primitives.Keyword
            'using keyword': s_primitives.Keyword
        }
    }
}
