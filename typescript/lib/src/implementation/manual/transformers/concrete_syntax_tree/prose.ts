import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_in from "../../../../interface/data/concrete_syntax_tree.js"
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"

export namespace interface_ {
    export type Arguments = p_i.Transformer<d_in.Arguments, d_out.Phrase>
    export type As_Alias = p_i.Transformer<d_in.As_Alias, d_out.Phrase>
    export type Binding_Pattern = p_i.Transformer<d_in.Binding_Pattern, d_out.Phrase>
    export type Block = p_i.Transformer<d_in.Block, d_out.Phrase>
    export type Class_Body = p_i.Transformer<d_in.Class_Body, d_out.Phrase>
    export type Class = p_i.Transformer<d_in.Class, d_out.Phrase>
    export type Entity_Name = p_i.Transformer<d_in.Entity_Name, d_out.Phrase>
    export type Error_Recovery = p_i.Transformer<d_in.Error_Recovery, d_out.Phrase>
    export type Expression_With_Type_Arguments = p_i.Transformer<d_in.Expression_With_Type_Arguments, d_out.Phrase>
    export type Expression = p_i.Transformer<d_in.Expression, d_out.Phrase>
    export type Heritage = p_i.Transformer<d_in.Heritage, d_out.Phrase>
    export type Identifier = p_i.Transformer<d_in.Identifier, d_out.Phrase>
    export type Initializer = p_i.Transformer<d_in.Initializer, d_out.Phrase>
    export type JSDoc = p_i.Transformer<d_in.JSDoc, d_out.Phrase>
    export type Module_Body = p_i.Transformer<d_in.Module_Body, d_out.Phrase>
    export type Numeric_Literal = p_i.Transformer<d_in.Numeric_Literal, d_out.Phrase>
    export type Object_Type = p_i.Transformer<d_in.Object_Type, d_out.Phrase>
    export type Optional_Initializer = p_i.Transformer<d_in.Optional_Initializer, d_out.Phrase>
    export type Optional_Type = p_i.Transformer<d_in.Optional_Type, d_out.Phrase>
    export type Parameters = p_i.Transformer<d_in.Parameters, d_out.Phrase>
    export type Property_Name = p_i.Transformer<d_in.Property_Name, d_out.Phrase>
    export type Qualified_Name = p_i.Transformer<d_in.Qualified_Name, d_out.Phrase>
    export type Return_Type_Annotation = p_i.Transformer<d_in.Return_Type_Annotation, d_out.Phrase>
    export type Semi_Colon = p_i.Transformer<d_in.Semi_Colon, d_out.Phrase>
    export type Signature_Modifiers = p_i.Transformer<d_in.Signature_Modifiers, d_out.Phrase>
    export type Source_File = p_i.Transformer<d_in.Source_File, d_out.Paragraph>
    export type Statement_Modifiers = p_i.Transformer<d_in.Statement_Modifiers, d_out.Phrase>
    export type Statement = p_i.Transformer<d_in.Statement, d_out.Phrase>
    export type Statements = p_i.Transformer<d_in.Statements, d_out.Paragraph>
    export type String_Literal = p_i.Transformer<d_in.String_Literal, d_out.Phrase>
    export type Type_Arguments = p_i.Transformer<d_in.Type_Arguments, d_out.Phrase>
    export type Type_Parameters = p_i.Transformer<d_in.Type_Parameters, d_out.Phrase>
    export type Type_Predicate = p_i.Transformer<d_in.Type_Predicate, d_out.Phrase>
    export type Type = p_i.Transformer<d_in.Type, d_out.Phrase>
    export type Variable_Declaration_List = p_i.Transformer<d_in.Variable_Declaration_List, d_out.Phrase>
    export type Variable_Declaration = p_i.Transformer<d_in.Variable_Declaration, d_out.Phrase>
}
import * as temp_interface_ from "../../../../interface/declarations/transformers/concrete_syntax_tree/prose.js"

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/target"

export const Arguments: interface_.Arguments = ($) => sh.ph.composed(p_.literal.list([
    p_.from.optional($['question dot token']).decide(
        () => sh.ph.literal("?."),
        () => sh.ph.nothing()
    ),
    Type_Arguments($['type arguments']),
    Error_Recovery($['error recovery']),
    sh.ph.literal("("),
    sh.ph.indent(
        sh.pg.sentences(
            p_.from.list($['arguments']).map(
                ($) => sh.sentence(p_.literal.list([
                    p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'entry': return p_.ss($, ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {

                                            case 'expression': return p_.option($, ($) => Expression($))
                                            case 'spread': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                sh.ph.literal("..."),
                                                Expression($['expression']),
                                            ])))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }
                                ))
                                case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                ]))
            )
        )
    ),
    sh.ph.literal(")"),
]))

export const As_Alias: interface_.As_Alias = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.literal(" as "),
    p_.from.state($.identifier).decide(
        ($) => {
            switch ($[0]) {
                case 'identifier': return p_.ss($, ($) => Identifier($))
                case 'string literal': return p_.ss($, ($) => String_Literal($))
                default: return p_.exhaustive($[0])
            }
        }
    ),
]))

export const Binding_Pattern: interface_.Binding_Pattern = ($) => sh.ph.composed(p_.literal.list([
    JSDoc($['jsdoc']),
    p_.from.optional($['modifiers']).decide(
        ($) => sh.ph.composed(
            p_.from.list($).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'async': return p_.option($, ($) => sh.ph.literal("async "))
                            case 'declare': return p_.option($, ($) => sh.ph.literal("declare "))
                            case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.literal("@"),
                                Expression($['expression']),
                            ])))
                            case 'export': return p_.option($, ($) => sh.ph.literal("export "))
                            case 'override': return p_.option($, ($) => sh.ph.literal("override "))
                            case 'private': return p_.option($, ($) => sh.ph.literal("private "))
                            case 'protected': return p_.option($, ($) => sh.ph.literal("protected "))
                            case 'static': return p_.option($, ($) => sh.ph.literal("static "))
                            case 'public': return p_.option($, ($) => sh.ph.literal("public "))
                            case 'readonly': return p_.option($, ($) => sh.ph.literal("readonly "))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
            ),
        ),
        () => sh.ph.nothing()
    ),
    p_.from.optional($['dot dot dot token']).decide(
        () => sh.ph.literal("..."),
        () => sh.ph.nothing()
    ),
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
                case 'array binding pattern': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    sh.ph.literal("["),
                    sh.ph.composed(
                        p_.from.list($['elements']).map(
                            ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                        case 'entry': return p_.ss($, ($) => p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'binding element': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                        p_.from.optional($['dot dot dot token']).decide(
                                                            () => sh.ph.literal("..."),
                                                            () => sh.ph.nothing()
                                                        ),
                                                        Binding_Pattern($.name),
                                                        p_.from.optional($.initializer).decide(
                                                            ($) => sh.ph.composed(p_.literal.list([
                                                                Initializer($),
                                                            ])),
                                                            () => sh.ph.nothing()
                                                        ),
                                                    ])))
                                                    case 'omitted expression': return p_.option($, ($) => sh.ph.nothing())

                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        ))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        )
                    ),
                    sh.ph.literal("]"),
                ])))
                case 'number keyword': return p_.option($, ($) => sh.ph.literal("number"))
                case 'object binding pattern': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    sh.ph.literal("{"),
                    sh.ph.composed(
                        p_.from.list($['elements']).map(
                            ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            p_.from.optional($['dot dot dot token']).decide(
                                                ($) => sh.ph.literal("..."),
                                                () => sh.ph.nothing()
                                            ),
                                            Property_Name($['property name']),
                                            p_.from.optional($['binding']).decide(
                                                ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal(": "),
                                                    Binding_Pattern($['pattern']),
                                                ])),
                                                () => sh.ph.nothing()
                                            ),
                                            Optional_Initializer($['initializer']),
                                        ])))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        )
                    ),
                    sh.ph.literal("}"),
                ])))
                case 'string keyword': return p_.option($, ($) => sh.ph.literal("string"))
                default: return p_.exhaustive($[0])
            }
        }
    )
]))

export const Block: interface_.Block = ($) => sh.ph.composed(p_.literal.list([
    JSDoc($['jsdoc']),
    sh.ph.literal("{"),
    sh.ph.indent(
        Statements($['statements'])
    ),
    sh.ph.literal("}"),
]))

