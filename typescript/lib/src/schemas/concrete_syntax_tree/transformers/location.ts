import * as p_ from 'pareto-core/implementation/transformer'
import p_unreachable_code_path from 'pareto-core/implementation/transformer/specials/unreachable_code_path'

import type * as s_out from "pareto-untyped-syntax-tree-api/schemas/untyped_syntax_tree/schema"
import type * as s_in from "../schema.js"

export const Expression: p_.Transformer<s_in.Expression, s_out.Node['location']> = ($): s_out.Node['location'] => {
    switch ($[0]) {
        case 'array literal': return p_.ss($, ($) => $['open bracket token'].location)
        case 'arrow function': return p_.ss($, ($) => $['equals greater than token'].location)
        case 'as expression': return p_.ss($, ($) => $['as keyword'].location)
        case 'assertion': return p_.ss($, ($) => $['less than token'].location)
        case 'await': return p_.ss($, ($) => $['await keyword'].location)
        case 'big int literal': return p_.ss($, ($) => $.location)
        case 'binary': return p_.ss($, ($) => p_.from.state($['operator token']).decide(
            ($) => {
                switch ($[0]) {
                    case '==': return p_.ss($, ($) => $.location)
                    case '!=': return p_.ss($, ($) => $.location)
                    case '===': return p_.ss($, ($) => $.location)
                    case '!==': return p_.ss($, ($) => $.location)
                    case '<': return p_.ss($, ($) => $.location)
                    case '<=': return p_.ss($, ($) => $.location)
                    case '>': return p_.ss($, ($) => $.location)
                    case '>=': return p_.ss($, ($) => $.location)
                    case '<<': return p_.ss($, ($) => $.location)
                    case '>>': return p_.ss($, ($) => $.location)
                    case '>>>': return p_.ss($, ($) => $.location)
                    case '+': return p_.ss($, ($) => $.location)
                    case '-': return p_.ss($, ($) => $.location)
                    case '*': return p_.ss($, ($) => $.location)
                    case '/': return p_.ss($, ($) => $.location)
                    case '%': return p_.ss($, ($) => $.location)
                    case '|': return p_.ss($, ($) => $.location)
                    case '^': return p_.ss($, ($) => $.location)
                    case '&': return p_.ss($, ($) => $.location)
                    case 'in': return p_.ss($, ($) => $.location)
                    case '%=': return p_.ss($, ($) => $.location)
                    case 'instanceof': return p_.ss($, ($) => $.location)
                    case '&&': return p_.ss($, ($) => $.location)
                    case '&&=': return p_.ss($, ($) => $.location)
                    case '&=': return p_.ss($, ($) => $.location)
                    case '||': return p_.ss($, ($) => $.location)
                    case '||=': return p_.ss($, ($) => $.location)
                    case '|=': return p_.ss($, ($) => $.location)
                    case '??': return p_.ss($, ($) => $.location)
                    case '??=': return p_.ss($, ($) => $.location)
                    case '<<=': return p_.ss($, ($) => $.location)
                    case '>>=': return p_.ss($, ($) => $.location)
                    case '>>>=': return p_.ss($, ($) => $.location)
                    case '**': return p_.ss($, ($) => $.location)
                    case '**=': return p_.ss($, ($) => $.location)
                    case '*=': return p_.ss($, ($) => $.location)
                    case '+=': return p_.ss($, ($) => $.location)
                    case '-=': return p_.ss($, ($) => $.location)
                    case '/=': return p_.ss($, ($) => $.location)
                    case ',': return p_.ss($, ($) => $.location)
                    case '=': return p_.ss($, ($) => $.location)
                    case '^=': return p_.ss($, ($) => $.location)
                    default: return p_.au($[0])
                }
            }
        ))

        case 'call': return p_.ss($, ($) => $.arguments['open parenthesis token'].location)
        case 'class': return p_.ss($, ($) => $['class keyword'].location)
        case 'conditional': return p_.ss($, ($) => $['question token'].location)
        case 'delete': return p_.ss($, ($) => $['delete keyword'].location)
        case 'element access': return p_.ss($, ($) => $['open bracket token'].location)
        case 'external module reference': return p_.ss($, ($) => $['require keyword'].location)
        case 'false': return p_.ss($, ($) => $.location)
        case 'function': return p_.ss($, ($) => $['function keyword'].location)
        case 'identifier': return p_.ss($, ($) => $.location)
        case 'import keyword': return p_.ss($, ($) => $.location)
        case 'jsdoc': return p_.ss($, ($) => p_unreachable_code_path("jsdoc should have data, issue in pareto-typescript"))
        case 'meta property': return p_.ss($, ($) => $['dot token'].location)
        case 'new': return p_.ss($, ($) => $['new keyword'].location)
        case 'no substitution template literal': return p_.ss($, ($) => $.location)
        case 'non null': return p_.ss($, ($) => $['exclamation token'].location)
        case 'null keyword': return p_.ss($, ($) => $.location)
        case 'numeric literal': return p_.ss($, ($) => $.location)

        case 'object literal': return p_.ss($, ($) => $['open brace token'].location)
        case 'omitted expression': return p_.ss($, ($) => $.location)
        case 'parenthesized': return p_.ss($, ($) => $['open parenthesis token'].location)
        case 'postfix unary': return p_.ss($, ($) => p_.from.state($['operator token']).decide(
            ($) => {
                switch ($[0]) {
                    case '++': return p_.ss($, ($) => $.location)
                    case '--': return p_.ss($, ($) => $.location)
                    default: return p_.au($[0])
                }
            }
        ))
        case 'prefix unary': return p_.ss($, ($) => p_.from.state($['operator token']).decide(
            ($) => {
                switch ($[0]) {
                    case '+': return p_.ss($, ($) => $.location)
                    case '-': return p_.ss($, ($) => $.location)
                    case '~': return p_.ss($, ($) => $.location)
                    case '!': return p_.ss($, ($) => $.location)
                    case '++': return p_.ss($, ($) => $.location)
                    case '--': return p_.ss($, ($) => $.location)
                    default: return p_.au($[0])
                }
            }
        ))
        case 'private identifier': return p_.ss($, ($) => $.location)
        case 'property access': return p_.ss($, ($) => p_.from.state($['dot token']).decide(
            ($) => {
                switch ($[0]) {
                    case '.': return p_.ss($, ($) => $.location)
                    case '?.': return p_.ss($, ($) => $.location)
                    default: return p_.au($[0])
                }
            }
        ))
        case 'qualified name': return p_.ss($, ($) => $['dot token'].location)
        case 'regular expression literal': return p_.ss($, ($) => $.location)
        case 'satisfies': return p_.ss($, ($) => $['satisfies keyword'].location)
        case 'spread element': return p_.ss($, ($) => $['dot dot dot token'].location)
        case 'string literal': return p_.ss($, ($) => $.location)
        case 'super': return p_.ss($, ($) => $.location)
        case 'tagged template': return p_.ss($, ($) => p_.from.state($.template).decide(
            ($) => {
                switch ($[0]) {
                    case 'no substitution template literal': return p_.ss($, ($) => $.location)
                    case 'template': return p_.ss($, ($) => $.head.location)
                    default: return p_.au($[0])
                }
            }
        ))
        case 'template': return p_.ss($, ($) => $.head.location)
        case 'this': return p_.ss($, ($) => $.location)
        case 'true keyword': return p_.ss($, ($) => $.location)
        case 'type of': return p_.ss($, ($) => $['type of keyword'].location)
        case 'void': return p_.ss($, ($) => $['void keyword'].location)
        case 'with type arguments': return p_.ss($, ($) => p_.from.optional($['type arguments']).decide(
            ($) => $['less than token'].location,
            () => p_unreachable_code_path("with type arguments should always have type arguments, issue in pareto-typescript")
        ))
        case 'yield': return p_.ss($, ($) => $['yield keyword'].location)
        default: return p_.au($[0])
    }
}

