import * as p_ from 'pareto-core/schema'
import * as p_di from 'pareto-core/schema'

import type * as s_primitives from "../primitives/schema.js"

import * as h from "../temp_helper_types/schema.js"

export type Arguments = {
    'question dot token': p_.Optional_Value<s_primitives.Keyword>
    'type arguments': Type_Arguments
    'error recovery': Error_Recovery
    'open parenthesis token': s_primitives.Keyword
    'arguments': h.Separated_List<Arguments.l>
    'close parenthesis token': s_primitives.Keyword
}

export namespace Arguments {
    export type l =
        ['expression', Expression]
        | ['spread', Arguments.spread]
    export type spread = {
        'dot dot dot token': s_primitives.Keyword
        'expression': Expression
    }
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
        | ['decorator', Binding_Pattern.decorator]
        | ['export', s_primitives.Keyword]
        | ['override', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        | ['static', s_primitives.Keyword]
    >>
    'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
    'type': Binding_Pattern.type_
}

export namespace Binding_Pattern {
    export type decorator = {
        'at token': s_primitives.Keyword
        'expression': Expression
    }
    export type type_ =
        | ['array binding pattern', Binding_Pattern.array]
        | ['identifier', Identifier]
        | ['number keyword', s_primitives.Keyword]
        | ['object binding pattern', Binding_Pattern.object_]
        | ['string keyword', s_primitives.Keyword]
    export type array = {
        'open bracket token': s_primitives.Keyword
        'elements': h.Separated_List<array.element>
        'close bracket token': s_primitives.Keyword
    }
    export namespace array {
        export type element =
            | ['binding element', array.binding_element]
            | ['omitted expression', s_primitives.Keyword] //synthetic node, used for array destructuring, e.g. [,,a] = [1,2,3]
        export type binding_element = {
            'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
            'name': Binding_Pattern
            'initializer': Optional_Initializer
        }
    }
    export type object_ = {
        'open brace token': s_primitives.Keyword
        'elements': h.Separated_List<object_.element>
        'close brace token': s_primitives.Keyword
    }
    export namespace object_ {
        export type element = {
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
        | ['decorator', Class.decorator]
    >>
    'class keyword': s_primitives.Keyword
    'identifier': p_.Optional_Value<Identifier>
    'type parameters': Type_Parameters
    'heritage': Heritage
    'body': Class_Body
}

export namespace Class {
    export type decorator = {
        'at token': s_primitives.Keyword
        'expression': Expression
    }
}

export type Class_Body = {
    'open brace token': s_primitives.Keyword
    'members': p_.List<Class_Body.member>
    'close brace token': s_primitives.Keyword
}

export namespace Class_Body {
    export type member =
        | ['constructor', member.constructor_]
        | ['get accessor', member.get_accessor]
        | ['index signature', Object_Type.signature.index]
        | ['method', member.method]
        | ['property', member.property]
        | ['semicolon element', member.semicolon_element]
        | ['set accessor', member.set_accessor]
        | ['static block', member.static_block]
    export namespace member {
        export type semicolon_element = {
            'jsdoc': JSDoc
        }
        export type constructor_ = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'constructor keyword': constructor_.constructor_keyword
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
        }
        export namespace constructor_ {
            export type constructor_keyword =
                | ['constructor keyword', s_primitives.Keyword]
                | ['constructor keyword as string literal', s_primitives.Keyword]
        }
        export type get_accessor = {
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
        export type method = {
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
        export type property = {
            'jsdoc': JSDoc
            'modifiers': Signature_Modifiers
            'name': Property_Name
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'exclamation token': p_.Optional_Value<s_primitives.Keyword>
            'type': Optional_Type
            'initializer': Optional_Initializer
            'semicolon': Semi_Colon
        }
        export type set_accessor = {
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
        export type static_block = {
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
    'entries': h.Separated_List<Type>
    'greater than token': p_.Optional_Value<s_primitives.Keyword>
}>

export type Expression =
    | ['array literal', Expression.array_literal]
    | ['arrow function', Expression.arrow_function]
    | ['assertion', Expression.assertion]
    | ['as expression', Expression.as_]
    | ['await', Expression.await_]
    | ['big int literal', s_primitives.Literal]
    | ['binary', Expression.binary]
    | ['call', Expression.call]
    | ['class', Class]
    | ['conditional', Expression.conditional]
    | ['delete', Expression.delete_]
    | ['element access', Expression.element_access]
    | ['external module reference', Expression.external_module_reference]
    | ['false keyword', s_primitives.Keyword]
    | ['function', Expression.function_]
    | ['identifier', Identifier]
    | ['import keyword', s_primitives.Keyword]
    | ['jsdoc', s_primitives.Blob]
    | ['meta property', Expression.meta_property]
    | ['new', Expression.new_]
    | ['no substitution template literal', s_primitives.Literal]
    | ['non null', Expression.non_null]
    | ['null keyword', s_primitives.Keyword]
    | ['numeric literal', s_primitives.Literal]
    | ['object literal', Expression.object_literal]
    | ['omitted expression', s_primitives.Keyword]
    | ['parenthesized', Expression.parenthesized]
    | ['postfix unary', Expression.postfix_unary]
    | ['prefix unary', Expression.prefix_unary]
    | ['private identifier', s_primitives.Literal]
    | ['property access', Expression.property_access]
    | ['qualified name', Qualified_Name]
    | ['regular expression literal', s_primitives.Literal]
    | ['satisfies', Expression.satisfies_]
    | ['string literal', String_Literal]
    | ['super', s_primitives.Keyword]
    | ['tagged template', Expression.tagged_template]
    | ['template', Expression.template]
    | ['this', s_primitives.Keyword]
    | ['true keyword', s_primitives.Keyword]
    | ['type of', Expression.type_of]
    | ['void', Expression.void_]
    | ['yield', Expression.yield_]
    | ['spread element', Expression.spread_element]
    | ['with type arguments', Expression_With_Type_Arguments]

export namespace Expression {
    export type array_literal = {
        'open bracket token': s_primitives.Keyword
        'elements': h.Separated_List<Expression>
        'close bracket token': s_primitives.Keyword
    }
    export type arrow_function = {
        'jsdoc': JSDoc
        'parameters':
        | ['with parentheses', arrow_function.with_parentheses]
        | ['without parentheses', arrow_function.without_parentheses]
        'type': Return_Type_Annotation
        'equals greater than token': s_primitives.Keyword
        'body':
        | ['block', Block]
        | ['expression', Expression]
    }
    export namespace arrow_function {
        export type with_parentheses = {
            'type parameters': Type_Parameters
            'parameters': Parameters
        }
        export type without_parentheses = {
            'parameter': {
                'jsdoc': JSDoc
                'name': Binding_Pattern
                'type': Optional_Type
            }
        }
    }
    export type as_ = {
        'expression': Expression
        'as keyword': s_primitives.Keyword
        'type': Type
    }
    export type assertion = {
        'less than token': s_primitives.Keyword
        'type': Type
        'greater than token': s_primitives.Keyword
        'expression': Expression
    }
    export type await_ = {
        'await keyword': s_primitives.Keyword
        'expression': Expression
    }
    export type binary = {
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
    export type call = {
        'callee':
        | ['import', s_primitives.Keyword]
        | ['expression', Expression] //the normal case, e.g. `foo()`
        | ['super', s_primitives.Keyword]
        'type arguments': Type_Arguments
        'arguments': Arguments
    }
    export type conditional = {
        'condition': Expression
        'question token': s_primitives.Keyword
        'when true': Expression
        'colon token': s_primitives.Keyword
        'when false': Expression
    }
    export type delete_ = {
        'delete keyword': s_primitives.Keyword
        'expression': Expression
    }
    export type element_access = {
        'expression': Expression
        'question dot token': p_.Optional_Value<s_primitives.Keyword>
        'open bracket token': s_primitives.Keyword
        'argument expression': Expression
        'close bracket token': s_primitives.Keyword
    }
    export type external_module_reference = {
        'require keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'module name': String_Literal
        'close parenthesis token': s_primitives.Keyword
    }
    export type function_ = {
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
    export type meta_property = {
        'new keyword': meta_property.new_keyword
        'dot token': s_primitives.Keyword
        'identifier': Identifier
    }
    export namespace meta_property {
        export type new_keyword =
            | ['new keyword', s_primitives.Keyword]
            | ['import keyword', s_primitives.Keyword]
    }
    export type new_ = {
        'new keyword': s_primitives.Keyword
        'expression': Expression
        'arguments': p_.Optional_Value<Arguments>
    }
    export type non_null = {
        'expression': Expression
        'exclamation token': s_primitives.Keyword
    }
    export type object_literal = {
        'open brace token': s_primitives.Keyword
        'properties': h.Separated_List<object_literal.property>
        'close brace token': s_primitives.Keyword
    }
    export namespace object_literal {
        export type property =
            | ['property', property.assignment]
            | ['shorthand property', property.shorthand_property]
            | ['method', property.method]
            | ['spread', property.spread]
            | ['get accessor', property.get_accessor]
            | ['set accessor', property.set_accessor]
        export namespace property {
            export type assignment = {
                'jsdoc': JSDoc
                'name': Property_Name
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'colon token': s_primitives.Keyword
                'initializer': Expression
            }
            export type get_accessor = {
                'jsdoc': JSDoc
                'modifiers': Signature_Modifiers
                'get keyword': s_primitives.Keyword
                'name': Property_Name
                'parameters': Parameters
                'return type': Return_Type_Annotation
                'body': p_.Optional_Value<Block>
            }
            export type method = {
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
            export type set_accessor = {
                'jsdoc': JSDoc
                // 'modifiers': Signature_Modifiers
                'set keyword': s_primitives.Keyword
                'name': Property_Name
                'parameters': Parameters
                'return type': Return_Type_Annotation
                'body': p_.Optional_Value<Block>
            }
            export type shorthand_property = {
                'jsdoc': JSDoc
                'name': Identifier
                'initializer': p_.Optional_Value<{
                    'equals token': s_primitives.Keyword
                    'expression': Expression
                }>
                'question token': p_.Optional_Value<s_primitives.Keyword>
                'exclamation token': p_.Optional_Value<s_primitives.Keyword>
            }
            export type spread = {
                'dot dot dot token': s_primitives.Keyword
                'expression': Expression
            }
        }
    }
    export type parenthesized = {
        'jsdoc': JSDoc
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
    }
    export type postfix_unary = {
        'operand': Expression
        'operator token':
        | ['--', s_primitives.Keyword]
        | ['++', s_primitives.Keyword]
    }
    export type prefix_unary = {
        'operator token':
        | ['--', s_primitives.Keyword]
        | ['-', s_primitives.Keyword]
        | ['!', s_primitives.Keyword]
        | ['+', s_primitives.Keyword]
        | ['++', s_primitives.Keyword]
        | ['~', s_primitives.Keyword]
        'operand': Expression
    }
    export type property_access = {
        'expression': Expression
        'dot token':
        | ['.', s_primitives.Keyword]
        | ['?.', s_primitives.Keyword]
        'identifier':
        | ['named', Identifier]
        | ['private', Identifier]
    }
    export type satisfies_ = {
        'expression': Expression
        'satisfies keyword': s_primitives.Keyword
        'type': Type
    }
    export type spread_element = {
        'dot dot dot token': s_primitives.Keyword
        'expression': Expression
    }
    export type tagged_template = {
        'tag': Expression
        'question dot token': p_.Optional_Value<s_primitives.Keyword>
        'type arguments': Type_Arguments
        'template': tagged_template.template
    }
    export namespace tagged_template {
        export type template =
        | ['no substitution template literal', s_primitives.Literal]
        | ['template', Expression.template]
    }
    export type template = {
        'head': s_primitives.Literal
        'template spans': p_.List<template_span>
    }
    export type template_span = {
        'expression': Expression
        'suffix':
        | ['middle', s_primitives.Literal]
        | ['tail', s_primitives.Literal]
    }
    export type type_of = {
        'type of keyword': s_primitives.Keyword
        'expression': Expression
    }
    export type void_ = {
        'void keyword': s_primitives.Keyword
    }
    export type yield_ = {
        'yield keyword': s_primitives.Keyword
        'asterisk token': p_.Optional_Value<s_primitives.Keyword>
        'expression': p_.Optional_Value<Expression>
    }
}

export type Expression_With_Type_Arguments = {
    'expression': Expression
    'type arguments': Type_Arguments
}

export type Heritage = p_.Optional_Value<p_.List<Heritage.clause>>

export namespace Heritage {
    export type clause = {
        'extends or implements keyword':
        | ['extends', s_primitives.Keyword]
        | ['implements', s_primitives.Keyword]
        'types': h.Separated_List<Expression_With_Type_Arguments>
    }
}

export type Identifier = s_primitives.Literal

export type Import_Attributes = {
    'open brace token': s_primitives.Keyword
    'entries': h.Separated_List<Import_Attributes.entry>
    'close brace token': s_primitives.Keyword
}
export namespace Import_Attributes {
    export type entry = {
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
    | ['dotted', Module_Body.dotted]
    | ['shorthand', Semi_Colon]

export namespace Module_Body {
    export type dotted = {
        'dot token': s_primitives.Keyword
        'module declaration': {
            'name': Identifier
            'block': Module_Body
        }
    }
}

export type Numeric_Literal = s_primitives.Literal

export type Object_Type = {
    'open brace token': s_primitives.Keyword
    'signatures': p_.List<Object_Type.signature>
    'close brace token': s_primitives.Keyword
}

export namespace Object_Type {
    export type signature =
        | ['call', signature.call]
        | ['construct', signature.construct]
        | ['get accessor', signature.get_accessor]
        | ['index', signature.index]
        | ['method', signature.method]
        | ['property', signature.property]
        | ['set accessor', signature.set_accessor]
    export namespace signature {
        export type call = {
            'jsdoc': JSDoc
            'type parameters': Type_Parameters
            'parameters': Parameters
            'type': Optional_Type
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type construct = {
            'jsdoc': JSDoc
            'new keyword': s_primitives.Keyword
            'type parameters': Type_Parameters
            'parameters': Parameters
            'type': Optional_Type
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type get_accessor = {
            'jsdoc': JSDoc
            'get keyword': s_primitives.Keyword
            'name': Property_Name
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type set_accessor = {
            'jsdoc': JSDoc
            'set keyword': s_primitives.Keyword
            'name': Property_Name
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'body': p_.Optional_Value<Block>
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type index = {
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
        export type method = {
            'jsdoc': JSDoc
            'identifier': Property_Name
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'type parameters': Type_Parameters
            'parameters': Parameters
            'return type': Return_Type_Annotation
            'semicolon': Semi_Colon
            'comma': p_.Optional_Value<s_primitives.Keyword>
        }
        export type property = {
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
    'entries': h.Separated_List<Parameters.parameter>
    'close parenthesis token': s_primitives.Keyword
}

export namespace Parameters {
    export type parameter = {
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
    | ['computed', Property_Name.computed]
    | ['identifier', Identifier]
    | ['numeric literal', Numeric_Literal]
    | ['private identifier', Identifier]
    | ['string literal', String_Literal]
}

export namespace Property_Name {
    export type computed = {
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

export type Signature_Modifiers = p_.Optional_Value<p_.List<Signature_Modifiers.l>>

export namespace Signature_Modifiers {
    export type l =
        | ['abstract', s_primitives.Keyword]
        | ['accessor', s_primitives.Keyword]
        | ['async', s_primitives.Keyword]
        | ['const', s_primitives.Keyword]
        | ['declare', s_primitives.Keyword]
        | ['in', s_primitives.Keyword]
        | ['out', s_primitives.Keyword]
        | ['decorator', Signature_Modifiers.decorator]
        | ['export', s_primitives.Keyword]
        | ['override', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        | ['static', s_primitives.Keyword]
    export type decorator = {
        'at token': s_primitives.Keyword
        'expression': Expression
    }
}

export type Source_File = {
    'statements': Statements
    'end of file': {
        'jsdoc': JSDoc
    }
}

export type Statement =
    | ['block', Block]
    | ['break', Statement.break_]
    | ['class', Statement.class_declaration]
    | ['continue', Statement.continue_]
    | ['debugger', Statement.debugger_]
    | ['do', Statement.do_]
    | ['empty', Statement.empty]
    | ['enum', Statement.enum_declaration]
    | ['export assignment', Statement.export_assignment]
    | ['export declaration', Statement.export_declaration]
    | ['expression', Statement.expr]
    | ['for', Statement.for_]
    | ['for in', Statement.for_in]
    | ['for of', Statement.for_of]
    | ['function', Statement.function_declaration]
    | ['if', Statement.if_]
    | ['import', Statement.import_declaration]
    | ['import equals', Statement.import_equals]
    | ['interface', Statement.interface_]
    | ['labeled', Statement.labeled]
    | ['module', Statement.module_declaration]
    | ['namespace export', Statement.namespace_export]
    | ['return', Statement.return_]
    | ['switch', Statement.switch_]
    | ['throw', Statement.throw_]
    | ['try', Statement.try_]
    | ['type alias', Statement.type_alias_declaration]
    | ['variable', Statement.variable]
    | ['while', Statement.while_]
    | ['with', Statement.with_]

export namespace Statement {
    export type break_ = {
        'jsdoc': JSDoc
        'break keyword': s_primitives.Keyword
        'identifier': p_.Optional_Value<Identifier>
        'semicolon': Semi_Colon
    }
    export type continue_ = {
        'jsdoc': JSDoc
        'continue keyword': s_primitives.Keyword
        'label': p_.Optional_Value<Identifier>
        'semicolon': Semi_Colon
    }
    export type class_declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'class': Class
        'semicolon': Semi_Colon
    }
    export type debugger_ = {
        'jsdoc': JSDoc
        'debugger keyword': s_primitives.Keyword
        'semicolon': Semi_Colon
    }
    export type do_ = {
        'jsdoc': JSDoc
        'do keyword': s_primitives.Keyword
        'statement': Statement
        'while keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'semicolon': Semi_Colon
    }
    export type empty = {
        'jsdoc': JSDoc
        'semicolon token': s_primitives.Keyword
    }
    export type enum_declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'enum keyword': s_primitives.Keyword
        'identifier': Identifier
        'open brace token': s_primitives.Keyword
        'members': h.Separated_List<enum_declaration.member>
        'close brace token': s_primitives.Keyword
        'semicolon': Semi_Colon
    }
    export namespace enum_declaration {
        export type member = {
            'jsdoc': JSDoc
            'name': Property_Name
            'initializer': Optional_Initializer
            // 'comma token': p_.Optional_Value<s_primitives.Keyword>
        }
    }
    export type export_assignment = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'export keyword': s_primitives.Keyword
        'type': export_assignment.type_
        'semicolon': Semi_Colon
    }
    export namespace export_assignment {
        export type type_ =
            | ['default', export_assignment.default_]
            | ['equals', Initializer]
        export type default_ = {
            'default keyword': s_primitives.Keyword
            'expression': Expression
        }
    }
    export type export_declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'export keyword': s_primitives.Keyword
        'type keyword': p_.Optional_Value<s_primitives.Keyword>
        'type': export_declaration.type_
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
    export namespace export_declaration {
        export type type_ =
            | ['all', export_declaration.all]
            | ['named', export_declaration.named]
            | ['namespace', export_declaration.namespace_]
        export type all = {
            'asterisk token': s_primitives.Keyword
            'as': p_.Optional_Value<As_Alias>
        }
        export type named = {
            'open brace token': s_primitives.Keyword
            'exports': h.Separated_List<export_declaration.type_named_exports>
            'close brace token': s_primitives.Keyword
        }
        export type namespace_ = {
            'asterisk token': s_primitives.Keyword
            'as keyword': s_primitives.Keyword
            'identifier': Identifier
        }
        export type type_named_exports = {
            'type keyword': p_.Optional_Value<s_primitives.Keyword>
            'identifier': Identifier
            'as': p_.Optional_Value<As_Alias>
        }
    }
    export type expr = {
        'jsdoc': JSDoc
        'expression': Expression
        'semicolon': Semi_Colon
    }
    export type for_ = {
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
    export type for_in = {
        'jsdoc': JSDoc
        'for keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'initializer': for_in.initializer
        'in keyword': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
        'semicolon': Semi_Colon
    }
    export namespace for_in {
        export type initializer =
            | ['variable declaration list', Variable_Declaration_List]
            | ['expression', Expression]
    }
    export type for_of = {
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
    export type function_declaration = {
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
    export type if_ = {
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
    export namespace import_ {
        export type clause = {
            'type keyword': p_.Optional_Value<s_primitives.Keyword>
            'type':
            | ['named imports', named_imports]
            | ['namespace import', namespace_]
            | ['identifier', import_.identifier]
            | ['defer', import_.defer]
        }
        export type identifier = {
            'identifier': Identifier
            'named': p_.Optional_Value<{
                'comma token': s_primitives.Keyword
                'bindings':
                | ['named imports', named_imports]
                | ['namespace import', namespace_]
            }>
        }
        export type defer = {
            'defer keyword': s_primitives.Keyword
            'import':
            | ['identifier', Identifier]
            | ['namespace import', namespace_]
            | ['named imports', named_imports]
        }
        export type named_imports = {
            'open brace token': s_primitives.Keyword
            'entries': h.Separated_List<{
                'type keyword': p_.Optional_Value<s_primitives.Keyword>
                'identifier': Identifier
                'as': p_.Optional_Value<As_Alias>
            }>
            'close brace token': s_primitives.Keyword
        }
        export type namespace_ = {
            'asterisk token': s_primitives.Keyword
            'as keyword': s_primitives.Keyword
            'identifier': Identifier
        }
    }
    export type import_declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'import keyword': s_primitives.Keyword
        'clause': p_.Optional_Value<import_.clause>
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
    export type import_equals = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'import keyword': s_primitives.Keyword
        'type keyword': p_.Optional_Value<s_primitives.Keyword>
        'identifier': Identifier
        'initializer': Initializer
        'semicolon': Semi_Colon
    }
    export type interface_ = {
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
    export type labeled = {
        'jsdoc': JSDoc
        'identifier': Identifier
        'colon token': s_primitives.Keyword
        'statement': Statement
    }
    export type module_declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'type':
        | ['global', Identifier]
        | ['module', module_declaration.module_]
        | ['namespace', module_declaration.namespace_]
        'block': p_.Optional_Value<Module_Body>
        'semicolon': Semi_Colon
    }
    export namespace module_declaration {
        export type module_ = {
            'keyword': s_primitives.Keyword
            'name': Property_Name
        }
        export type namespace_ = {
            'keyword': s_primitives.Keyword
            'name': Identifier
        }
    }
    export type namespace_export = {
        'jsdoc': JSDoc
        'export keyword': s_primitives.Keyword
        'as keyword': s_primitives.Keyword
        'namespace keyword': s_primitives.Keyword
        'identifier': Identifier
        'semicolon': Semi_Colon
    }
    export type return_ = {
        'jsdoc': JSDoc
        'return keyword': s_primitives.Keyword
        'expression': p_.Optional_Value<Expression>
        'semicolon': Semi_Colon
    }
    export type throw_ = {
        'jsdoc': JSDoc
        'throw keyword': s_primitives.Keyword
        'expression': Expression
        'semicolon': Semi_Colon
    }
    export type switch_ = {
        'jsdoc': JSDoc
        'switch keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'case block': {
            'open brace token': s_primitives.Keyword
            'clauses': p_.List<switch_.case_clause>
            'close brace token': s_primitives.Keyword
        }
        'semicolon': Semi_Colon
    }
    export namespace switch_ {
        export type case_clause =
            | ['case', switch_.case_]
            | ['default', switch_.default_]
        export type case_ = {
            'case keyword': s_primitives.Keyword
            'expression': Expression
            'colon token': s_primitives.Keyword
            'statements': Statements
        }
        export type default_ = {
            'default keyword': s_primitives.Keyword
            'colon token': s_primitives.Keyword
            'statements': Statements
        }
    }
    export type try_ = {
        'jsdoc': JSDoc
        'try keyword': s_primitives.Keyword
        'try block': Block
        'catch clause': p_.Optional_Value<try_.catch_clause>
        'finally block': p_.Optional_Value<{
            'finally keyword': s_primitives.Keyword
            'block': Block
        }>
        'semicolon': Semi_Colon
    }
    export namespace try_ {
        export type catch_clause = {
            'catch keyword': s_primitives.Keyword
            'binding': p_.Optional_Value<{
                'open parenthesis token': s_primitives.Keyword
                'variable declaration': Variable_Declaration
                'close parenthesis token': s_primitives.Keyword
            }>
            'block': Block
        }
    }
    export type type_alias_declaration = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'type keyword': s_primitives.Keyword
        'identifier': Identifier
        'type parameters': Type_Parameters
        'equals token': s_primitives.Keyword
        'type': Type
        'semicolon': Semi_Colon
    }
    export type variable = {
        'jsdoc': JSDoc
        'modifiers': Statement_Modifiers
        'variable declaration list': Variable_Declaration_List
        'semicolon': Semi_Colon
    }
    export type while_ = {
        'jsdoc': JSDoc
        'while keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
    }
    export type with_ = {
        'jsdoc': JSDoc
        'with keyword': s_primitives.Keyword
        'open parenthesis token': s_primitives.Keyword
        'expression': Expression
        'close parenthesis token': s_primitives.Keyword
        'statement': Statement
    }
}

export type Statement_Modifiers = p_.Optional_Value<p_.List<Statement_Modifiers.l>>

export namespace Statement_Modifiers {
    export type l =
        | ['abstract', s_primitives.Keyword]
        | ['accessor', s_primitives.Keyword]
        | ['async', s_primitives.Keyword]
        | ['const', s_primitives.Keyword]
        | ['declare', s_primitives.Keyword]
        | ['decorator', Statement_Modifiers.decorator]
        | ['default', s_primitives.Keyword]
        | ['export', s_primitives.Keyword]
        | ['private', s_primitives.Keyword]
        | ['protected', s_primitives.Keyword]
        | ['public', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        | ['static', s_primitives.Keyword]
    export type decorator = {
        'at token': s_primitives.Keyword
        'expression': Expression
    }
}

export type Statements = p_.List<Statement>

export type String_Literal = s_primitives.Literal

export type Module_Specifier =
    | ['identifier', Identifier]
    | ['string literal', String_Literal]
    | ['template', Expression.template]

export type Type =
    | ['any', s_primitives.Keyword]
    | ['array', Type.array]
    | ['big int', s_primitives.Keyword]
    | ['boolean', s_primitives.Keyword]
    | ['conditional', Type.conditional]
    | ['constructor', Type.constructor_]
    | ['function', Type.function_type]
    | ['import type', Type.import_]
    | ['indexed access', Type.indexed_access]
    | ['infer', Type.infer_]
    | ['intrinsic', s_primitives.Keyword]
    | ['intersection', Type.intersection]
    | ['jsdoc all', Type.jsdoc_all]
    | ['jsdoc function', Type.jsdoc_function]
    | ['jsdoc non nullable', Type.jsdoc_non_nullable]
    | ['jsdoc nullable', Type.jsdoc_nullable]
    | ['jsdoc unknown', Type.jsdoc_unknown]
    | ['literal type', Type.literal]
    | ['mapped', Type.mapped]
    | ['never', s_primitives.Keyword]
    | ['number', s_primitives.Keyword]
    | ['object', s_primitives.Keyword]
    | ['optional type', Type.optional]
    | ['parenthesized', Type.parenthesized]
    | ['query', Type.query]
    | ['string', s_primitives.Keyword]
    | ['symbol', s_primitives.Keyword]
    | ['this', s_primitives.Keyword]
    | ['tuple type', Type.tuple]
    | ['template literal type', Type.template_literal]
    | ['type literal', Object_Type]
    | ['type operator', Type.type_operator]
    | ['type predicate', Type_Predicate]
    | ['type reference', Type.type_reference]
    | ['rest type', Type.rest]
    | ['union type', Type.union]
    | ['undefined', s_primitives.Keyword]
    | ['unknown', s_primitives.Keyword]
    | ['void', s_primitives.Keyword]

export namespace Type {
    export type array = {
        'element type': Type
        'open bracket token': s_primitives.Keyword
        'close bracket token': s_primitives.Keyword
    }
    export type conditional = {
        'check type': Type
        'extends keyword': s_primitives.Keyword
        'extends type': Type
        'question token': s_primitives.Keyword
        'true type': Type
        'colon token': s_primitives.Keyword
        'false type': Type
    }
    export type constructor_ = {
        'modifiers': Signature_Modifiers
        'new keyword': s_primitives.Keyword
        'type parameters': Type_Parameters
        'parameters': Parameters
        'equals greater than token': s_primitives.Keyword
        'type': Type
    }
    export type function_type = {
        'type parameters': Type_Parameters
        'parameters': Parameters
        'type': Optional_Type
        'equals greater than token': s_primitives.Keyword
        'return type': Type
    }
    export type import_ = {
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
    export type indexed_access = {
        'object type': Type
        'open bracket token': s_primitives.Keyword
        'index type': Type
        'close bracket token': s_primitives.Keyword
    }
    export type infer_ = {
        'infer keyword': s_primitives.Keyword
        'type parameter': {
            'identifier': Identifier
            'extends': p_.Optional_Value<{
                'extends keyword': s_primitives.Keyword
                'type': Type
            }>
        }
    }
    export type intersection = h.Separated_List<Type>
    export type jsdoc_all = {
        'asterisk token': s_primitives.Keyword
    }
    export type jsdoc_function = {
        'function keyword': s_primitives.Keyword
        'parameters': Parameters
        'type': Optional_Type
    }
    export type jsdoc_non_nullable = {
        'exclamation token before': p_.Optional_Value<s_primitives.Keyword>
        'type': Type
        'exclamation token after': p_.Optional_Value<s_primitives.Keyword>
    }
    export type jsdoc_nullable = {
        'question token before': p_.Optional_Value<s_primitives.Keyword>
        'type': Type
        'question token after': p_.Optional_Value<s_primitives.Keyword>
    }
    export type jsdoc_unknown = {
        'question token': s_primitives.Keyword
    }
    export type literal = {
        'type':
        | ['bigint literal', s_primitives.Literal]
        | ['false keyword', s_primitives.Keyword]
        | ['negative numeric literal', literal.negative_numeric_literal]
        | ['no substitution template literal', s_primitives.Literal]
        | ['null', s_primitives.Keyword]
        | ['numeric literal', Numeric_Literal]
        | ['string literal', String_Literal]
        | ['true keyword', s_primitives.Keyword]
    }
    export namespace literal {
        export type negative_numeric_literal = {
            'minus token': s_primitives.Keyword
            'value': Numeric_Literal
        }
    }
    export type mapped = {
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
        'dummy syntax list': p_.List<Object_Type.signature>
        'close brace token': s_primitives.Keyword
    }
    export type optional = {
        'type': Type
        'question token': s_primitives.Keyword
    }
    export type parenthesized = {
        'open parenthesis token': s_primitives.Keyword
        'type': Type
        'close parenthesis token': s_primitives.Keyword
    }
    export type query = {
        'typeof keyword': s_primitives.Keyword
        'name': Entity_Name
        'type arguments': Type_Arguments
    }
    export type template_literal = {
        'head': s_primitives.Literal
        'template spans': p_.List<{
            'type': Type
            'suffix':
            | ['middle', s_primitives.Literal]
            | ['tail', s_primitives.Literal]
        }>
    }
    export type rest = {
        'dot dot dot token': s_primitives.Keyword
        'type': Type
    }
    export type tuple = {
        readonly 'open bracket token': s_primitives.Keyword
        'elements': h.Separated_List<tuple.element>
        'close bracket token': s_primitives.Keyword
    }
    export namespace tuple {
        export type element =
            | ['named', tuple.named]
            | ['regular', Type]
        export type named = {
            'jsdoc': JSDoc
            'dot dot dot token': p_.Optional_Value<s_primitives.Keyword>
            'name': Identifier
            'question token': p_.Optional_Value<s_primitives.Keyword>
            'colon token': s_primitives.Keyword
            'type': Type
        }
    }
    export type type_operator = {
        'operator':
        | ['key of', s_primitives.Keyword]
        | ['unique', s_primitives.Keyword]
        | ['readonly', s_primitives.Keyword]
        'type': Type
    }
    export type type_reference = {
        'entity name': Entity_Name
        'dot token': p_.Optional_Value<s_primitives.Keyword>
        'type arguments': Type_Arguments
        'error recovery': Error_Recovery
    }
    export type union = {
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
    'entries': h.Separated_List<Type_Parameters.entries>
    'greater than token': s_primitives.Keyword
}>

export namespace Type_Parameters {
    export type entries = {
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
    | ['await using', Variable_Declaration_List.mutability.await_using]
    | ['const', s_primitives.Keyword]
    | ['let', s_primitives.Keyword]
    | ['using', s_primitives.Keyword]
    | ['var', s_primitives.Keyword]
    'declarations': h.Separated_List<Variable_Declaration>
}

export namespace Variable_Declaration_List {
    export namespace mutability {
        export type await_using = {
            'await keyword': s_primitives.Keyword
            'using keyword': s_primitives.Keyword
        }
    }
}