export const Class: interface_.Class = ($) => sh.ph.composed(p_.literal.list([
    JSDoc($['jsdoc']),
    p_.from.optional($['modifiers']).decide(
        ($) => sh.ph.composed(p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'abstract': return p_.option($, ($) => sh.ph.literal("abstract "))
                        case 'declare': return p_.option($, ($) => sh.ph.literal("declare "))
                        case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal("@"),
                            Expression($['expression']),
                        ])))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )),
        () => sh.ph.nothing()
    ),
    sh.ph.literal("class "),
    p_.from.optional($['identifier']).decide(
        ($) => sh.ph.composed(p_.literal.list([Identifier($), sh.ph.literal(" ")])),
        () => sh.ph.nothing()
    ),
    Type_Parameters($['type parameters']),
    Heritage($.heritage),
    Class_Body($['body']),
]))

export const Class_Body: interface_.Class_Body = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.literal("{"),
    sh.ph.indent(
        sh.pg.sentences(
            p_.from.list($['members']).map(
                ($) => sh.sentence(
                    p_.literal.list([
                        sh.ph.composed(p_.literal.list([
                            p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'constructor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($['modifiers']),
                                            p_.from.state($['constructor keyword']).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'constructor keyword': return p_.option($, () => sh.ph.literal("constructor"))
                                                        case 'constructor keyword as string literal': return p_.option($, () => sh.ph.literal("constructor"))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }
                                            ),
                                            Type_Parameters($['type parameters']),
                                            Parameters($['parameters']),
                                            Return_Type_Annotation($['return type']),
                                            p_.from.optional($['body']).decide(
                                                ($) => Block($),
                                                () => sh.ph.nothing()
                                            ),
                                            Semi_Colon($['semicolon']),
                                        ])))
                                        case 'get accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($['modifiers']),
                                            sh.ph.literal("get "),
                                            Property_Name($['name']),
                                            Type_Parameters($['type parameters']),
                                            Parameters($['parameters']),
                                            Return_Type_Annotation($['return type']),
                                            p_.from.optional($['body']).decide(
                                                ($) => Block($),
                                                () => sh.ph.nothing()
                                            ),
                                            Semi_Colon($['semicolon']),
                                        ])))
                                        case 'method': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($['modifiers']),
                                            p_.from.optional($['asterisk token']).decide(
                                                () => sh.ph.literal("*"),
                                                () => sh.ph.nothing()
                                            ),
                                            Property_Name($['name']),
                                            p_.from.optional($['question token']).decide(
                                                () => sh.ph.literal("?"),
                                                () => sh.ph.nothing()
                                            ),
                                            Type_Parameters($['type parameters']),
                                            Parameters($['parameters']),
                                            Return_Type_Annotation($['return type']),
                                            p_.from.optional($['body']).decide(
                                                ($) => Block($),
                                                () => sh.ph.nothing()
                                            ),
                                            Semi_Colon($['semicolon']),
                                        ])))
                                        case 'property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($['modifiers']),
                                            Property_Name($['name']),
                                            p_.from.optional($['question token']).decide(
                                                () => sh.ph.literal("?"),
                                                () => sh.ph.nothing()
                                            ),
                                            p_.from.optional($['exclamation token']).decide(
                                                () => sh.ph.literal("!"),
                                                () => sh.ph.nothing()
                                            ),
                                            Optional_Type($['type']),
                                            Optional_Initializer($['initializer']),
                                            Semi_Colon($['semicolon']),
                                        ])))
                                        case 'set accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($['modifiers']),
                                            sh.ph.literal("set "),
                                            Property_Name($['name']),
                                            Type_Parameters($['type parameters']),
                                            Parameters($['parameters']),
                                            Return_Type_Annotation($['return type']),
                                            p_.from.optional($['body']).decide(
                                                ($) => Block($),
                                                () => sh.ph.nothing()
                                            ),
                                            Semi_Colon($['semicolon']),
                                        ])))
                                        case 'static block': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            Statement_Modifiers($['modifiers']),
                                            sh.ph.literal("static"),
                                            Block($['body']),
                                        ])))
                                        case 'index signature': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($.modifiers),
                                            sh.ph.literal("["),
                                            sh.ph.composed(p_.from.list($['parameter']).map(
                                                ($) => p_.from.state($).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                            case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                Signature_Modifiers($.modifiers),
                                                                p_.from.optional($['dot dot dot token']).decide(() => sh.ph.literal("..."), () => sh.ph.nothing()),
                                                                sh.ph.literal($.identifier.text),
                                                                p_.from.optional($['question token']).decide(() => sh.ph.literal("?"), () => sh.ph.nothing()),
                                                                p_.from.optional($.annotation).decide(
                                                                    ($) => sh.ph.composed(p_.literal.list([
                                                                        sh.ph.literal(": "),
                                                                        Type($['type']),
                                                                    ])),
                                                                    () => sh.ph.nothing()
                                                                ),
                                                                p_.from.optional($.initializer).decide(
                                                                    ($) => sh.ph.composed(p_.literal.list([sh.ph.literal(" = "), Expression($['expression'])])),
                                                                    () => sh.ph.nothing()
                                                                ),
                                                            ])))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }
                                                )
                                            )),
                                            sh.ph.literal("]"),
                                            Return_Type_Annotation($['return type']),
                                            Semi_Colon($.semicolon),
                                        ])))
                                        case 'semicolon element': return p_.option($, ($) => sh.ph.composed(p_.literal.list([JSDoc($['jsdoc']), sh.ph.literal(";")])))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ])
                        )
                    ])
                )
            )
        ),
    ),
    sh.ph.literal("}"),
]))

export const Entity_Name: interface_.Entity_Name = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
            case 'qualified name': return p_.option($, ($) => Qualified_Name($))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Error_Recovery: interface_.Error_Recovery = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.from.list($['entries']).map(
        ($): d_out.Phrase => p_.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                    case 'entry': return p_.option($, ($) => Type($))
                    default: return p_.exhaustive($[0])
                }
            }
        )
    )),
    () => sh.ph.nothing()
)