export const Statement: p_.Transformer<s_in.Statement, s_out.Node['location']> = ($) => {
    switch ($[0]) {
        case 'block': return p_.ss($, ($) => $['open brace token'].location)
        case 'break': return p_.ss($, ($) => $['break keyword'].location)
        case 'class': return p_.ss($, ($) => $.class['class keyword'].location)
        case 'continue': return p_.ss($, ($) => $['continue keyword'].location)
        case 'debugger': return p_.ss($, ($) => $['debugger keyword'].location)
        case 'do': return p_.ss($, ($) => $['do keyword'].location)
        case 'empty': return p_.ss($, ($) => $['semicolon token'].location)
        case 'enum': return p_.ss($, ($) => $['enum keyword'].location)
        case 'export assignment': return p_.ss($, ($) => $['export keyword'].location)
        case 'export declaration': return p_.ss($, ($) => $['export keyword'].location)
        case 'expression': return p_.ss($, ($) => Expression($.expression))

        case 'for': return p_.ss($, ($) => $['for keyword'].location)
        case 'for in': return p_.ss($, ($) => $['for keyword'].location)
        case 'for of': return p_.ss($, ($) => $['for keyword'].location)
        case 'function': return p_.ss($, ($) => $['function keyword'].location)
        case 'if': return p_.ss($, ($) => $['if keyword'].location)
        case 'import': return p_.ss($, ($) => $['import keyword'].location)
        case 'import equals': return p_.ss($, ($) => $['import keyword'].location)
        case 'interface': return p_.ss($, ($) => $['interface keyword'].location)
        case 'labeled': return p_.ss($, ($) => $.identifier.location)
        case 'module': return p_.ss($, ($) => p_.from.state($.type).decide(
            ($) => {
                switch ($[0]) {
                    case 'module': return p_.ss($, ($) => $.keyword.location)
                    case 'global': return p_.ss($, ($) => $.location)
                    case 'namespace': return p_.ss($, ($) => $.keyword.location)
                    default: return p_.au($[0])
                }
            }
        ))
        case 'namespace export': return p_.ss($, ($) => $['export keyword'].location)
        case 'return': return p_.ss($, ($) => $['return keyword'].location)
        case 'switch': return p_.ss($, ($) => $['switch keyword'].location)
        case 'throw': return p_.ss($, ($) => $['throw keyword'].location)
        case 'try': return p_.ss($, ($) => $['try keyword'].location)
        case 'type alias': return p_.ss($, ($) => $['type keyword'].location)
        case 'variable': return p_.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'variable': return p_.ss($, ($) => p_.from.state($['variable declaration list'].mutability).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'const': return p_.ss($, ($) => $.location)
                                case 'await using': return p_.ss($, ($) => $['await keyword'].location)
                                case 'let': return p_.ss($, ($) => $.location)
                                case 'using': return p_.ss($, ($) => $.location)
                                case 'var': return p_.ss($, ($) => $.location)
                                default: return p_.au($[0])
                            }
                        }
                    ))
                    default: return p_.au($[0])
                }
            }
        )
        case 'while': return p_.ss($, ($) => $['while keyword'].location)
        case 'with': return p_.ss($, ($) => $['with keyword'].location)
        default: return p_.au($[0])
    }
}

