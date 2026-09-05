import * as p_ from 'pareto-core/transformer'
import p_unreachable_code_path from 'pareto-core/transformer/specials/unreachable_code_path'

import type * as s_out from "pareto-untyped-syntax-tree-api/schemas/untyped_syntax_tree/schema"
import type * as s_in from "../schema.js"

export const Expression: p_.Transformer<s_in.Expression, s_out.Node['location']> = ($): s_out.Node['location'] => {
    switch ($[0]) {
        case 'array literal': return p_.option($, ($) => $['open bracket token'].location)
        case 'arrow function': return p_.option($, ($) => $['equals greater than token'].location)
        case 'as expression': return p_.option($, ($) => $['as keyword'].location)
        case 'assertion': return p_.option($, ($) => $['less than token'].location)
        case 'await': return p_.option($, ($) => $['await keyword'].location)
        case 'big int literal': return p_.option($, ($) => $.location)
        case 'binary': return p_.option($, ($) => p_.from.state($['operator token']).decide(
            ($) => {
                switch ($[0]) {
                    case '==': return p_.option($, ($) => $.location)
                    case '!=': return p_.option($, ($) => $.location)
                    case '===': return p_.option($, ($) => $.location)
                    case '!==': return p_.option($, ($) => $.location)
                    case '<': return p_.option($, ($) => $.location)
                    case '<=': return p_.option($, ($) => $.location)
                    case '>': return p_.option($, ($) => $.location)
                    case '>=': return p_.option($, ($) => $.location)
                    case '<<': return p_.option($, ($) => $.location)
                    case '>>': return p_.option($, ($) => $.location)
                    case '>>>': return p_.option($, ($) => $.location)
                    case '+': return p_.option($, ($) => $.location)
                    case '-': return p_.option($, ($) => $.location)
                    case '*': return p_.option($, ($) => $.location)
                    case '/': return p_.option($, ($) => $.location)
                    case '%': return p_.option($, ($) => $.location)
                    case '|': return p_.option($, ($) => $.location)
                    case '^': return p_.option($, ($) => $.location)
                    case '&': return p_.option($, ($) => $.location)
                    case 'in': return p_.option($, ($) => $.location)
                    case '%=': return p_.option($, ($) => $.location)
                    case 'instanceof': return p_.option($, ($) => $.location)
                    case '&&': return p_.option($, ($) => $.location)
                    case '&&=': return p_.option($, ($) => $.location)
                    case '&=': return p_.option($, ($) => $.location)
                    case '||': return p_.option($, ($) => $.location)
                    case '||=': return p_.option($, ($) => $.location)
                    case '|=': return p_.option($, ($) => $.location)
                    case '??': return p_.option($, ($) => $.location)
                    case '??=': return p_.option($, ($) => $.location)
                    case '<<=': return p_.option($, ($) => $.location)
                    case '>>=': return p_.option($, ($) => $.location)
                    case '>>>=': return p_.option($, ($) => $.location)
                    case '**': return p_.option($, ($) => $.location)
                    case '**=': return p_.option($, ($) => $.location)
                    case '*=': return p_.option($, ($) => $.location)
                    case '+=': return p_.option($, ($) => $.location)
                    case '-=': return p_.option($, ($) => $.location)
                    case '/=': return p_.option($, ($) => $.location)
                    case ',': return p_.option($, ($) => $.location)
                    case '=': return p_.option($, ($) => $.location)
                    case '^=': return p_.option($, ($) => $.location)
                    default: return p_.exhaustive($[0])
                }
            }
        ))

        case 'call': return p_.option($, ($) => $.arguments['open parenthesis token'].location)
        case 'class': return p_.option($, ($) => $['class keyword'].location)
        case 'conditional': return p_.option($, ($) => $['question token'].location)
        case 'delete': return p_.option($, ($) => $['delete keyword'].location)
        case 'element access': return p_.option($, ($) => $['open bracket token'].location)
        case 'external module reference': return p_.option($, ($) => $['require keyword'].location)
        case 'false': return p_.option($, ($) => $.location)
        case 'function': return p_.option($, ($) => $['function keyword'].location)
        case 'identifier': return p_.option($, ($) => $.location)
        case 'import keyword': return p_.option($, ($) => $.location)
        case 'jsdoc': return p_.option($, ($) => p_unreachable_code_path("jsdoc should have data, issue in pareto-typescript"))
        case 'meta property': return p_.option($, ($) => $['dot token'].location)
        case 'new': return p_.option($, ($) => $['new keyword'].location)
        case 'no substitution template literal': return p_.option($, ($) => $.location)
        case 'non null': return p_.option($, ($) => $['exclamation token'].location)
        case 'null keyword': return p_.option($, ($) => $.location)
        case 'numeric literal': return p_.option($, ($) => $.location)

        case 'object literal': return p_.option($, ($) => $['open brace token'].location)
        case 'omitted expression': return p_.option($, ($) => $.location)
        case 'parenthesized': return p_.option($, ($) => $['open parenthesis token'].location)
        case 'postfix unary': return p_.option($, ($) => p_.from.state($['operator token']).decide(
            ($) => {
                switch ($[0]) {
                    case '++': return p_.option($, ($) => $.location)
                    case '--': return p_.option($, ($) => $.location)
                    default: return p_.exhaustive($[0])
                }
            }
        ))
        case 'prefix unary': return p_.option($, ($) => p_.from.state($['operator token']).decide(
            ($) => {
                switch ($[0]) {
                    case '+': return p_.option($, ($) => $.location)
                    case '-': return p_.option($, ($) => $.location)
                    case '~': return p_.option($, ($) => $.location)
                    case '!': return p_.option($, ($) => $.location)
                    case '++': return p_.option($, ($) => $.location)
                    case '--': return p_.option($, ($) => $.location)
                    default: return p_.exhaustive($[0])
                }
            }
        ))
        case 'private identifier': return p_.option($, ($) => $.location)
        case 'property access': return p_.option($, ($) => p_.from.state($['dot token']).decide(
            ($) => {
                switch ($[0]) {
                    case '.': return p_.option($, ($) => $.location)
                    case '?.': return p_.option($, ($) => $.location)
                    default: return p_.exhaustive($[0])
                }
            }
        ))
        case 'qualified name': return p_.option($, ($) => $['dot token'].location)
        case 'regular expression literal': return p_.option($, ($) => $.location)
        case 'satisfies': return p_.option($, ($) => $['satisfies keyword'].location)
        case 'spread element': return p_.option($, ($) => $['dot dot dot token'].location)
        case 'string literal': return p_.option($, ($) => $.location)
        case 'super': return p_.option($, ($) => $.location)
        case 'tagged template': return p_.option($, ($) => p_.from.state($.template).decide(
            ($) => {
                switch ($[0]) {
                    case 'no substitution template literal': return p_.option($, ($) => $.location)
                    case 'template': return p_.option($, ($) => $.head.location)
                    default: return p_.exhaustive($[0])
                }
            }
        ))
        case 'template': return p_.option($, ($) => $.head.location)
        case 'this': return p_.option($, ($) => $.location)
        case 'true keyword': return p_.option($, ($) => $.location)
        case 'type of': return p_.option($, ($) => $['type of keyword'].location)
        case 'void': return p_.option($, ($) => $['void keyword'].location)
        case 'with type arguments': return p_.option($, ($) => p_.from.optional($['type arguments']).decide(
            ($) => $['less than token'].location,
            () => p_unreachable_code_path("with type arguments should always have type arguments, issue in pareto-typescript")
        ))
        case 'yield': return p_.option($, ($) => $['yield keyword'].location)
        default: return p_.exhaustive($[0])
    }
}