export const Expression: interface_.Expression = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'array literal': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("["),
                sh.ph.composed(
                    p_.from.list($['elements']).map(
                        ($) => sh.ph.composed(p_.literal.list([
                            p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                        case 'entry': return p_.option($, ($) => Expression($))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            ),
                        ]))
                    )
                ),
                sh.ph.literal("]"),
            ])))
            case 'arrow function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                JSDoc($['jsdoc']),
                p_.from.state($['parameters']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'with parentheses': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                Type_Parameters($['type parameters']),
                                Parameters($['parameters']),
                            ])))
                            case 'without parentheses': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                JSDoc($['parameter']['jsdoc']),
                                Binding_Pattern($.parameter.name),
                                Optional_Type($.parameter.type)
                            ])))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Return_Type_Annotation($['type']),
                sh.ph.literal(" => "),
                p_.from.state($['body']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'block': return p_.option($, ($) => Block($))
                            case 'expression': return p_.option($, ($) => Expression($))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
            ])))
            case 'as expression': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                sh.ph.literal(" as "),
                Type($['type']),
            ])))
            case 'satisfies': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                sh.ph.literal(" satisfies "),
                Type($['type']),
            ])))
            case 'assertion': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("<"),
                Type($['type']),
                sh.ph.literal(">"),
                Expression($['expression']),
            ])))
            case 'await': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("await "),
                Expression($['expression']),
            ])))
            case 'big int literal': return p_.option($, ($) => sh.ph.literal($.text))
            case 'binary': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['left']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '-': return p_.option($, ($) => sh.ph.literal(" - "))
                            case '-=': return p_.option($, ($) => sh.ph.literal(" -= "))
                            case '!=': return p_.option($, ($) => sh.ph.literal(" != "))
                            case '!==': return p_.option($, ($) => sh.ph.literal(" !== "))
                            case '??': return p_.option($, ($) => sh.ph.literal(" ?? "))
                            case '??=': return p_.option($, ($) => sh.ph.literal(" ??= "))
                            case '*': return p_.option($, ($) => sh.ph.literal(" * "))
                            case '**': return p_.option($, ($) => sh.ph.literal(" ** "))
                            case '**=': return p_.option($, ($) => sh.ph.literal(" **= "))
                            case '*=': return p_.option($, ($) => sh.ph.literal(" *= "))
                            case '/': return p_.option($, ($) => sh.ph.literal(" / "))
                            case '/=': return p_.option($, ($) => sh.ph.literal(" /= "))
                            case '&': return p_.option($, ($) => sh.ph.literal(" & "))
                            case '&&': return p_.option($, ($) => sh.ph.literal(" && "))
                            case '&&=': return p_.option($, ($) => sh.ph.literal(" &&= "))
                            case '&=': return p_.option($, ($) => sh.ph.literal(" &= "))
                            case '%': return p_.option($, ($) => sh.ph.literal(" % "))
                            case '%=': return p_.option($, ($) => sh.ph.literal(" %= "))
                            case '^': return p_.option($, ($) => sh.ph.literal(" ^ "))
                            case '^=': return p_.option($, ($) => sh.ph.literal(" ^= "))
                            case '+': return p_.option($, ($) => sh.ph.literal(" + "))
                            case '+=': return p_.option($, ($) => sh.ph.literal(" += "))
                            case '<': return p_.option($, ($) => sh.ph.literal(" < "))
                            case '<<': return p_.option($, ($) => sh.ph.literal(" << "))
                            case '<<=': return p_.option($, ($) => sh.ph.literal(" <<= "))
                            case '<=': return p_.option($, ($) => sh.ph.literal(" <= "))
                            case '=': return p_.option($, ($) => sh.ph.literal(" = "))
                            case '==': return p_.option($, ($) => sh.ph.literal(" == "))
                            case '===': return p_.option($, ($) => sh.ph.literal(" === "))
                            case '>': return p_.option($, ($) => sh.ph.literal(" > "))
                            case '>=': return p_.option($, ($) => sh.ph.literal(" >= "))
                            case '>>': return p_.option($, ($) => sh.ph.literal(" >> "))
                            case '>>=': return p_.option($, ($) => sh.ph.literal(" >>= "))
                            case '>>>': return p_.option($, ($) => sh.ph.literal(" >>> "))
                            case '>>>=': return p_.option($, ($) => sh.ph.literal(" >>>= "))
                            case '|': return p_.option($, ($) => sh.ph.literal(" | "))
                            case '|=': return p_.option($, ($) => sh.ph.literal(" |= "))
                            case '||': return p_.option($, ($) => sh.ph.literal(" || "))
                            case '||=': return p_.option($, ($) => sh.ph.literal(" ||= "))
                            case 'in': return p_.option($, ($) => sh.ph.literal(" in "))
                            case 'instanceof': return p_.option($, ($) => sh.ph.literal(" instanceof "))
                            case ',': return p_.option($, ($) => sh.ph.literal(", "))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Expression($['right']),
            ])))
            case 'call': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($.callee).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'import': return p_.option($, ($) => sh.ph.literal("import"))
                            case 'expression': return p_.option($, ($) => Expression($))
                            case 'super': return p_.option($, ($) => sh.ph.literal("super"))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Type_Arguments($['type arguments']),
                Arguments($.arguments)
            ])))
            case 'class': return p_.option($, ($) => Class($))
            case 'conditional': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['condition']),
                sh.ph.literal(" ? "),
                Expression($['when true']),
                sh.ph.literal(" : "),
                Expression($['when false']),
            ])))
            case 'delete': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("delete "),
                Expression($['expression']),
            ])))
            case 'element access': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                p_.from.optional($['question dot token']).decide(
                    ($) => sh.ph.literal("?."),
                    () => sh.ph.nothing()
                ),
                sh.ph.literal("["),
                Expression($['argument expression']),
                sh.ph.literal("]"),
            ])))
            case 'external module reference': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("require("),
                String_Literal($['module name']),
                sh.ph.literal(")"),
            ])))
            case 'false': return p_.option($, ($) => sh.ph.literal("false"))
            case 'function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                JSDoc($['jsdoc']),
                p_.from.optional($['modifiers']).decide(
                    ($) => sh.ph.composed(p_.from.list($).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'async': return p_.option($, ($) => sh.ph.literal("async "))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        )
                    )),
                    () => sh.ph.nothing()
                ),
                sh.ph.literal("function"),
                p_.from.optional($['asterisk token']).decide(
                    () => sh.ph.literal("*"),
                    () => sh.ph.nothing()
                ),
                sh.ph.literal(" "),
                p_.from.optional($['name']).decide(
                    ($) => sh.ph.composed(p_.literal.list([Identifier($), sh.ph.literal(" ")])),
                    () => sh.ph.nothing()
                ),
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                Return_Type_Annotation($['return type']),
                Block($['body'])
            ])))
            case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
            case 'import keyword': return p_.option($, ($) => sh.ph.literal("import"))
            case 'jsdoc': return p_.option($, ($) => sh.ph.literal("FIX JSDoc"))
            case 'meta property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($['new keyword']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'new keyword': return p_.option($, () => sh.ph.literal("new."))
                            case 'import keyword': return p_.option($, () => sh.ph.literal("import."))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Identifier($['identifier']),
            ])))
            case 'object literal': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("{"),
                sh.ph.composed(
                    p_.from.list($['properties']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                    case 'entry': return p_.ss($, ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'method': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    Signature_Modifiers($['modifiers']),
                                                    p_.from.optional($['asterisk token']).decide(
                                                        () => sh.ph.literal("*"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    Property_Name($['name']),
                                                    p_.from.optional($['question token']).decide(
                                                        () => sh.ph.literal("?"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    p_.from.optional($['exclamation token']).decide(
                                                        () => sh.ph.literal("!"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    Type_Parameters($['type parameters']),
                                                    Parameters($['parameters']),
                                                    Return_Type_Annotation($['return type']),
                                                    p_.from.optional($['body']).decide(
                                                        ($) => Block($),
                                                        () => sh.ph.literal(";")
                                                    ),
                                                    p_.from.optional($['semicolon']).decide(
                                                        () => sh.ph.nothing(),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                case 'property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    JSDoc($['jsdoc']),
                                                    Property_Name($['name']),
                                                    sh.ph.literal(": "),
                                                    Expression($['initializer']),
                                                ])))
                                                case 'shorthand property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    JSDoc($['jsdoc']),
                                                    Identifier($['name']),
                                                    p_.from.optional($['initializer']).decide(
                                                        ($) => sh.ph.composed(p_.literal.list([
                                                            sh.ph.literal(" = "),
                                                            Expression($['expression']),
                                                        ])),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                case 'spread': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal("..."),
                                                    Expression($['expression']),
                                                ])))
                                                case 'get accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal("get "),
                                                    Property_Name($['name']),
                                                    Parameters($['parameters']),
                                                    Return_Type_Annotation($['return type']),
                                                    p_.from.optional($['body']).decide(
                                                        ($) => Block($),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                case 'set accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal("set "),
                                                    Property_Name($['name']),
                                                    Parameters($['parameters']),
                                                    Return_Type_Annotation($['return type']),
                                                    p_.from.optional($['body']).decide(
                                                        ($) => Block($),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal("}"),
            ])))
            case 'new': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("new "),
                Expression($['expression']),
                p_.from.optional($['arguments']).decide(($) => Arguments($), () => sh.ph.nothing()),
            ])))
            case 'no substitution template literal': return p_.option($, ($) => sh.ph.literal($.text))
            case 'non null': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                sh.ph.literal("!"),
            ])))

            case 'null keyword': return p_.option($, ($) => sh.ph.literal("null"))
            case 'numeric literal': return p_.option($, ($) => Numeric_Literal($))
            case 'omitted expression': return p_.option($, ($) => sh.ph.nothing())
            case 'parenthesized': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("("),
                Expression($['expression']),
                sh.ph.literal(")"),
            ])))
            case 'postfix unary': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['operand']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '--': return p_.option($, ($) => sh.ph.literal("-"))
                            case '++': return p_.option($, ($) => sh.ph.literal("+"))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            ])))
            case 'private identifier': return p_.option($, ($) => sh.ph.literal($.text))
            case 'prefix unary': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '!': return p_.option($, ($) => sh.ph.literal("!"))
                            case '--': return p_.option($, ($) => sh.ph.literal("--"))
                            case '-': return p_.option($, ($) => sh.ph.literal("-"))
                            case '+': return p_.option($, ($) => sh.ph.literal("+"))
                            case '++': return p_.option($, ($) => sh.ph.literal("++"))
                            case '~': return p_.option($, ($) => sh.ph.literal("~"))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Expression($['operand']),
            ])))
            case 'qualified name': return p_.option($, ($) => Qualified_Name($))
            case 'property access': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                p_.from.state($['dot token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '.': return p_.option($, ($) => sh.ph.literal("."))
                            case '?.': return p_.option($, ($) => sh.ph.literal("?."))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                p_.from.state($.identifier).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'named': return p_.option($, ($) => sh.ph.literal($.text))
                            case 'private': return p_.option($, ($) => sh.ph.literal($.text))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            ])))
            case 'regular expression literal': return p_.option($, ($) => sh.ph.literal($.text))
            case 'string literal': return p_.option($, ($) => sh.ph.literal($.text))
            case 'tagged template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['tag']),
                p_.from.optional($['question dot token']).decide(() => sh.ph.literal("?."), () => sh.ph.nothing()),
                Type_Arguments($['type arguments']),
                p_.from.state($['template']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'no substitution template literal': return p_.option($, ($) => sh.ph.literal($.text))
                            case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.literal($['head'].text),
                                sh.ph.composed(
                                    p_.from.list($['template spans']).map(
                                        ($) => sh.ph.composed(p_.literal.list([
                                            Expression($['expression']),
                                            p_.from.state($['suffix']).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'middle': return p_.option($, ($) => sh.ph.literal($.text))
                                                        case 'tail': return p_.option($, ($) => sh.ph.literal($.text))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }
                                            )
                                        ]))
                                    )
                                )
                            ])))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
            ])))
            case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal($.head.text),
                sh.ph.composed(
                    p_.from.list($['template spans']).map(
                        ($) => sh.ph.composed(p_.literal.list([
                            Expression($['expression']),
                            p_.from.state($['suffix']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'middle': return p_.option($, ($) => sh.ph.literal($.text))
                                        case 'tail': return p_.option($, ($) => sh.ph.literal($.text))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ]))
                    )
                )
            ])))
            case 'super': return p_.option($, ($) => sh.ph.literal("super"))
            case 'this': return p_.option($, ($) => sh.ph.literal("this"))
            case 'true keyword': return p_.option($, ($) => sh.ph.literal("true"))
            case 'type of': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("typeof "),
                Expression($['expression']),
            ])))
            case 'void': return p_.option($, ($) => sh.ph.literal("void"))
            case 'yield': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("yield"),
                p_.from.optional($['asterisk token']).decide(
                    ($) => sh.ph.literal("*"),
                    () => sh.ph.nothing()
                ),
                p_.from.optional($['expression']).decide(
                    ($) => sh.ph.composed(p_.literal.list([sh.ph.literal(" "), Expression($)])),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'spread element': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("..."),
                Expression($['expression']),
            ])))
            case 'with type arguments': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                Type_Arguments($['type arguments'])
            ])))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Expression_With_Type_Arguments: interface_.Expression_With_Type_Arguments = ($) => sh.ph.composed(p_.literal.list([
    Expression($['expression']),
    Type_Arguments($['type arguments'])
]))