// export const Type: p_.Transformer<s_in.Type, s_out.Node['location']> = ($) => {
//     switch ($[0]) {
//         case 'any': return p_.ss($, ($) => $.location)
//         case 'array': return p_.ss($, ($) => $['open bracket token'].location)
//         case 'big int': return p_.ss($, ($) => $.location)
//         case 'boolean': return p_.ss($, ($) => $.location)
//         case 'conditional': return p_.ss($, ($) => $['question token'].location)
//         case 'constructor': return p_.ss($, ($) => $['new keyword'].location)
//         case 'function': return p_.ss($, ($) => $['equals greater than token'].location)
//         case 'import type': return p_.ss($, ($) => $['import keyword'].location)
//         case 'indexed access': return p_.ss($, ($) => $['open bracket token'].location)
//         case 'infer': return p_.ss($, ($) => $['infer keyword'].location)
//         case 'intersection': return p_.ss($, ($) => $.location)
//         case 'intrinsic': return p_.ss($, ($) => $.location)
//         case 'jsdoc all': return p_.ss($, ($) => $['asterisk token'].location)
//         case 'jsdoc function': return p_.ss($, ($) => $['function keyword'].location)
//         case 'jsdoc non nullable': return p_.ss($, ($) => $['exclamation token after'].location)
//         case 'jsdoc nullable': return p_.ss($, ($) => Type($.type))
//         case 'jsdoc unknown': return p_.ss($, ($) => $['question token'].location)
//         case 'literal type': return p_.ss($, ($) => xxx)
//         case 'mapped': return p_.ss($, ($) => $['open brace token'].location)
//         case 'never': return p_.ss($, ($) => $.location)
//         case 'number': return p_.ss($, ($) => $.location)
//         case 'object': return p_.ss($, ($) => $.location)
//         case 'optional type': return p_.ss($, ($) => $['question token'].location)
//         case 'parenthesized': return p_.ss($, ($) => $['open parenthesis token'].location)
//         case 'query': return p_.ss($, ($) => $['typeof keyword'].location)
//         case 'rest type': return p_.ss($, ($) => $['dot dot dot token'].location)
//         case 'string': return p_.ss($, ($) => $.location)
//         case 'symbol': return p_.ss($, ($) => $.location)
//         case 'template literal type': return p_.ss($, ($) => $.head.location)
//         case 'this': return p_.ss($, ($) => $.location)
//         case 'tuple type': return p_.ss($, ($) => $['open bracket token'].location)
//         case 'type literal': return p_.ss($, ($) => $['open brace token'].location)
//         case 'type operator': return p_.ss($, ($) => p_.from.state($.operator).decide(
//             ($) => {
//                 switch ($[0]) {
//                     case 'key of': return p_.ss($, ($) => $.location)
//                     case 'unique': return p_.ss($, ($) => $.location)
//                     case 'readonly': return p_.ss($, ($) => $.location)
//                     default: return p_.au($[0])
//                 }
//             }
//         ))
//         case 'type predicate': return p_.ss($, ($) => $..location)
//         case 'type reference': return p_.ss($, ($) => p_.from.state($['entity name']).decide(
//             ($) => {
//                 switch ($[0]) {
//                     case 'identifier': return p_.ss($, ($) => $.location)
//                     case 'qualified name': return p_.ss($, ($) => $['dot token'].location)
//                     default: return p_.au($[0])
//                 }
//             }
//         ))
//         case 'undefined': return p_.ss($, ($) => $.location)
//         case 'union type': return p_.ss($, ($) => $.location)
//         case 'unknown': return p_.ss($, ($) => $.location)
//         case 'void': return p_.ss($, ($) => $.location)
//         default: return p_.au($[0])
//     }
// }