export const Statement: p_.Transformer<s_in.Statement, s_out.Node['location']> = ($) => {
    switch ($[0]) {
        case 'block': return p_.option($, ($) => $['open brace token'].location)
        case 'break': return p_.option($, ($) => $['break keyword'].location)
        case 'class': return p_.option($, ($) => $.class['class keyword'].location)
        case 'continue': return p_.option($, ($) => $['continue keyword'].location)
        case 'debugger': return p_.option($, ($) => $['debugger keyword'].location)
        case 'do': return p_.option($, ($) => $['do keyword'].location)
        case 'empty': return p_.option($, ($) => $['semicolon token'].location)
        case 'enum': return p_.option($, ($) => $['enum keyword'].location)
        case 'export assignment': return p_.option($, ($) => $['export keyword'].location)
        case 'export declaration': return p_.option($, ($) => $['export keyword'].location)
        case 'expression': return p_.option($, ($) => Expression($.expression))

        case 'for': return p_.option($, ($) => $['for keyword'].location)
        case 'for in': return p_.option($, ($) => $['for keyword'].location)
        case 'for of': return p_.option($, ($) => $['for keyword'].location)
        case 'function': return p_.option($, ($) => $['function keyword'].location)
        case 'if': return p_.option($, ($) => $['if keyword'].location)
        case 'import': return p_.option($, ($) => $['import keyword'].location)
        case 'import equals': return p_.option($, ($) => $['import keyword'].location)
        case 'interface': return p_.option($, ($) => $['interface keyword'].location)
        case 'labeled': return p_.option($, ($) => $.identifier.location)
        case 'module': return p_.option($, ($) => p_.from.state($.type).decide(
            ($) => {
                switch ($[0]) {
                    case 'module': return p_.option($, ($) => $.keyword.location)
                    case 'global': return p_.option($, ($) => $.location)
                    case 'namespace': return p_.option($, ($) => $.keyword.location)
                    default: return p_.exhaustive($[0])
                }
            }
        ))
        case 'namespace export': return p_.option($, ($) => $['export keyword'].location)
        case 'return': return p_.option($, ($) => $['return keyword'].location)
        case 'switch': return p_.option($, ($) => $['switch keyword'].location)
        case 'throw': return p_.option($, ($) => $['throw keyword'].location)
        case 'try': return p_.option($, ($) => $['try keyword'].location)
        case 'type alias': return p_.option($, ($) => $['type keyword'].location)
        case 'variable': return p_.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'variable': return p_.option($, ($) => p_.from.state($['variable declaration list'].mutability).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'const': return p_.option($, ($) => $.location)
                                case 'await using': return p_.option($, ($) => $['await keyword'].location)
                                case 'let': return p_.option($, ($) => $.location)
                                case 'using': return p_.option($, ($) => $.location)
                                case 'var': return p_.option($, ($) => $.location)
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ))
                    default: return p_.exhaustive($[0])
                }
            }
        )
        case 'while': return p_.option($, ($) => $['while keyword'].location)
        case 'with': return p_.option($, ($) => $['with keyword'].location)
        default: return p_.exhaustive($[0])
    }
}