export const Heritage: interface_.Heritage = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.from.list($).map(
        ($) => sh.ph.composed(
            p_.literal.list([
                p_.from.state($['extends or implements keyword']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'extends': return p_.option($, ($) => sh.ph.literal("extends "))
                            case 'implements': return p_.option($, ($) => sh.ph.literal("implements "))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                sh.ph.composed(p_.from.list($.types).map(
                    ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                case 'entry': return p_.option($, ($) => Expression_With_Type_Arguments($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    )
                ))
            ])
        )
    )),
    () => sh.ph.nothing(),
)

export const Identifier: interface_.Identifier = ($) => sh.ph.literal($.text)

export const Initializer: interface_.Initializer = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.literal(" = "),
    Expression($['expression']),
]))

export const JSDoc: interface_.JSDoc = ($) => sh.ph.composed(
    p_.from.list($).map(
        ($) => sh.ph.composed(p_.literal.list([
            sh.ph.literal("/**"),
            sh.ph.literal("FIX JSDoc"),
            sh.ph.literal("*/")
        ])),
    )
)

export const Module_Body: interface_.Module_Body = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'module block': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal(" {"),
                sh.ph.indent(
                    sh.pg.composed(p_.literal.list([
                        sh.pg.sentences(p_.literal.list([
                            sh.sentence(p_.literal.list([])),
                        ])),
                        Statements($['statements'])
                    ])),
                ),
                sh.ph.literal("}"),
            ])))
            case 'dotted': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("."),
                sh.ph.literal($['module declaration']['name'].text),
                Module_Body($['module declaration']['block']),
            ])))
            case 'shorthand': return p_.option($, ($) => Semi_Colon($))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Object_Type: interface_.Object_Type = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.literal("{"),
    sh.ph.indent(
        sh.pg.composed(p_.literal.list([
            sh.pg.sentences(
                p_.from.list($['signatures']).map(
                    ($) => sh.sentence(p_.literal.list([
                        p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'call': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        Type_Parameters($['type parameters']),
                                        Parameters($.parameters),
                                        Optional_Type($.type),
                                        Semi_Colon($.semicolon),
                                        p_.from.optional($['comma']).decide(() => sh.ph.literal(","), () => sh.ph.nothing()),
                                    ])))
                                    case 'construct': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        sh.ph.literal("new "),
                                        Type_Parameters($['type parameters']),
                                        Parameters($.parameters),
                                        Optional_Type($.type),
                                        Semi_Colon($.semicolon),
                                        p_.from.optional($['comma']).decide(() => sh.ph.literal(","), () => sh.ph.nothing()),
                                    ])))

                                    case 'get accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        sh.ph.literal("get "),
                                        Property_Name($['name']),
                                        Parameters($['parameters']),
                                        Return_Type_Annotation($['return type']),
                                        p_.from.optional($['body']).decide(($) => Block($), () => sh.ph.nothing()),
                                        Semi_Colon($['semicolon']),
                                        p_.from.optional($['comma']).decide(() => sh.ph.literal(","), () => sh.ph.nothing()),
                                    ])))
                                    case 'set accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        sh.ph.literal("set "),
                                        Property_Name($['name']),
                                        Parameters($['parameters']),
                                        Return_Type_Annotation($['return type']),
                                        p_.from.optional($['body']).decide(($) => Block($), () => sh.ph.nothing()),
                                        Semi_Colon($['semicolon']),
                                        p_.from.optional($['comma']).decide(() => sh.ph.literal(","), () => sh.ph.nothing()),
                                    ])))

                                    case 'index': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        Signature_Modifiers($.modifiers),
                                        sh.ph.literal("["),
                                        sh.ph.composed(p_.from.list($['parameter']).map(
                                            ($) => p_.from.state($).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            Signature_Modifiers($.modifiers),
                                                            p_.from.optional($['dot dot dot token']).decide(() => sh.ph.literal("..."), () => sh.ph.nothing()),
                                                            sh.ph.literal($.identifier.text),
                                                            p_.from.optional($['question token']).decide(() => sh.ph.literal("?"), () => sh.ph.nothing()),
                                                            p_.from.optional($.annotation).decide(
                                                                ($) => sh.ph.composed(p_.literal.list([
                                                                    sh.ph.literal(": "),
                                                                    Type($['type']),
                                                                ])),
                                                                () => sh.ph.nothing()
                                                            ),
                                                        ])))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }
                                            )
                                        )),
                                        sh.ph.literal("]"),
                                        Return_Type_Annotation($['return type']),
                                        Semi_Colon($.semicolon),
                                        p_.from.optional($['comma']).decide(() => sh.ph.literal(","), () => sh.ph.nothing()),
                                    ])))
                                    case 'method': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        // Signature_Modifiers($.modifiers),
                                        Property_Name($['identifier']),
                                        Type_Parameters($['type parameters']),
                                        p_.from.optional($['question token']).decide(
                                            ($) => sh.ph.literal("?"),
                                            () => sh.ph.nothing()
                                        ),
                                        Parameters($.parameters),
                                        Return_Type_Annotation($['return type']),
                                        Semi_Colon($['semicolon']),
                                        p_.from.optional($['comma']).decide(
                                            ($) => sh.ph.literal(","),
                                            () => sh.ph.nothing()
                                        ),
                                    ])))
                                    case 'property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                        JSDoc($['jsdoc']),
                                        Signature_Modifiers($.modifiers),
                                        Property_Name($['id']),
                                        p_.from.optional($['question token']).decide(
                                            ($) => sh.ph.literal("?"),
                                            () => sh.ph.nothing()
                                        ),
                                        Optional_Type($['type annotation']),
                                        Optional_Initializer($['initializer']),
                                        p_.from.optional($['comma token']).decide(
                                            ($) => sh.ph.literal(","),
                                            () => sh.ph.nothing()
                                        ),
                                        Semi_Colon($['semicolon token']),
                                    ])))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ),
                    ]))
                )
            ),
        ])),
    ),
    sh.ph.literal("}")
]))

export const Optional_Initializer: interface_.Optional_Initializer = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        Initializer($),
    ])),
    () => sh.ph.nothing()
)

export const Optional_Type: interface_.Optional_Type = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        sh.ph.literal(": "),
        Type($['type']),
    ])),
    () => sh.ph.nothing()
)

export const Numeric_Literal: interface_.Numeric_Literal = ($) => sh.ph.literal($.text)

export const Parameters: interface_.Parameters = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.literal("("),
    sh.ph.composed(
        p_.from.list($.entries).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            p_.from.optional($['dot dot dot token']).decide(
                                () => sh.ph.literal("..."),
                                () => sh.ph.nothing()
                            ),
                            Binding_Pattern($.name),
                            p_.from.optional($['question token']).decide(
                                () => sh.ph.literal("?"),
                                () => sh.ph.nothing()
                            ),
                            Optional_Type($.type),
                            Optional_Initializer($.initializer),
                        ])))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )
    ),
    sh.ph.literal(")"),
]))

export const Property_Name: interface_.Property_Name = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'computed': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("["),
                Expression($['expression']),
                sh.ph.literal("]"),
            ])))
            case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
            case 'numeric literal': return p_.option($, ($) => Numeric_Literal($))
            case 'big int literal': return p_.option($, ($) => sh.ph.literal($.text))
            case 'private identifier': return p_.option($, ($) => sh.ph.literal($.text))
            case 'string literal': return p_.option($, ($) => sh.ph.literal($.text))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Qualified_Name: interface_.Qualified_Name = ($) => sh.ph.composed(p_.literal.list([
    Entity_Name($['first']),
    sh.ph.literal("."),
    sh.ph.literal($['second'].text),
]))

export const Return_Type_Annotation: interface_.Return_Type_Annotation = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        sh.ph.literal(": "),
        p_.from.state($['kind']).decide(
            ($) => {
                switch ($[0]) {
                    case 'type': return p_.option($, ($) => Type($))
                    case 'type predicate': return p_.option($, ($) => Type_Predicate($))
                    default: return p_.exhaustive($[0])
                }
            }
        )
    ])),
    () => sh.ph.nothing()
)

export const Semi_Colon: interface_.Semi_Colon = ($) => p_.from.optional($).decide(
    ($) => sh.ph.literal(";"),
    () => sh.ph.nothing()
)

export const Signature_Modifiers: interface_.Signature_Modifiers = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'abstract': return p_.option($, ($) => sh.ph.literal("abstract "))
                        case 'accessor': return p_.option($, ($) => sh.ph.literal("accessor "))
                        case 'async': return p_.option($, ($) => sh.ph.literal("async "))
                        case 'const': return p_.option($, ($) => sh.ph.literal("const "))
                        case 'declare': return p_.option($, ($) => sh.ph.literal("declare "))
                        case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal("@"),
                            Expression($['expression']),
                            sh.ph.literal(" "),
                        ])))
                        case 'export': return p_.option($, ($) => sh.ph.literal("export "))
                        case 'in': return p_.option($, ($) => sh.ph.literal("in "))
                        case 'out': return p_.option($, ($) => sh.ph.literal("out "))
                        case 'override': return p_.option($, ($) => sh.ph.literal("override "))
                        case 'private': return p_.option($, ($) => sh.ph.literal("private "))
                        case 'protected': return p_.option($, ($) => sh.ph.literal("protected "))
                        case 'public': return p_.option($, ($) => sh.ph.literal("public "))
                        case 'readonly': return p_.option($, ($) => sh.ph.literal("readonly "))
                        case 'static': return p_.option($, ($) => sh.ph.literal("static "))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )
    ),
    () => sh.ph.nothing()
)

export const Source_File: interface_.Source_File = ($) => sh.pg.composed(p_.literal.list([
    Statements($['statements']),
    sh.pg.sentences(p_.literal.list([
        sh.sentence(p_.literal.list([
            JSDoc($['end of file'].jsdoc)
        ]))
    ]))
]))