// export const Type: p_.Transformer<s_in.Type, s_out.Node['location']> = ($) => {
//     switch ($[0]) {
//         case 'any': return p_.option($, ($) => $.location)
//         case 'array': return p_.option($, ($) => $['open bracket token'].location)
//         case 'big int': return p_.option($, ($) => $.location)
//         case 'boolean': return p_.option($, ($) => $.location)
//         case 'conditional': return p_.option($, ($) => $['question token'].location)
//         case 'constructor': return p_.option($, ($) => $['new keyword'].location)
//         case 'function': return p_.option($, ($) => $['equals greater than token'].location)
//         case 'import type': return p_.option($, ($) => $['import keyword'].location)
//         case 'indexed access': return p_.option($, ($) => $['open bracket token'].location)
//         case 'infer': return p_.option($, ($) => $['infer keyword'].location)
//         case 'intersection': return p_.option($, ($) => $.location)
//         case 'intrinsic': return p_.option($, ($) => $.location)
//         case 'jsdoc all': return p_.option($, ($) => $['asterisk token'].location)
//         case 'jsdoc function': return p_.option($, ($) => $['function keyword'].location)
//         case 'jsdoc non nullable': return p_.option($, ($) => $['exclamation token after'].location)
//         case 'jsdoc nullable': return p_.option($, ($) => Type($.type))
//         case 'jsdoc unknown': return p_.option($, ($) => $['question token'].location)
//         case 'literal type': return p_.option($, ($) => xxx)
//         case 'mapped': return p_.option($, ($) => $['open brace token'].location)
//         case 'never': return p_.option($, ($) => $.location)
//         case 'number': return p_.option($, ($) => $.location)
//         case 'object': return p_.option($, ($) => $.location)
//         case 'optional type': return p_.option($, ($) => $['question token'].location)
//         case 'parenthesized': return p_.option($, ($) => $['open parenthesis token'].location)
//         case 'query': return p_.option($, ($) => $['typeof keyword'].location)
//         case 'rest type': return p_.option($, ($) => $['dot dot dot token'].location)
//         case 'string': return p_.option($, ($) => $.location)
//         case 'symbol': return p_.option($, ($) => $.location)
//         case 'template literal type': return p_.option($, ($) => $.head.location)
//         case 'this': return p_.option($, ($) => $.location)
//         case 'tuple type': return p_.option($, ($) => $['open bracket token'].location)
//         case 'type literal': return p_.option($, ($) => $['open brace token'].location)
//         case 'type operator': return p_.option($, ($) => p_.from.state($.operator).decide(
//             ($) => {
//                 switch ($[0]) {
//                     case 'key of': return p_.option($, ($) => $.location)
//                     case 'unique': return p_.option($, ($) => $.location)
//                     case 'readonly': return p_.option($, ($) => $.location)
//                     default: return p_.exhaustive($[0])
//                 }
//             }
//         ))
//         case 'type predicate': return p_.option($, ($) => $..location)
//         case 'type reference': return p_.option($, ($) => p_.from.state($['entity name']).decide(
//             ($) => {
//                 switch ($[0]) {
//                     case 'identifier': return p_.option($, ($) => $.location)
//                     case 'qualified name': return p_.option($, ($) => $['dot token'].location)
//                     default: return p_.exhaustive($[0])
//                 }
//             }
//         ))
//         case 'undefined': return p_.option($, ($) => $.location)
//         case 'union type': return p_.option($, ($) => $.location)
//         case 'unknown': return p_.option($, ($) => $.location)
//         case 'void': return p_.option($, ($) => $.location)
//         default: return p_.exhaustive($[0])
//     }
// }