export const Statement: interface_.Statement = ($) => sh.ph.composed(p_.literal.list([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'block': return p_.option($, ($) => Block($))
                case 'break': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("break"),
                    p_.from.optional($['identifier']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal(" "),
                            sh.ph.literal($.text),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'class': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    Class($.class),
                    Semi_Colon($['semicolon']),
                ])))
                case 'continue': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("continue"),
                    p_.from.optional($['label']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal(" "),
                            sh.ph.literal($.text),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'do': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("do "),
                    Statement($['statement']),
                    sh.ph.literal(" while ("),
                    Expression($['expression']),
                    sh.ph.literal(")"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'empty': return p_.option($, ($) => sh.ph.composed(p_.literal.list([JSDoc($['jsdoc']), sh.ph.literal(";")])))
                case 'debugger': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("debugger"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'enum': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("enum "),
                    sh.ph.literal($['identifier'].text),
                    sh.ph.literal(" {"),
                    sh.ph.indent(
                        sh.pg.composed(p_.literal.list([
                            sh.pg.sentences(
                                p_.from.list($['members']).map(
                                    ($) => sh.sentence(p_.literal.list([
                                        p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                    case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                        JSDoc($['jsdoc']),
                                                        Property_Name($['name']),
                                                        Optional_Initializer($['initializer']),
                                                        // p_.from.optional($['initializer']).decide(
                                                        //     ($) => Initializer($),
                                                        //     () => sh.ph.nothing()
                                                        // ),

                                                    ])))
                                                    default: return p_.exhaustive($[0])
                                                }
                                            }
                                        ),
                                    ]))
                                )
                            ),
                        ]))
                    ),
                    sh.ph.literal("}"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'export assignment': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("export "),
                    p_.from.state($['type']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'default': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal("default "),
                                    Expression($['expression']),
                                ])))
                                case 'equals': return p_.option($, ($) => Initializer($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'export declaration': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("export "),
                    p_.from.optional($['type keyword']).decide(
                        ($) => sh.ph.literal("type "),
                        () => sh.ph.nothing()
                    ),
                    p_.from.state($['type']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'all': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal("*"),
                                    p_.from.optional($['as']).decide(
                                        ($) => As_Alias($),
                                        () => sh.ph.nothing()
                                    )
                                ])))
                                case 'named': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal("{"),
                                    sh.ph.composed(
                                        p_.from.list($['exports']).map(
                                            ($) => p_.from.state($).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            p_.from.optional($['type keyword']).decide(() => sh.ph.literal("type "), () => sh.ph.nothing()),
                                                            sh.ph.literal($.identifier.text),
                                                            p_.from.optional($['as']).decide(
                                                                ($) => As_Alias($),
                                                                () => sh.ph.nothing()
                                                            )
                                                        ])))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }
                                            )
                                        )
                                    ),
                                    sh.ph.literal("}"),
                                ])))
                                case 'namespace': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal("*"),
                                    sh.ph.literal(" as "),
                                    sh.ph.literal($['identifier'].text),
                                ])))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    p_.from.optional($['from clause']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal(" from "),
                            p_.from.state($['module specifier']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
                                        case 'string literal': return p_.option($, ($) => sh.ph.literal($.text))
                                        case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.literal($.head.text),
                                            sh.ph.composed(
                                                p_.from.list($['template spans']).map(
                                                    ($) => sh.ph.composed(p_.literal.list([
                                                        Expression($['expression']),
                                                        p_.from.state($['suffix']).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'middle': return p_.option($, ($) => sh.ph.literal($.text))
                                                                    case 'tail': return p_.option($, ($) => sh.ph.literal($.text))
                                                                    default: return p_.exhaustive($[0])
                                                                }
                                                            }
                                                        )
                                                    ]))
                                                )
                                            )
                                        ])))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            ),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    p_.from.optional($['import attributes']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal(" assert {"),
                            sh.ph.composed(p_.from.list($['elements']).map(
                                ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                            case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                sh.ph.literal($.name.text),
                                                sh.ph.literal(": "),
                                                Expression($['value']),
                                            ])))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }
                                )
                            )),
                            sh.ph.literal("}"),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'expression': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Expression($['expression']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'for': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("for ("),
                    p_.from.optional($['initializer']).decide(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'variable declaration list': return p_.option($, ($) => Variable_Declaration_List($))
                                    case 'expression': return p_.option($, ($) => Expression($))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        ),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal("; "),
                    p_.from.optional($['condition']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal("; "),
                    p_.from.optional($['incrementor']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal(") "),
                    Statement($['statement']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'for in': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("for ("),
                    p_.from.state($['initializer']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'variable declaration list': return p_.option($, ($) => Variable_Declaration_List($))
                                case 'expression': return p_.option($, ($) => Expression($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    sh.ph.literal(" in "),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['statement']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'for of': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("for "),
                    p_.from.optional($['await keyword']).decide(
                        () => sh.ph.literal("await "),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal("("),
                    p_.from.state($['initializer']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'variable declaration list': return p_.option($, ($) => Variable_Declaration_List($))
                                case 'expression': return p_.option($, ($) => Expression($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    sh.ph.literal(" of "),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['statement']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("function"),
                    p_.from.optional($['asterisk token']).decide(
                        () => sh.ph.literal("*"),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.literal(" "),
                    p_.from.optional($['identifier']).decide(
                        ($) => Identifier($),
                        () => sh.ph.nothing()
                    ),
                    Type_Parameters($['type parameters']),
                    Parameters($['parameters']),
                    Return_Type_Annotation($['return type annotation']),
                    sh.ph.literal(" "),
                    p_.from.optional($['body']).decide(
                        ($) => Block($),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'if': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("if ("),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['then statement']),
                    p_.from.optional($['else']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal(" else "),
                            Statement($['statement']),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("import "),
                    p_.from.optional($['clause']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            p_.from.optional($['type keyword']).decide(
                                () => sh.ph.literal("type "),
                                () => sh.ph.nothing()
                            ),
                            p_.from.state($['type']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'identifier': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.literal($['identifier'].text),
                                            p_.from.optional($['named']).decide(
                                                ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal(", "),
                                                    p_.from.state($['bindings']).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'named imports': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                    sh.ph.literal("{"),
                                                                    sh.ph.composed(
                                                                        p_.from.list($.entries).map(
                                                                            ($): d_out.Phrase => p_.from.state($).decide(
                                                                                ($) => {
                                                                                    switch ($[0]) {
                                                                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                                            p_.from.optional($['type keyword']).decide(
                                                                                                ($) => sh.ph.literal("type "),
                                                                                                () => sh.ph.nothing()
                                                                                            ),
                                                                                            sh.ph.literal($.identifier.text),
                                                                                            p_.from.optional($['as']).decide(
                                                                                                ($) => As_Alias($),
                                                                                                () => sh.ph.nothing()
                                                                                            )
                                                                                        ])))
                                                                                        default: return p_.exhaustive($[0])
                                                                                    }
                                                                                }
                                                                            )
                                                                        )
                                                                    ),
                                                                    sh.ph.literal("}"),
                                                                ])))
                                                                case 'namespace import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                    sh.ph.literal("* as "),
                                                                    sh.ph.literal($['identifier'].text)
                                                                ])))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }
                                                    ),
                                                ])),
                                                () => sh.ph.nothing()
                                            ),
                                        ])))
                                        case 'named imports': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.literal("{"),
                                            sh.ph.composed(
                                                p_.from.list($.entries).map(
                                                    ($): d_out.Phrase => p_.from.state($).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                                case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                    p_.from.optional($['type keyword']).decide(
                                                                        ($) => sh.ph.literal("type "),
                                                                        () => sh.ph.nothing()
                                                                    ),
                                                                    sh.ph.literal($.identifier.text),
                                                                    p_.from.optional($['as']).decide(
                                                                        ($) => As_Alias($),
                                                                        () => sh.ph.nothing()
                                                                    )
                                                                ])))
                                                                default: return p_.exhaustive($[0])
                                                            }
                                                        }
                                                    )
                                                )
                                            ),
                                            sh.ph.literal("}"),
                                        ])))
                                        case 'namespace import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.literal("* as "),
                                            sh.ph.literal($['identifier'].text)
                                        ])))
                                        case 'defer': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.literal("defer "),
                                            p_.from.state($['import']).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
                                                        case 'namespace import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            sh.ph.literal("* as "),
                                                            sh.ph.literal($['identifier'].text)
                                                        ])))
                                                        case 'named imports': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            sh.ph.literal("{"),
                                                            sh.ph.composed(p_.from.list($.entries).map(
                                                                ($): d_out.Phrase => p_.from.state($).decide(
                                                                    ($) => {
                                                                        switch ($[0]) {
                                                                            case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                                            case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                                p_.from.optional($['type keyword']).decide(() => sh.ph.literal("type "), () => sh.ph.nothing()),
                                                                                sh.ph.literal($.identifier.text),
                                                                                p_.from.optional($['as']).decide(($) => As_Alias($), () => sh.ph.nothing()),
                                                                            ])))
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    }
                                                                )
                                                            )),
                                                            sh.ph.literal("}"),
                                                        ])))
                                                        default: return p_.exhaustive($[0])
                                                    }
                                                }
                                            ),
                                        ])))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            ),
                            sh.ph.literal(" "),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    p_.from.optional($['from keyword']).decide(
                        () => sh.ph.literal("from "),
                        () => sh.ph.nothing()
                    ),
                    p_.from.state($['module specifier']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'identifier': return p_.option($, ($) => sh.ph.literal($.text))
                                case 'string literal': return p_.option($, ($) => sh.ph.literal($.text))
                                case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal($.head.text),
                                    sh.ph.composed(
                                        p_.from.list($['template spans']).map(
                                            ($) => sh.ph.composed(p_.literal.list([
                                                Expression($['expression']),
                                                p_.from.state($['suffix']).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'middle': return p_.option($, ($) => sh.ph.literal($.text))
                                                            case 'tail': return p_.option($, ($) => sh.ph.literal($.text))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }
                                                )
                                            ]))
                                        )
                                    )
                                ])))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    p_.from.optional($['import attributes']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal(" with {"),
                            sh.ph.composed(
                                p_.from.list($['elements']).map(
                                    ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                                case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal($.name.text),
                                                    sh.ph.literal(": "),
                                                    Expression($['value']),
                                                ])))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    )
                                )
                            ),
                            sh.ph.literal("}"),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'import equals': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("import "),
                    p_.from.optional($['type keyword']).decide(() => sh.ph.literal("type "), () => sh.ph.nothing()),
                    sh.ph.literal($['identifier'].text),
                    Initializer($['initializer']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'interface': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("interface "),
                    sh.ph.literal($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    Heritage($.heritage),
                    sh.ph.literal(" "),
                    Object_Type($['body']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'labeled': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal($['identifier'].text),
                    sh.ph.literal(": "),
                    Statement($['statement']),
                ])))
                case 'module': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    p_.from.state($['type']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'global': return p_.option($, ($) => Identifier($))
                                case 'module': return p_.option($, ($) => sh.ph.composed(
                                    p_.literal.list([
                                        sh.ph.literal("module "),
                                        Property_Name($['name']),
                                    ]))
                                )
                                case 'namespace': return p_.option($, ($) => sh.ph.composed(
                                    p_.literal.list([
                                        sh.ph.literal("namespace "),
                                        Identifier($['name']),
                                    ]))
                                )
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    p_.from.optional($['block']).decide(($) => Module_Body($), () => sh.ph.nothing()),
                    Semi_Colon($['semicolon']),
                ])))
                case 'namespace export': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("export "),
                    sh.ph.literal("as "),
                    sh.ph.literal("namespace "),
                    sh.ph.literal($['identifier'].text),
                    Semi_Colon($['semicolon']),
                ])))
                case 'return': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("return "),
                    p_.from.optional($['expression']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'switch': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("switch ("),
                    Expression($['expression']),
                    sh.ph.literal(") {"),
                    sh.ph.indent(
                        sh.pg.sentences(
                            p_.from.list($['case block']['clauses']).map(
                                ($): d_out.Sentence => sh.sentence(p_.literal.list([
                                    p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'case': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal("case "),
                                                    Expression($['expression']),
                                                    sh.ph.literal(":"),
                                                    sh.ph.indent(
                                                        Statements($['statements'])
                                                    )
                                                ])))
                                                case 'default': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.literal("default:"),
                                                    sh.ph.indent(
                                                        Statements($['statements'])
                                                    )
                                                ])))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    )
                                ]))
                            )
                        ),
                    ),
                    sh.ph.literal("}"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'try': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("try "),
                    Block($['try block']),
                    sh.ph.composed(p_.literal.list([
                        p_.from.optional($['catch clause']).decide(
                            ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.literal(" catch"),
                                p_.from.optional($['binding']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        sh.ph.literal(" ("),
                                        Variable_Declaration($['variable declaration']),
                                        sh.ph.literal(")"),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                                sh.ph.literal(" "),
                                Block($['block']),
                            ])),
                            () => sh.ph.nothing()
                        ),
                        p_.from.optional($['finally block']).decide(
                            ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.literal(" finally "),
                                Block($['block']),
                            ])),
                            () => sh.ph.nothing()
                        )
                    ])),
                    Semi_Colon($['semicolon']),
                ])))
                case 'throw': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("throw "),
                    Expression($['expression']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'type alias': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.literal("type "),
                    sh.ph.literal($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    sh.ph.literal(" = "),
                    Type($['type']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'variable': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    Variable_Declaration_List($['variable declaration list']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'while': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("while ("),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['statement'])
                ])))
                case 'with': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.literal("with ("),
                    Expression($['expression']),
                    sh.ph.literal(") "),
                    Statement($['statement']),
                ])))
                default: return p_.exhaustive($[0])
            }
        }
    ),
    // p_.from.optional($['semicolon token']).decide(
    //     ($) => sh.ph.literal(";"),
    //     () => sh.ph.nothing()
    // )
]))

export const Statements: interface_.Statements = ($) => sh.pg.composed(
    p_.from.list($).map(
        ($) => sh.pg.sentences(p_.literal.list([
            sh.sentence(p_.literal.list([
                Statement($),
            ])),
            sh.sentence(p_.literal.list([])),
        ])),
    )
)

export const Statement_Modifiers: interface_.Statement_Modifiers = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'abstract': return p_.option($, ($) => sh.ph.literal("abstract "))
                        case 'accessor': return p_.option($, ($) => sh.ph.literal("accessor "))
                        case 'async': return p_.option($, ($) => sh.ph.literal("async "))
                        case 'const': return p_.option($, ($) => sh.ph.literal("const "))
                        case 'declare': return p_.option($, ($) => sh.ph.literal("declare "))
                        case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.literal("@"),
                            Expression($['expression']),
                            sh.ph.literal(" "),
                        ])))
                        case 'default': return p_.option($, ($) => sh.ph.literal("default "))
                        case 'export': return p_.option($, ($) => sh.ph.literal("export "))
                        case 'private': return p_.option($, ($) => sh.ph.literal("private "))
                        case 'protected': return p_.option($, ($) => sh.ph.literal("protected "))
                        case 'public': return p_.option($, ($) => sh.ph.literal("public "))
                        case 'readonly': return p_.option($, ($) => sh.ph.literal("readonly "))
                        case 'static': return p_.option($, ($) => sh.ph.literal("static "))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )
    ),
    () => sh.ph.nothing()
)

export const String_Literal: interface_.String_Literal = ($) => sh.ph.literal($.text)


export const Type_Predicate: interface_.Type_Predicate = ($) => sh.ph.composed(p_.literal.list([
    p_.from.optional($['asserts keyword']).decide(
        () => sh.ph.literal("asserts "),
        () => sh.ph.nothing()
    ),
    p_.from.state($['parameter name']).decide(
        ($) => {
            switch ($[0]) {
                case 'identifier': return p_.option($, ($) => Identifier($))
                case 'this': return p_.option($, ($) => sh.ph.literal("this"))
                default: return p_.exhaustive($[0])
            }
        }
    ),
    p_.from.optional($['is predicate']).decide(
        ($) => sh.ph.composed(p_.literal.list([
            sh.ph.literal(" is "),
            Type($['type']),
        ])),
        () => sh.ph.nothing()
    ),
]))

export const Type: interface_.Type = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'any': return p_.option($, ($) => sh.ph.literal("any"))
            case 'array': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['element type']),
                sh.ph.literal("[]"),
            ])))
            case 'big int': return p_.option($, ($) => sh.ph.literal("bigint"))
            case 'boolean': return p_.option($, ($) => sh.ph.literal("boolean"))
            case 'conditional': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['check type']),
                sh.ph.literal(" extends "),
                Type($['extends type']),
                sh.ph.literal(" ? "),
                Type($['true type']),
                sh.ph.literal(" : "),
                Type($['false type']),
            ])))
            case 'constructor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Signature_Modifiers($['modifiers']),
                sh.ph.literal("new "),
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                sh.ph.literal(" => "),
                Type($['type']),
            ])))
            case 'function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                Optional_Type($['type']),
                sh.ph.literal(" => "),
                Type($['return type']),
            ])))
            case 'intrinsic': return p_.option($, ($) => sh.ph.literal("intrinsic"))
            case 'import type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.optional($['typeof keyword']).decide(
                    () => sh.ph.literal("typeof "),
                    () => sh.ph.nothing()
                ),
                sh.ph.literal("import("),
                Type($['argument']),
                p_.from.optional($['attributes']).decide(
                    ($) => sh.ph.composed(p_.literal.list([
                        sh.ph.literal(", { with: "),
                        sh.ph.composed(p_.from.list($['import attributes']['entries']).map(
                            ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            Property_Name($['name']),
                                            sh.ph.literal(": "),
                                            Expression($.value),
                                        ])))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        )),
                        sh.ph.literal(" }"),
                    ])),
                    () => sh.ph.nothing()
                ),
                sh.ph.literal(")"),
                p_.from.optional($['qualifier']).decide(
                    ($) => sh.ph.composed(p_.literal.list([
                        sh.ph.literal("."),
                        Entity_Name($['name']),
                    ])),
                    () => sh.ph.nothing()
                ),
                Type_Arguments($['type arguments']),
                Error_Recovery($['error recovery']),
            ])))
            case 'indexed access': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['object type']),
                sh.ph.literal("["),
                Type($['index type']),
                sh.ph.literal("]"),
            ])))
            case 'infer': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("infer "),
                Identifier($['type parameter']['identifier']),
                p_.from.optional($['type parameter'].extends).decide(
                    ($) => sh.ph.composed(p_.literal.list([
                        sh.ph.literal(" extends "),
                        Type($.type),
                    ])),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'intersection': return p_.option($, ($) => sh.ph.composed(
                p_.from.list($).map(
                    ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'separator': return p_.option($, ($) => sh.ph.literal(" & "))
                                case 'entry': return p_.option($, ($) => Type($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    )
                ),
            ))
            case 'jsdoc all': return p_.option($, ($) => sh.ph.literal("*"))
            case 'jsdoc function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("function"),
                Parameters($['parameters']),
                Optional_Type($['type']),
            ])))
            case 'jsdoc non nullable': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.optional($['exclamation token before']).decide(
                    () => sh.ph.literal("!"),
                    () => sh.ph.nothing()
                ),
                Type($['type']),
                p_.from.optional($['exclamation token after']).decide(
                    () => sh.ph.literal("!"),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'jsdoc nullable': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.optional($['question token before']).decide(
                    () => sh.ph.literal("?"),
                    () => sh.ph.nothing()
                ),
                Type($['type']),
                p_.from.optional($['question token after']).decide(
                    () => sh.ph.literal("?"),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'jsdoc unknown': return p_.option($, ($) => sh.ph.literal("?"))
            case 'literal type': return p_.option($, ($) => p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'bigint literal': return p_.option($, ($) => sh.ph.literal($.text))
                        case 'false keyword': return p_.option($, ($) => sh.ph.literal("false"))
                        case 'negative numeric literal': return p_.option($, ($) => sh.ph.literal("-" + $['value'].text))
                        case 'no substitution template literal': return p_.option($, ($) => sh.ph.literal($.text))
                        case 'null': return p_.option($, ($) => sh.ph.literal("null"))
                        case 'numeric literal': return p_.option($, ($) => Numeric_Literal($))
                        case 'string literal': return p_.option($, ($) => sh.ph.literal($.text))
                        case 'true keyword': return p_.option($, ($) => sh.ph.literal("true"))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'mapped': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("{"),
                sh.ph.indent(
                    sh.pg.sentences(p_.literal.list([
                        sh.sentence(
                            p_.literal.list([
                                p_.from.optional($['readonly modifier']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        p_.from.optional($['modifier']).decide(
                                            ($) => sh.ph.literal($.text),
                                            () => sh.ph.nothing()
                                        ),
                                        sh.ph.literal("readonly "),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                                sh.ph.literal("["),
                                Identifier($['type parameter']['identifier']),
                                sh.ph.literal(" in "),
                                Type($['type parameter']['constraint']),
                                p_.from.optional($['as']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        sh.ph.literal(" as "),
                                        Type($.type),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                                sh.ph.literal("]"),
                                p_.from.optional($['question modifier minus']).decide(() => sh.ph.literal("-"), () => sh.ph.nothing()),
                                p_.from.optional($['question modifier plus']).decide(() => sh.ph.literal("+"), () => sh.ph.nothing()),
                                p_.from.optional($['question modifier question']).decide(() => sh.ph.literal("?"), () => sh.ph.nothing()),
                                p_.from.optional($['body']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        sh.ph.literal(": "),
                                        Type($['type']),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                            ]),
                        )
                    ]))
                ),
                sh.ph.literal("}"),
            ])))
            case 'never': return p_.option($, ($) => sh.ph.literal("never"))
            case 'number': return p_.option($, ($) => sh.ph.literal("number"))
            case 'object': return p_.option($, ($) => sh.ph.literal("object"))
            case 'parenthesized': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("("),
                Type($['type']),
                sh.ph.literal(")"),
            ])))
            case 'query': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("typeof "),
                Entity_Name($['name']),
                Type_Arguments($['type arguments']),
            ])))
            case 'string': return p_.option($, ($) => sh.ph.literal("string"))
            case 'symbol': return p_.option($, ($) => sh.ph.literal("symbol"))
            case 'tuple type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("["),
                sh.ph.composed(
                    p_.from.list($['elements']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                                    case 'entry': return p_.option($, ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'named': return p_.ss($, ($) => sh.ph.composed(p_.literal.list([
                                                    JSDoc($['jsdoc']),
                                                    p_.from.optional($['dot dot dot token']).decide(
                                                        () => sh.ph.literal("..."),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    sh.ph.literal($.name.text),
                                                    p_.from.optional($['question token']).decide(
                                                        () => sh.ph.literal("?"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    sh.ph.literal(": "),
                                                    Type($['type']),
                                                ])))
                                                case 'regular': return p_.ss($, ($) => Type($))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    ))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        )
                    )
                ),
                sh.ph.literal("]"),
            ])))
            case 'rest type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal("..."),
                Type($['type']),
            ])))
            case 'type literal': return p_.option($, ($) => Object_Type($))
            case 'type operator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($.operator).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'key of': return p_.option($, ($) => sh.ph.literal("keyof "))
                            case 'unique': return p_.option($, ($) => sh.ph.literal("unique "))
                            case 'readonly': return p_.option($, ($) => sh.ph.literal("readonly "))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Type($['type']),
            ])))
            case 'type predicate': return p_.option($, ($) => Type_Predicate($))
            case 'type reference': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Entity_Name($['entity name']),
                p_.from.optional($['dot token']).decide(
                    ($) => sh.ph.literal("."),
                    () => sh.ph.nothing()
                ),
                Type_Arguments($['type arguments']),
                Error_Recovery($['error recovery']),
            ])))
            case 'union type': return p_.option($, ($) => sh.ph.composed(
                p_.from.list($['members']).map(
                    ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    Type($),
                                ])))
                                case 'separator': return p_.option($, ($) => sh.ph.literal(" | "))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    )
                ),
            ))
            case 'optional type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['type']),
                sh.ph.literal("?"),
            ])))
            case 'undefined': return p_.option($, ($) => sh.ph.literal("undefined"))
            case 'unknown': return p_.option($, ($) => sh.ph.literal("unknown"))
            case 'this': return p_.option($, ($) => sh.ph.literal("this"))
            case 'void': return p_.option($, ($) => sh.ph.literal("void"))
            case 'template literal type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.literal($.head.text),
                sh.ph.composed(
                    p_.from.list($['template spans']).map(
                        ($) => sh.ph.composed(p_.literal.list([
                            Type($['type']),
                            p_.from.state($['suffix']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'middle': return p_.option($, ($) => sh.ph.literal($.text))
                                        case 'tail': return p_.option($, ($) => sh.ph.literal($.text))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ]))
                    )
                )
            ])))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Type_Arguments: interface_.Type_Arguments = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        sh.ph.literal("<"),
        sh.ph.composed(
            p_.from.list($['entries']).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                            case 'entry': return p_.option($, ($) => Type($))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            )
        ),
        sh.ph.literal(">")
    ])),
    () => sh.ph.nothing()
)

export const Type_Parameters: interface_.Type_Parameters = ($) => p_.from.optional($).decide(
    ($) => sh.ph.rich(
        p_.from.list($['entries']).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            p_.from.optional($['modifiers']).decide(
                                ($) => sh.ph.composed(p_.from.list($).map(
                                    ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'const': return p_.option($, ($) => sh.ph.literal("const "))
                                                case 'in': return p_.option($, ($) => sh.ph.literal("in "))
                                                case 'out': return p_.option($, ($) => sh.ph.literal("out "))
                                                case 'public': return p_.option($, ($) => sh.ph.literal("public "))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    )
                                )),
                                () => sh.ph.nothing()
                            ),
                            sh.ph.literal($.identifier.text),
                            p_.from.optional($['extends']).decide(
                                ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal(" extends "),
                                    Type($['type']),
                                ])),
                                () => sh.ph.nothing()
                            ),
                            p_.from.optional($['default']).decide(
                                ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.literal(" = "),
                                    Type($['type']),
                                ])),
                                () => sh.ph.nothing()
                            ),
                        ])))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        ),
        sh.ph.nothing(),
        sh.ph.literal("<"),
        sh.ph.literal(","),
        sh.ph.literal(">"),
    ),
    () => sh.ph.nothing()
)

export const Variable_Declaration: interface_.Variable_Declaration = ($) => sh.ph.composed(
    p_.literal.list([
        Binding_Pattern($.name),
        p_.from.optional($['exclamation token']).decide(
            ($) => sh.ph.literal("!"),
            () => sh.ph.nothing()
        ),
        Optional_Type($.type),
        p_.from.optional($['assignment']).decide(
            ($) => sh.ph.composed(p_.literal.list([
                Initializer($['initializer']),
            ])),
            () => sh.ph.nothing()
        )
    ])
)

export const Variable_Declaration_List: interface_.Variable_Declaration_List = ($) => sh.ph.composed(
    p_.literal.list([
        p_.from.state($.mutability).decide(
            ($) => {
                switch ($[0]) {
                    case 'await using': return sh.ph.literal("await using ")
                    case 'const': return sh.ph.literal("const ")
                    case 'let': return sh.ph.literal("let ")
                    case 'using': return sh.ph.literal("using ")
                    case 'var': return sh.ph.literal("var ")
                    default: return p_.exhaustive($[0])
                }
            }
        ),
        sh.ph.composed(
            p_.from.list($['declarations']).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'separator': return p_.option($, ($) => sh.ph.literal(", "))
                            case 'entry': return p_.option($, ($) => Variable_Declaration($))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            )
        )
    ])
)