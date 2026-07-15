import * as p_ from 'pareto-core/implementation/transformer'

//schemas
import type * as s_in from "../../../interface/schemas/concrete_syntax_tree.js"
import type * as s_out from "../../../interface/schemas/prose.js"

namespace declarations {
    export type Arguments = p_.Transformer<
        s_in.Arguments,
        s_out.Phrase
    >
    export type As_Alias = p_.Transformer<
        s_in.As_Alias,
        s_out.Phrase
    >
    export type Binding_Pattern = p_.Transformer<
        s_in.Binding_Pattern,
        s_out.Phrase
    >
    export type Block = p_.Transformer<
        s_in.Block,
        s_out.Phrase
    >
    export type Class_Body = p_.Transformer<
        s_in.Class_Body,
        s_out.Phrase
    >
    export type Class = p_.Transformer<
        s_in.Class,
        s_out.Phrase
    >
    export type Entity_Name = p_.Transformer<
        s_in.Entity_Name,
        s_out.Phrase
    >
    export type Error_Recovery = p_.Transformer<
        s_in.Error_Recovery,
        s_out.Phrase
    >
    export type Expression_With_Type_Arguments = p_.Transformer<
        s_in.Expression_With_Type_Arguments,
        s_out.Phrase
    >
    export type Expression = p_.Transformer<
        s_in.Expression,
        s_out.Phrase
    >
    export type Heritage = p_.Transformer<
        s_in.Heritage,
        s_out.Phrase
    >
    export type Identifier = p_.Transformer<
        s_in.Identifier,
        s_out.Phrase
    >
    export type Initializer = p_.Transformer<
        s_in.Initializer,
        s_out.Phrase
    >
    export type JSDoc = p_.Transformer<
        s_in.JSDoc,
        s_out.Phrase
    >
    export type Module_Body = p_.Transformer<
        s_in.Module_Body,
        s_out.Phrase
    >
    export type Numeric_Literal = p_.Transformer<
        s_in.Numeric_Literal,
        s_out.Phrase
    >
    export type Object_Type = p_.Transformer<
        s_in.Object_Type,
        s_out.Phrase
    >
    export type Optional_Initializer = p_.Transformer<
        s_in.Optional_Initializer,
        s_out.Phrase
    >
    export type Optional_Type = p_.Transformer<
        s_in.Optional_Type,
        s_out.Phrase
    >
    export type Parameters = p_.Transformer<
        s_in.Parameters,
        s_out.Phrase
    >
    export type Property_Name = p_.Transformer<
        s_in.Property_Name,
        s_out.Phrase
    >
    export type Qualified_Name = p_.Transformer<
        s_in.Qualified_Name,
        s_out.Phrase
    >
    export type Return_Type_Annotation = p_.Transformer<
        s_in.Return_Type_Annotation,
        s_out.Phrase
    >
    export type Semi_Colon = p_.Transformer<
        s_in.Semi_Colon,
        s_out.Phrase
    >
    export type Signature_Modifiers = p_.Transformer<
        s_in.Signature_Modifiers,
        s_out.Phrase
    >
    export type Source_File = p_.Transformer<
        s_in.Source_File,
        s_out.Paragraph
    >
    export type Statement_Modifiers = p_.Transformer<
        s_in.Statement_Modifiers,
        s_out.Phrase
    >
    export type Statement = p_.Transformer<
        s_in.Statement,
        s_out.Phrase
    >
    export type Statements = p_.Transformer<
        s_in.Statements,
        s_out.Paragraph
    >
    export type String_Literal = p_.Transformer<
        s_in.String_Literal,
        s_out.Phrase
    >
    export type Type_Arguments = p_.Transformer<
        s_in.Type_Arguments,
        s_out.Phrase
    >
    export type Type_Parameters = p_.Transformer<
        s_in.Type_Parameters,
        s_out.Phrase
    >
    export type Type_Predicate = p_.Transformer<
        s_in.Type_Predicate,
        s_out.Phrase
    >
    export type Type = p_.Transformer<
        s_in.Type,
        s_out.Phrase
    >
    export type Variable_Declaration_List = p_.Transformer<
        s_in.Variable_Declaration_List,
        s_out.Phrase
    >
    export type Variable_Declaration = p_.Transformer<
        s_in.Variable_Declaration,
        s_out.Phrase
    >
}

//schemas

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_simple/target"

export const Arguments: declarations.Arguments = ($) => sh.ph.composed(p_.literal.list([
    p_.from.optional($['question dot token']).decide(
        () => sh.ph.text("?."),
        () => sh.ph.nothing()
    ),
    Type_Arguments($['type arguments']),
    Error_Recovery($['error recovery']),
    sh.ph.text("("),
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
                                                sh.ph.text("..."),
                                                Expression($['expression']),
                                            ])))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }
                                ))
                                case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                ]))
            )
        )
    ),
    sh.ph.text(")"),
]))

export const As_Alias: declarations.As_Alias = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.text(" as "),
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

export const Binding_Pattern: declarations.Binding_Pattern = ($) => sh.ph.composed(p_.literal.list([
    JSDoc($['jsdoc']),
    p_.from.optional($['modifiers']).decide(
        ($) => sh.ph.composed(
            p_.from.list($).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'async': return p_.option($, ($) => sh.ph.text("async "))
                            case 'declare': return p_.option($, ($) => sh.ph.text("declare "))
                            case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.text("@"),
                                Expression($['expression']),
                            ])))
                            case 'export': return p_.option($, ($) => sh.ph.text("export "))
                            case 'override': return p_.option($, ($) => sh.ph.text("override "))
                            case 'private': return p_.option($, ($) => sh.ph.text("private "))
                            case 'protected': return p_.option($, ($) => sh.ph.text("protected "))
                            case 'static': return p_.option($, ($) => sh.ph.text("static "))
                            case 'public': return p_.option($, ($) => sh.ph.text("public "))
                            case 'readonly': return p_.option($, ($) => sh.ph.text("readonly "))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
            ),
        ),
        () => sh.ph.nothing()
    ),
    p_.from.optional($['dot dot dot token']).decide(
        () => sh.ph.text("..."),
        () => sh.ph.nothing()
    ),
    p_.from.state($.type).decide(
        ($) => {
            switch ($[0]) {
                case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
                case 'array binding pattern': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    sh.ph.text("["),
                    sh.ph.composed(
                        p_.from.list($['elements']).map(
                            ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                        case 'entry': return p_.ss($, ($) => p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'binding element': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                        p_.from.optional($['dot dot dot token']).decide(
                                                            () => sh.ph.text("..."),
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
                    sh.ph.text("]"),
                ])))
                case 'number keyword': return p_.option($, ($) => sh.ph.text("number"))
                case 'object binding pattern': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    sh.ph.text("{"),
                    sh.ph.composed(
                        p_.from.list($['elements']).map(
                            ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            p_.from.optional($['dot dot dot token']).decide(
                                                ($) => sh.ph.text("..."),
                                                () => sh.ph.nothing()
                                            ),
                                            Property_Name($['property name']),
                                            p_.from.optional($['binding']).decide(
                                                ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text(": "),
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
                    sh.ph.text("}"),
                ])))
                case 'string keyword': return p_.option($, ($) => sh.ph.text("string"))
                default: return p_.exhaustive($[0])
            }
        }
    )
]))

export const Block: declarations.Block = ($) => sh.ph.composed(p_.literal.list([
    JSDoc($['jsdoc']),
    sh.ph.text("{"),
    sh.ph.indent(
        Statements($['statements'])
    ),
    sh.ph.text("}"),
]))

export const Class: declarations.Class = ($) => sh.ph.composed(p_.literal.list([
    JSDoc($['jsdoc']),
    p_.from.optional($['modifiers']).decide(
        ($) => sh.ph.composed(p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'abstract': return p_.option($, ($) => sh.ph.text("abstract "))
                        case 'declare': return p_.option($, ($) => sh.ph.text("declare "))
                        case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text("@"),
                            Expression($['expression']),
                        ])))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )),
        () => sh.ph.nothing()
    ),
    sh.ph.text("class "),
    p_.from.optional($['identifier']).decide(
        ($) => sh.ph.composed(p_.literal.list([Identifier($), sh.ph.text(" ")])),
        () => sh.ph.nothing()
    ),
    Type_Parameters($['type parameters']),
    Heritage($.heritage),
    Class_Body($['body']),
]))

export const Class_Body: declarations.Class_Body = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.text("{"),
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
                                                        case 'constructor keyword': return p_.option($, () => sh.ph.text("constructor"))
                                                        case 'constructor keyword as string literal': return p_.option($, () => sh.ph.text("constructor"))
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
                                            sh.ph.text("get "),
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
                                                () => sh.ph.text("*"),
                                                () => sh.ph.nothing()
                                            ),
                                            Property_Name($['name']),
                                            p_.from.optional($['question token']).decide(
                                                () => sh.ph.text("?"),
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
                                                () => sh.ph.text("?"),
                                                () => sh.ph.nothing()
                                            ),
                                            p_.from.optional($['exclamation token']).decide(
                                                () => sh.ph.text("!"),
                                                () => sh.ph.nothing()
                                            ),
                                            Optional_Type($['type']),
                                            Optional_Initializer($['initializer']),
                                            Semi_Colon($['semicolon']),
                                        ])))
                                        case 'set accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($['modifiers']),
                                            sh.ph.text("set "),
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
                                            sh.ph.text("static"),
                                            Block($['body']),
                                        ])))
                                        case 'index signature': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            JSDoc($['jsdoc']),
                                            Signature_Modifiers($.modifiers),
                                            sh.ph.text("["),
                                            sh.ph.composed(p_.from.list($['parameter']).map(
                                                ($) => p_.from.state($).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                            case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                Signature_Modifiers($.modifiers),
                                                                p_.from.optional($['dot dot dot token']).decide(() => sh.ph.text("..."), () => sh.ph.nothing()),
                                                                sh.ph.text($.identifier.text),
                                                                p_.from.optional($['question token']).decide(() => sh.ph.text("?"), () => sh.ph.nothing()),
                                                                p_.from.optional($.annotation).decide(
                                                                    ($) => sh.ph.composed(p_.literal.list([
                                                                        sh.ph.text(": "),
                                                                        Type($['type']),
                                                                    ])),
                                                                    () => sh.ph.nothing()
                                                                ),
                                                                p_.from.optional($.initializer).decide(
                                                                    ($) => sh.ph.composed(p_.literal.list([sh.ph.text(" = "), Expression($['expression'])])),
                                                                    () => sh.ph.nothing()
                                                                ),
                                                            ])))
                                                            default: return p_.exhaustive($[0])
                                                        }
                                                    }
                                                )
                                            )),
                                            sh.ph.text("]"),
                                            Return_Type_Annotation($['return type']),
                                            Semi_Colon($.semicolon),
                                        ])))
                                        case 'semicolon element': return p_.option($, ($) => sh.ph.composed(p_.literal.list([JSDoc($['jsdoc']), sh.ph.text(";")])))
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
    sh.ph.text("}"),
]))

export const Entity_Name: declarations.Entity_Name = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
            case 'qualified name': return p_.option($, ($) => Qualified_Name($))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Error_Recovery: declarations.Error_Recovery = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.from.list($['entries']).map(
        ($): s_out.Phrase => p_.from.state($).decide(
            ($) => {
                switch ($[0]) {
                    case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                    case 'entry': return p_.option($, ($) => Type($))
                    default: return p_.exhaustive($[0])
                }
            }
        )
    )),
    () => sh.ph.nothing()
)

export const Expression: declarations.Expression = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'array literal': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("["),
                sh.ph.composed(
                    p_.from.list($['elements']).map(
                        ($) => sh.ph.composed(p_.literal.list([
                            p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                        case 'entry': return p_.option($, ($) => Expression($))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            ),
                        ]))
                    )
                ),
                sh.ph.text("]"),
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
                sh.ph.text(" => "),
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
                sh.ph.text(" as "),
                Type($['type']),
            ])))
            case 'satisfies': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                sh.ph.text(" satisfies "),
                Type($['type']),
            ])))
            case 'assertion': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("<"),
                Type($['type']),
                sh.ph.text(">"),
                Expression($['expression']),
            ])))
            case 'await': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("await "),
                Expression($['expression']),
            ])))
            case 'big int literal': return p_.option($, ($) => sh.ph.text($.text))
            case 'binary': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['left']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '-': return p_.option($, ($) => sh.ph.text(" - "))
                            case '-=': return p_.option($, ($) => sh.ph.text(" -= "))
                            case '!=': return p_.option($, ($) => sh.ph.text(" != "))
                            case '!==': return p_.option($, ($) => sh.ph.text(" !== "))
                            case '??': return p_.option($, ($) => sh.ph.text(" ?? "))
                            case '??=': return p_.option($, ($) => sh.ph.text(" ??= "))
                            case '*': return p_.option($, ($) => sh.ph.text(" * "))
                            case '**': return p_.option($, ($) => sh.ph.text(" ** "))
                            case '**=': return p_.option($, ($) => sh.ph.text(" **= "))
                            case '*=': return p_.option($, ($) => sh.ph.text(" *= "))
                            case '/': return p_.option($, ($) => sh.ph.text(" / "))
                            case '/=': return p_.option($, ($) => sh.ph.text(" /= "))
                            case '&': return p_.option($, ($) => sh.ph.text(" & "))
                            case '&&': return p_.option($, ($) => sh.ph.text(" && "))
                            case '&&=': return p_.option($, ($) => sh.ph.text(" &&= "))
                            case '&=': return p_.option($, ($) => sh.ph.text(" &= "))
                            case '%': return p_.option($, ($) => sh.ph.text(" % "))
                            case '%=': return p_.option($, ($) => sh.ph.text(" %= "))
                            case '^': return p_.option($, ($) => sh.ph.text(" ^ "))
                            case '^=': return p_.option($, ($) => sh.ph.text(" ^= "))
                            case '+': return p_.option($, ($) => sh.ph.text(" + "))
                            case '+=': return p_.option($, ($) => sh.ph.text(" += "))
                            case '<': return p_.option($, ($) => sh.ph.text(" < "))
                            case '<<': return p_.option($, ($) => sh.ph.text(" << "))
                            case '<<=': return p_.option($, ($) => sh.ph.text(" <<= "))
                            case '<=': return p_.option($, ($) => sh.ph.text(" <= "))
                            case '=': return p_.option($, ($) => sh.ph.text(" = "))
                            case '==': return p_.option($, ($) => sh.ph.text(" == "))
                            case '===': return p_.option($, ($) => sh.ph.text(" === "))
                            case '>': return p_.option($, ($) => sh.ph.text(" > "))
                            case '>=': return p_.option($, ($) => sh.ph.text(" >= "))
                            case '>>': return p_.option($, ($) => sh.ph.text(" >> "))
                            case '>>=': return p_.option($, ($) => sh.ph.text(" >>= "))
                            case '>>>': return p_.option($, ($) => sh.ph.text(" >>> "))
                            case '>>>=': return p_.option($, ($) => sh.ph.text(" >>>= "))
                            case '|': return p_.option($, ($) => sh.ph.text(" | "))
                            case '|=': return p_.option($, ($) => sh.ph.text(" |= "))
                            case '||': return p_.option($, ($) => sh.ph.text(" || "))
                            case '||=': return p_.option($, ($) => sh.ph.text(" ||= "))
                            case 'in': return p_.option($, ($) => sh.ph.text(" in "))
                            case 'instanceof': return p_.option($, ($) => sh.ph.text(" instanceof "))
                            case ',': return p_.option($, ($) => sh.ph.text(", "))
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
                            case 'import': return p_.option($, ($) => sh.ph.text("import"))
                            case 'expression': return p_.option($, ($) => Expression($))
                            case 'super': return p_.option($, ($) => sh.ph.text("super"))
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
                sh.ph.text(" ? "),
                Expression($['when true']),
                sh.ph.text(" : "),
                Expression($['when false']),
            ])))
            case 'delete': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("delete "),
                Expression($['expression']),
            ])))
            case 'element access': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                p_.from.optional($['question dot token']).decide(
                    ($) => sh.ph.text("?."),
                    () => sh.ph.nothing()
                ),
                sh.ph.text("["),
                Expression($['argument expression']),
                sh.ph.text("]"),
            ])))
            case 'external module reference': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("require("),
                String_Literal($['module name']),
                sh.ph.text(")"),
            ])))
            case 'false': return p_.option($, ($) => sh.ph.text("false"))
            case 'function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                JSDoc($['jsdoc']),
                p_.from.optional($['modifiers']).decide(
                    ($) => sh.ph.composed(p_.from.list($).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'async': return p_.option($, ($) => sh.ph.text("async "))
                                    default: return p_.exhaustive($[0])
                                }
                            }
                        )
                    )),
                    () => sh.ph.nothing()
                ),
                sh.ph.text("function"),
                p_.from.optional($['asterisk token']).decide(
                    () => sh.ph.text("*"),
                    () => sh.ph.nothing()
                ),
                sh.ph.text(" "),
                p_.from.optional($['name']).decide(
                    ($) => sh.ph.composed(p_.literal.list([Identifier($), sh.ph.text(" ")])),
                    () => sh.ph.nothing()
                ),
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                Return_Type_Annotation($['return type']),
                Block($['body'])
            ])))
            case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
            case 'import keyword': return p_.option($, ($) => sh.ph.text("import"))
            case 'jsdoc': return p_.option($, ($) => sh.ph.text("FIX JSDoc"))
            case 'meta property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($['new keyword']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'new keyword': return p_.option($, () => sh.ph.text("new."))
                            case 'import keyword': return p_.option($, () => sh.ph.text("import."))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                Identifier($['identifier']),
            ])))
            case 'object literal': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("{"),
                sh.ph.composed(
                    p_.from.list($['properties']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                    case 'entry': return p_.ss($, ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'method': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    Signature_Modifiers($['modifiers']),
                                                    p_.from.optional($['asterisk token']).decide(
                                                        () => sh.ph.text("*"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    Property_Name($['name']),
                                                    p_.from.optional($['question token']).decide(
                                                        () => sh.ph.text("?"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    p_.from.optional($['exclamation token']).decide(
                                                        () => sh.ph.text("!"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    Type_Parameters($['type parameters']),
                                                    Parameters($['parameters']),
                                                    Return_Type_Annotation($['return type']),
                                                    p_.from.optional($['body']).decide(
                                                        ($) => Block($),
                                                        () => sh.ph.text(";")
                                                    ),
                                                    p_.from.optional($['semicolon']).decide(
                                                        () => sh.ph.nothing(),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                case 'property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    JSDoc($['jsdoc']),
                                                    Property_Name($['name']),
                                                    sh.ph.text(": "),
                                                    Expression($['initializer']),
                                                ])))
                                                case 'shorthand property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    JSDoc($['jsdoc']),
                                                    Identifier($['name']),
                                                    p_.from.optional($['initializer']).decide(
                                                        ($) => sh.ph.composed(p_.literal.list([
                                                            sh.ph.text(" = "),
                                                            Expression($['expression']),
                                                        ])),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                case 'spread': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text("..."),
                                                    Expression($['expression']),
                                                ])))
                                                case 'get accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text("get "),
                                                    Property_Name($['name']),
                                                    Parameters($['parameters']),
                                                    Return_Type_Annotation($['return type']),
                                                    p_.from.optional($['body']).decide(
                                                        ($) => Block($),
                                                        () => sh.ph.nothing()
                                                    ),
                                                ])))
                                                case 'set accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text("set "),
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
                sh.ph.text("}"),
            ])))
            case 'new': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("new "),
                Expression($['expression']),
                p_.from.optional($['arguments']).decide(($) => Arguments($), () => sh.ph.nothing()),
            ])))
            case 'no substitution template literal': return p_.option($, ($) => sh.ph.text($.text))
            case 'non null': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['expression']),
                sh.ph.text("!"),
            ])))

            case 'null keyword': return p_.option($, ($) => sh.ph.text("null"))
            case 'numeric literal': return p_.option($, ($) => Numeric_Literal($))
            case 'omitted expression': return p_.option($, ($) => sh.ph.nothing())
            case 'parenthesized': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("("),
                Expression($['expression']),
                sh.ph.text(")"),
            ])))
            case 'postfix unary': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['operand']),
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '--': return p_.option($, ($) => sh.ph.text("-"))
                            case '++': return p_.option($, ($) => sh.ph.text("+"))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            ])))
            case 'private identifier': return p_.option($, ($) => sh.ph.text($.text))
            case 'prefix unary': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($['operator token']).decide(
                    ($) => {
                        switch ($[0]) {
                            case '!': return p_.option($, ($) => sh.ph.text("!"))
                            case '--': return p_.option($, ($) => sh.ph.text("--"))
                            case '-': return p_.option($, ($) => sh.ph.text("-"))
                            case '+': return p_.option($, ($) => sh.ph.text("+"))
                            case '++': return p_.option($, ($) => sh.ph.text("++"))
                            case '~': return p_.option($, ($) => sh.ph.text("~"))
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
                            case '.': return p_.option($, ($) => sh.ph.text("."))
                            case '?.': return p_.option($, ($) => sh.ph.text("?."))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                p_.from.state($.identifier).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'named': return p_.option($, ($) => sh.ph.text($.text))
                            case 'private': return p_.option($, ($) => sh.ph.text($.text))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            ])))
            case 'regular expression literal': return p_.option($, ($) => sh.ph.text($.text))
            case 'string literal': return p_.option($, ($) => sh.ph.text($.text))
            case 'tagged template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Expression($['tag']),
                p_.from.optional($['question dot token']).decide(() => sh.ph.text("?."), () => sh.ph.nothing()),
                Type_Arguments($['type arguments']),
                p_.from.state($['template']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'no substitution template literal': return p_.option($, ($) => sh.ph.text($.text))
                            case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.text($['head'].text),
                                sh.ph.composed(
                                    p_.from.list($['template spans']).map(
                                        ($) => sh.ph.composed(p_.literal.list([
                                            Expression($['expression']),
                                            p_.from.state($['suffix']).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'middle': return p_.option($, ($) => sh.ph.text($.text))
                                                        case 'tail': return p_.option($, ($) => sh.ph.text($.text))
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
                sh.ph.text($.head.text),
                sh.ph.composed(
                    p_.from.list($['template spans']).map(
                        ($) => sh.ph.composed(p_.literal.list([
                            Expression($['expression']),
                            p_.from.state($['suffix']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'middle': return p_.option($, ($) => sh.ph.text($.text))
                                        case 'tail': return p_.option($, ($) => sh.ph.text($.text))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        ]))
                    )
                )
            ])))
            case 'super': return p_.option($, ($) => sh.ph.text("super"))
            case 'this': return p_.option($, ($) => sh.ph.text("this"))
            case 'true keyword': return p_.option($, ($) => sh.ph.text("true"))
            case 'type of': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("typeof "),
                Expression($['expression']),
            ])))
            case 'void': return p_.option($, ($) => sh.ph.text("void"))
            case 'yield': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("yield"),
                p_.from.optional($['asterisk token']).decide(
                    ($) => sh.ph.text("*"),
                    () => sh.ph.nothing()
                ),
                p_.from.optional($['expression']).decide(
                    ($) => sh.ph.composed(p_.literal.list([sh.ph.text(" "), Expression($)])),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'spread element': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("..."),
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

export const Expression_With_Type_Arguments: declarations.Expression_With_Type_Arguments = ($) => sh.ph.composed(p_.literal.list([
    Expression($['expression']),
    Type_Arguments($['type arguments'])
]))

export const Heritage: declarations.Heritage = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.from.list($).map(
        ($) => sh.ph.composed(
            p_.literal.list([
                p_.from.state($['extends or implements keyword']).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'extends': return p_.option($, ($) => sh.ph.text("extends "))
                            case 'implements': return p_.option($, ($) => sh.ph.text("implements "))
                            default: return p_.exhaustive($[0])
                        }
                    }
                ),
                sh.ph.composed(p_.from.list($.types).map(
                    ($) => p_.from.state($).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'separator': return p_.option($, ($) => sh.ph.text(", "))
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

export const Identifier: declarations.Identifier = ($) => sh.ph.text($.text)

export const Initializer: declarations.Initializer = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.text(" = "),
    Expression($['expression']),
]))

export const JSDoc: declarations.JSDoc = ($) => sh.ph.composed(
    p_.from.list($).map(
        ($) => sh.ph.composed(p_.literal.list([
            sh.ph.text("/**"),
            sh.ph.text("FIX JSDoc"),
            sh.ph.text("*/")
        ])),
    )
)

export const Module_Body: declarations.Module_Body = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'module block': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text(" {"),
                sh.ph.indent(
                    sh.pg.deprecated_composed(p_.literal.list([
                        sh.pg.sentences(p_.literal.list([
                            sh.sentence(p_.literal.list([])),
                        ])),
                        Statements($['statements'])
                    ])),
                ),
                sh.ph.text("}"),
            ])))
            case 'dotted': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("."),
                sh.ph.text($['module declaration']['name'].text),
                Module_Body($['module declaration']['block']),
            ])))
            case 'shorthand': return p_.option($, ($) => Semi_Colon($))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Object_Type: declarations.Object_Type = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.text("{"),
    sh.ph.indent(
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
                                    p_.from.optional($['comma']).decide(() => sh.ph.text(","), () => sh.ph.nothing()),
                                ])))
                                case 'construct': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    JSDoc($['jsdoc']),
                                    sh.ph.text("new "),
                                    Type_Parameters($['type parameters']),
                                    Parameters($.parameters),
                                    Optional_Type($.type),
                                    Semi_Colon($.semicolon),
                                    p_.from.optional($['comma']).decide(() => sh.ph.text(","), () => sh.ph.nothing()),
                                ])))

                                case 'get accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    JSDoc($['jsdoc']),
                                    sh.ph.text("get "),
                                    Property_Name($['name']),
                                    Parameters($['parameters']),
                                    Return_Type_Annotation($['return type']),
                                    p_.from.optional($['body']).decide(($) => Block($), () => sh.ph.nothing()),
                                    Semi_Colon($['semicolon']),
                                    p_.from.optional($['comma']).decide(() => sh.ph.text(","), () => sh.ph.nothing()),
                                ])))
                                case 'set accessor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    JSDoc($['jsdoc']),
                                    sh.ph.text("set "),
                                    Property_Name($['name']),
                                    Parameters($['parameters']),
                                    Return_Type_Annotation($['return type']),
                                    p_.from.optional($['body']).decide(($) => Block($), () => sh.ph.nothing()),
                                    Semi_Colon($['semicolon']),
                                    p_.from.optional($['comma']).decide(() => sh.ph.text(","), () => sh.ph.nothing()),
                                ])))

                                case 'index': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    JSDoc($['jsdoc']),
                                    Signature_Modifiers($.modifiers),
                                    sh.ph.text("["),
                                    sh.ph.composed(p_.from.list($['parameter']).map(
                                        ($) => p_.from.state($).decide(
                                            ($) => {
                                                switch ($[0]) {
                                                    case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                    case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                        Signature_Modifiers($.modifiers),
                                                        p_.from.optional($['dot dot dot token']).decide(() => sh.ph.text("..."), () => sh.ph.nothing()),
                                                        sh.ph.text($.identifier.text),
                                                        p_.from.optional($['question token']).decide(() => sh.ph.text("?"), () => sh.ph.nothing()),
                                                        p_.from.optional($.annotation).decide(
                                                            ($) => sh.ph.composed(p_.literal.list([
                                                                sh.ph.text(": "),
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
                                    sh.ph.text("]"),
                                    Return_Type_Annotation($['return type']),
                                    Semi_Colon($.semicolon),
                                    p_.from.optional($['comma']).decide(() => sh.ph.text(","), () => sh.ph.nothing()),
                                ])))
                                case 'method': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    JSDoc($['jsdoc']),
                                    // Signature_Modifiers($.modifiers),
                                    Property_Name($['identifier']),
                                    Type_Parameters($['type parameters']),
                                    p_.from.optional($['question token']).decide(
                                        ($) => sh.ph.text("?"),
                                        () => sh.ph.nothing()
                                    ),
                                    Parameters($.parameters),
                                    Return_Type_Annotation($['return type']),
                                    Semi_Colon($['semicolon']),
                                    p_.from.optional($['comma']).decide(
                                        ($) => sh.ph.text(","),
                                        () => sh.ph.nothing()
                                    ),
                                ])))
                                case 'property': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    JSDoc($['jsdoc']),
                                    Signature_Modifiers($.modifiers),
                                    Property_Name($['id']),
                                    p_.from.optional($['question token']).decide(
                                        ($) => sh.ph.text("?"),
                                        () => sh.ph.nothing()
                                    ),
                                    Optional_Type($['type annotation']),
                                    Optional_Initializer($['initializer']),
                                    p_.from.optional($['comma token']).decide(
                                        ($) => sh.ph.text(","),
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
    ),
    sh.ph.text("}")
]))

export const Optional_Initializer: declarations.Optional_Initializer = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        Initializer($),
    ])),
    () => sh.ph.nothing()
)

export const Optional_Type: declarations.Optional_Type = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        sh.ph.text(": "),
        Type($['type']),
    ])),
    () => sh.ph.nothing()
)

export const Numeric_Literal: declarations.Numeric_Literal = ($) => sh.ph.text($.text)

export const Parameters: declarations.Parameters = ($) => sh.ph.composed(p_.literal.list([
    sh.ph.text("("),
    sh.ph.composed(
        p_.from.list($.entries).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            p_.from.optional($['dot dot dot token']).decide(
                                () => sh.ph.text("..."),
                                () => sh.ph.nothing()
                            ),
                            Binding_Pattern($.name),
                            p_.from.optional($['question token']).decide(
                                () => sh.ph.text("?"),
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
    sh.ph.text(")"),
]))

export const Property_Name: declarations.Property_Name = ($) => p_.from.state($.type).decide(
    ($) => {
        switch ($[0]) {
            case 'computed': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("["),
                Expression($['expression']),
                sh.ph.text("]"),
            ])))
            case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
            case 'numeric literal': return p_.option($, ($) => Numeric_Literal($))
            case 'big int literal': return p_.option($, ($) => sh.ph.text($.text))
            case 'private identifier': return p_.option($, ($) => sh.ph.text($.text))
            case 'string literal': return p_.option($, ($) => sh.ph.text($.text))
            default: return p_.exhaustive($[0])
        }
    }
)

export const Qualified_Name: declarations.Qualified_Name = ($) => sh.ph.composed(p_.literal.list([
    Entity_Name($['first']),
    sh.ph.text("."),
    sh.ph.text($['second'].text),
]))

export const Return_Type_Annotation: declarations.Return_Type_Annotation = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        sh.ph.text(": "),
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

export const Semi_Colon: declarations.Semi_Colon = ($) => p_.from.optional($).decide(
    ($) => sh.ph.text(";"),
    () => sh.ph.nothing()
)

export const Signature_Modifiers: declarations.Signature_Modifiers = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'abstract': return p_.option($, ($) => sh.ph.text("abstract "))
                        case 'accessor': return p_.option($, ($) => sh.ph.text("accessor "))
                        case 'async': return p_.option($, ($) => sh.ph.text("async "))
                        case 'const': return p_.option($, ($) => sh.ph.text("const "))
                        case 'declare': return p_.option($, ($) => sh.ph.text("declare "))
                        case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text("@"),
                            Expression($['expression']),
                            sh.ph.text(" "),
                        ])))
                        case 'export': return p_.option($, ($) => sh.ph.text("export "))
                        case 'in': return p_.option($, ($) => sh.ph.text("in "))
                        case 'out': return p_.option($, ($) => sh.ph.text("out "))
                        case 'override': return p_.option($, ($) => sh.ph.text("override "))
                        case 'private': return p_.option($, ($) => sh.ph.text("private "))
                        case 'protected': return p_.option($, ($) => sh.ph.text("protected "))
                        case 'public': return p_.option($, ($) => sh.ph.text("public "))
                        case 'readonly': return p_.option($, ($) => sh.ph.text("readonly "))
                        case 'static': return p_.option($, ($) => sh.ph.text("static "))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )
    ),
    () => sh.ph.nothing()
)

export const Source_File: declarations.Source_File = ($) => sh.pg.deprecated_composed(p_.literal.list([
    Statements($['statements']),
    sh.pg.sentences(p_.literal.list([
        sh.sentence(p_.literal.list([
            JSDoc($['end of file'].jsdoc)
        ]))
    ]))
]))

export const Statement: declarations.Statement = ($) => sh.ph.composed(p_.literal.list([
    p_.from.state($).decide(
        ($) => {
            switch ($[0]) {
                case 'block': return p_.option($, ($) => Block($))
                case 'break': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("break"),
                    p_.from.optional($['identifier']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text(" "),
                            sh.ph.text($.text),
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
                    sh.ph.text("continue"),
                    p_.from.optional($['label']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text(" "),
                            sh.ph.text($.text),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'do': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("do "),
                    Statement($['statement']),
                    sh.ph.text(" while ("),
                    Expression($['expression']),
                    sh.ph.text(")"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'empty': return p_.option($, ($) => sh.ph.composed(p_.literal.list([JSDoc($['jsdoc']), sh.ph.text(";")])))
                case 'debugger': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("debugger"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'enum': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("enum "),
                    sh.ph.text($['identifier'].text),
                    sh.ph.text(" {"),
                    sh.ph.indent(
                        sh.pg.sentences(
                            p_.from.list($['members']).map(
                                ($) => sh.sentence(p_.literal.list([
                                    p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'separator': return p_.option($, ($) => sh.ph.text(", "))
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
                    ),
                    sh.ph.text("}"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'export assignment': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("export "),
                    p_.from.state($['type']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'default': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text("default "),
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
                    sh.ph.text("export "),
                    p_.from.optional($['type keyword']).decide(
                        ($) => sh.ph.text("type "),
                        () => sh.ph.nothing()
                    ),
                    p_.from.state($['type']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'all': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text("*"),
                                    p_.from.optional($['as']).decide(
                                        ($) => As_Alias($),
                                        () => sh.ph.nothing()
                                    )
                                ])))
                                case 'named': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text("{"),
                                    sh.ph.composed(
                                        p_.from.list($['exports']).map(
                                            ($) => p_.from.state($).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            p_.from.optional($['type keyword']).decide(() => sh.ph.text("type "), () => sh.ph.nothing()),
                                                            sh.ph.text($.identifier.text),
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
                                    sh.ph.text("}"),
                                ])))
                                case 'namespace': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text("*"),
                                    sh.ph.text(" as "),
                                    sh.ph.text($['identifier'].text),
                                ])))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    p_.from.optional($['from clause']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text(" from "),
                            p_.from.state($['module specifier']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
                                        case 'string literal': return p_.option($, ($) => sh.ph.text($.text))
                                        case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.text($.head.text),
                                            sh.ph.composed(
                                                p_.from.list($['template spans']).map(
                                                    ($) => sh.ph.composed(p_.literal.list([
                                                        Expression($['expression']),
                                                        p_.from.state($['suffix']).decide(
                                                            ($) => {
                                                                switch ($[0]) {
                                                                    case 'middle': return p_.option($, ($) => sh.ph.text($.text))
                                                                    case 'tail': return p_.option($, ($) => sh.ph.text($.text))
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
                            sh.ph.text(" assert {"),
                            sh.ph.composed(p_.from.list($['elements']).map(
                                ($) => p_.from.state($).decide(
                                    ($) => {
                                        switch ($[0]) {
                                            case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                            case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                sh.ph.text($.name.text),
                                                sh.ph.text(": "),
                                                Expression($['value']),
                                            ])))
                                            default: return p_.exhaustive($[0])
                                        }
                                    }
                                )
                            )),
                            sh.ph.text("}"),
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
                    sh.ph.text("for ("),
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
                    sh.ph.text("; "),
                    p_.from.optional($['condition']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.text("; "),
                    p_.from.optional($['incrementor']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.text(") "),
                    Statement($['statement']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'for in': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("for ("),
                    p_.from.state($['initializer']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'variable declaration list': return p_.option($, ($) => Variable_Declaration_List($))
                                case 'expression': return p_.option($, ($) => Expression($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    sh.ph.text(" in "),
                    Expression($['expression']),
                    sh.ph.text(") "),
                    Statement($['statement']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'for of': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("for "),
                    p_.from.optional($['await keyword']).decide(
                        () => sh.ph.text("await "),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.text("("),
                    p_.from.state($['initializer']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'variable declaration list': return p_.option($, ($) => Variable_Declaration_List($))
                                case 'expression': return p_.option($, ($) => Expression($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    ),
                    sh.ph.text(" of "),
                    Expression($['expression']),
                    sh.ph.text(") "),
                    Statement($['statement']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("function"),
                    p_.from.optional($['asterisk token']).decide(
                        () => sh.ph.text("*"),
                        () => sh.ph.nothing()
                    ),
                    sh.ph.text(" "),
                    p_.from.optional($['identifier']).decide(
                        ($) => Identifier($),
                        () => sh.ph.nothing()
                    ),
                    Type_Parameters($['type parameters']),
                    Parameters($['parameters']),
                    Return_Type_Annotation($['return type annotation']),
                    sh.ph.text(" "),
                    p_.from.optional($['body']).decide(
                        ($) => Block($),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'if': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("if ("),
                    Expression($['expression']),
                    sh.ph.text(") "),
                    Statement($['then statement']),
                    p_.from.optional($['else']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text(" else "),
                            Statement($['statement']),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("import "),
                    p_.from.optional($['clause']).decide(
                        ($) => sh.ph.composed(p_.literal.list([
                            p_.from.optional($['type keyword']).decide(
                                () => sh.ph.text("type "),
                                () => sh.ph.nothing()
                            ),
                            p_.from.state($['type']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'identifier': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.text($['identifier'].text),
                                            p_.from.optional($['named']).decide(
                                                ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text(", "),
                                                    p_.from.state($['bindings']).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'named imports': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                    sh.ph.text("{"),
                                                                    sh.ph.composed(
                                                                        p_.from.list($.entries).map(
                                                                            ($): s_out.Phrase => p_.from.state($).decide(
                                                                                ($) => {
                                                                                    switch ($[0]) {
                                                                                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                                            p_.from.optional($['type keyword']).decide(
                                                                                                ($) => sh.ph.text("type "),
                                                                                                () => sh.ph.nothing()
                                                                                            ),
                                                                                            sh.ph.text($.identifier.text),
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
                                                                    sh.ph.text("}"),
                                                                ])))
                                                                case 'namespace import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                    sh.ph.text("* as "),
                                                                    sh.ph.text($['identifier'].text)
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
                                            sh.ph.text("{"),
                                            sh.ph.composed(
                                                p_.from.list($.entries).map(
                                                    ($): s_out.Phrase => p_.from.state($).decide(
                                                        ($) => {
                                                            switch ($[0]) {
                                                                case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                                case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                    p_.from.optional($['type keyword']).decide(
                                                                        ($) => sh.ph.text("type "),
                                                                        () => sh.ph.nothing()
                                                                    ),
                                                                    sh.ph.text($.identifier.text),
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
                                            sh.ph.text("}"),
                                        ])))
                                        case 'namespace import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.text("* as "),
                                            sh.ph.text($['identifier'].text)
                                        ])))
                                        case 'defer': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            sh.ph.text("defer "),
                                            p_.from.state($['import']).decide(
                                                ($) => {
                                                    switch ($[0]) {
                                                        case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
                                                        case 'namespace import': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            sh.ph.text("* as "),
                                                            sh.ph.text($['identifier'].text)
                                                        ])))
                                                        case 'named imports': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                            sh.ph.text("{"),
                                                            sh.ph.composed(p_.from.list($.entries).map(
                                                                ($): s_out.Phrase => p_.from.state($).decide(
                                                                    ($) => {
                                                                        switch ($[0]) {
                                                                            case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                                            case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                                                p_.from.optional($['type keyword']).decide(() => sh.ph.text("type "), () => sh.ph.nothing()),
                                                                                sh.ph.text($.identifier.text),
                                                                                p_.from.optional($['as']).decide(($) => As_Alias($), () => sh.ph.nothing()),
                                                                            ])))
                                                                            default: return p_.exhaustive($[0])
                                                                        }
                                                                    }
                                                                )
                                                            )),
                                                            sh.ph.text("}"),
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
                            sh.ph.text(" "),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    p_.from.optional($['from keyword']).decide(
                        () => sh.ph.text("from "),
                        () => sh.ph.nothing()
                    ),
                    p_.from.state($['module specifier']).decide(
                        ($) => {
                            switch ($[0]) {
                                case 'identifier': return p_.option($, ($) => sh.ph.text($.text))
                                case 'string literal': return p_.option($, ($) => sh.ph.text($.text))
                                case 'template': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text($.head.text),
                                    sh.ph.composed(
                                        p_.from.list($['template spans']).map(
                                            ($) => sh.ph.composed(p_.literal.list([
                                                Expression($['expression']),
                                                p_.from.state($['suffix']).decide(
                                                    ($) => {
                                                        switch ($[0]) {
                                                            case 'middle': return p_.option($, ($) => sh.ph.text($.text))
                                                            case 'tail': return p_.option($, ($) => sh.ph.text($.text))
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
                            sh.ph.text(" with {"),
                            sh.ph.composed(
                                p_.from.list($['elements']).map(
                                    ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                                case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text($.name.text),
                                                    sh.ph.text(": "),
                                                    Expression($['value']),
                                                ])))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    )
                                )
                            ),
                            sh.ph.text("}"),
                        ])),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'import equals': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("import "),
                    p_.from.optional($['type keyword']).decide(() => sh.ph.text("type "), () => sh.ph.nothing()),
                    sh.ph.text($['identifier'].text),
                    Initializer($['initializer']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'interface': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("interface "),
                    sh.ph.text($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    Heritage($.heritage),
                    sh.ph.text(" "),
                    Object_Type($['body']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'labeled': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text($['identifier'].text),
                    sh.ph.text(": "),
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
                                        sh.ph.text("module "),
                                        Property_Name($['name']),
                                    ]))
                                )
                                case 'namespace': return p_.option($, ($) => sh.ph.composed(
                                    p_.literal.list([
                                        sh.ph.text("namespace "),
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
                    sh.ph.text("export "),
                    sh.ph.text("as "),
                    sh.ph.text("namespace "),
                    sh.ph.text($['identifier'].text),
                    Semi_Colon($['semicolon']),
                ])))
                case 'return': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("return "),
                    p_.from.optional($['expression']).decide(
                        ($) => Expression($),
                        () => sh.ph.nothing()
                    ),
                    Semi_Colon($['semicolon']),
                ])))
                case 'switch': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("switch ("),
                    Expression($['expression']),
                    sh.ph.text(") {"),
                    sh.ph.indent(
                        sh.pg.sentences(
                            p_.from.list($['case block']['clauses']).map(
                                ($): s_out.Sentence => sh.sentence(p_.literal.list([
                                    p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'case': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text("case "),
                                                    Expression($['expression']),
                                                    sh.ph.text(":"),
                                                    sh.ph.indent(
                                                        Statements($['statements'])
                                                    )
                                                ])))
                                                case 'default': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                                    sh.ph.text("default:"),
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
                    sh.ph.text("}"),
                    Semi_Colon($['semicolon']),
                ])))
                case 'try': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("try "),
                    Block($['try block']),
                    sh.ph.composed(p_.literal.list([
                        p_.from.optional($['catch clause']).decide(
                            ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.text(" catch"),
                                p_.from.optional($['binding']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        sh.ph.text(" ("),
                                        Variable_Declaration($['variable declaration']),
                                        sh.ph.text(")"),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                                sh.ph.text(" "),
                                Block($['block']),
                            ])),
                            () => sh.ph.nothing()
                        ),
                        p_.from.optional($['finally block']).decide(
                            ($) => sh.ph.composed(p_.literal.list([
                                sh.ph.text(" finally "),
                                Block($['block']),
                            ])),
                            () => sh.ph.nothing()
                        )
                    ])),
                    Semi_Colon($['semicolon']),
                ])))
                case 'throw': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("throw "),
                    Expression($['expression']),
                    Semi_Colon($['semicolon']),
                ])))
                case 'type alias': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    Statement_Modifiers($['modifiers']),
                    sh.ph.text("type "),
                    sh.ph.text($['identifier'].text),
                    Type_Parameters($['type parameters']),
                    sh.ph.text(" = "),
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
                    sh.ph.text("while ("),
                    Expression($['expression']),
                    sh.ph.text(") "),
                    Statement($['statement'])
                ])))
                case 'with': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                    JSDoc($['jsdoc']),
                    sh.ph.text("with ("),
                    Expression($['expression']),
                    sh.ph.text(") "),
                    Statement($['statement']),
                ])))
                default: return p_.exhaustive($[0])
            }
        }
    ),
    // p_.from.optional($['semicolon token']).decide(
    //     ($) => sh.ph.text(";"),
    //     () => sh.ph.nothing()
    // )
]))

export const Statements: declarations.Statements = ($) => sh.pg.deprecated_composed(
    p_.from.list($).map(
        ($) => sh.pg.sentences(p_.literal.list([
            sh.sentence(p_.literal.list([
                Statement($),
            ])),
            sh.sentence(p_.literal.list([])),
        ])),
    )
)

export const Statement_Modifiers: declarations.Statement_Modifiers = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(
        p_.from.list($).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'abstract': return p_.option($, ($) => sh.ph.text("abstract "))
                        case 'accessor': return p_.option($, ($) => sh.ph.text("accessor "))
                        case 'async': return p_.option($, ($) => sh.ph.text("async "))
                        case 'const': return p_.option($, ($) => sh.ph.text("const "))
                        case 'declare': return p_.option($, ($) => sh.ph.text("declare "))
                        case 'decorator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            sh.ph.text("@"),
                            Expression($['expression']),
                            sh.ph.text(" "),
                        ])))
                        case 'default': return p_.option($, ($) => sh.ph.text("default "))
                        case 'export': return p_.option($, ($) => sh.ph.text("export "))
                        case 'private': return p_.option($, ($) => sh.ph.text("private "))
                        case 'protected': return p_.option($, ($) => sh.ph.text("protected "))
                        case 'public': return p_.option($, ($) => sh.ph.text("public "))
                        case 'readonly': return p_.option($, ($) => sh.ph.text("readonly "))
                        case 'static': return p_.option($, ($) => sh.ph.text("static "))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        )
    ),
    () => sh.ph.nothing()
)

export const String_Literal: declarations.String_Literal = ($) => sh.ph.text($.text)


export const Type_Predicate: declarations.Type_Predicate = ($) => sh.ph.composed(p_.literal.list([
    p_.from.optional($['asserts keyword']).decide(
        () => sh.ph.text("asserts "),
        () => sh.ph.nothing()
    ),
    p_.from.state($['parameter name']).decide(
        ($) => {
            switch ($[0]) {
                case 'identifier': return p_.option($, ($) => Identifier($))
                case 'this': return p_.option($, ($) => sh.ph.text("this"))
                default: return p_.exhaustive($[0])
            }
        }
    ),
    p_.from.optional($['is predicate']).decide(
        ($) => sh.ph.composed(p_.literal.list([
            sh.ph.text(" is "),
            Type($['type']),
        ])),
        () => sh.ph.nothing()
    ),
]))

export const Type: declarations.Type = ($) => p_.from.state($).decide(
    ($) => {
        switch ($[0]) {
            case 'any': return p_.option($, ($) => sh.ph.text("any"))
            case 'array': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['element type']),
                sh.ph.text("[]"),
            ])))
            case 'big int': return p_.option($, ($) => sh.ph.text("bigint"))
            case 'boolean': return p_.option($, ($) => sh.ph.text("boolean"))
            case 'conditional': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['check type']),
                sh.ph.text(" extends "),
                Type($['extends type']),
                sh.ph.text(" ? "),
                Type($['true type']),
                sh.ph.text(" : "),
                Type($['false type']),
            ])))
            case 'constructor': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Signature_Modifiers($['modifiers']),
                sh.ph.text("new "),
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                sh.ph.text(" => "),
                Type($['type']),
            ])))
            case 'function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type_Parameters($['type parameters']),
                Parameters($['parameters']),
                Optional_Type($['type']),
                sh.ph.text(" => "),
                Type($['return type']),
            ])))
            case 'intrinsic': return p_.option($, ($) => sh.ph.text("intrinsic"))
            case 'import type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.optional($['typeof keyword']).decide(
                    () => sh.ph.text("typeof "),
                    () => sh.ph.nothing()
                ),
                sh.ph.text("import("),
                Type($['argument']),
                p_.from.optional($['attributes']).decide(
                    ($) => sh.ph.composed(p_.literal.list([
                        sh.ph.text(", { with: "),
                        sh.ph.composed(p_.from.list($['import attributes']['entries']).map(
                            ($) => p_.from.state($).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                                            Property_Name($['name']),
                                            sh.ph.text(": "),
                                            Expression($.value),
                                        ])))
                                        default: return p_.exhaustive($[0])
                                    }
                                }
                            )
                        )),
                        sh.ph.text(" }"),
                    ])),
                    () => sh.ph.nothing()
                ),
                sh.ph.text(")"),
                p_.from.optional($['qualifier']).decide(
                    ($) => sh.ph.composed(p_.literal.list([
                        sh.ph.text("."),
                        Entity_Name($['name']),
                    ])),
                    () => sh.ph.nothing()
                ),
                Type_Arguments($['type arguments']),
                Error_Recovery($['error recovery']),
            ])))
            case 'indexed access': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['object type']),
                sh.ph.text("["),
                Type($['index type']),
                sh.ph.text("]"),
            ])))
            case 'infer': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("infer "),
                Identifier($['type parameter']['identifier']),
                p_.from.optional($['type parameter'].extends).decide(
                    ($) => sh.ph.composed(p_.literal.list([
                        sh.ph.text(" extends "),
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
                                case 'separator': return p_.option($, ($) => sh.ph.text(" & "))
                                case 'entry': return p_.option($, ($) => Type($))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    )
                ),
            ))
            case 'jsdoc all': return p_.option($, ($) => sh.ph.text("*"))
            case 'jsdoc function': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("function"),
                Parameters($['parameters']),
                Optional_Type($['type']),
            ])))
            case 'jsdoc non nullable': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.optional($['exclamation token before']).decide(
                    () => sh.ph.text("!"),
                    () => sh.ph.nothing()
                ),
                Type($['type']),
                p_.from.optional($['exclamation token after']).decide(
                    () => sh.ph.text("!"),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'jsdoc nullable': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.optional($['question token before']).decide(
                    () => sh.ph.text("?"),
                    () => sh.ph.nothing()
                ),
                Type($['type']),
                p_.from.optional($['question token after']).decide(
                    () => sh.ph.text("?"),
                    () => sh.ph.nothing()
                ),
            ])))
            case 'jsdoc unknown': return p_.option($, ($) => sh.ph.text("?"))
            case 'literal type': return p_.option($, ($) => p_.from.state($.type).decide(
                ($) => {
                    switch ($[0]) {
                        case 'bigint literal': return p_.option($, ($) => sh.ph.text($.text))
                        case 'false keyword': return p_.option($, ($) => sh.ph.text("false"))
                        case 'negative numeric literal': return p_.option($, ($) => sh.ph.text("-" + $['value'].text))
                        case 'no substitution template literal': return p_.option($, ($) => sh.ph.text($.text))
                        case 'null': return p_.option($, ($) => sh.ph.text("null"))
                        case 'numeric literal': return p_.option($, ($) => Numeric_Literal($))
                        case 'string literal': return p_.option($, ($) => sh.ph.text($.text))
                        case 'true keyword': return p_.option($, ($) => sh.ph.text("true"))
                        default: return p_.exhaustive($[0])
                    }
                }
            ))
            case 'mapped': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("{"),
                sh.ph.indent(
                    sh.pg.sentences(p_.literal.list([
                        sh.sentence(
                            p_.literal.list([
                                p_.from.optional($['readonly modifier']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        p_.from.optional($['modifier']).decide(
                                            ($) => sh.ph.text($.text),
                                            () => sh.ph.nothing()
                                        ),
                                        sh.ph.text("readonly "),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                                sh.ph.text("["),
                                Identifier($['type parameter']['identifier']),
                                sh.ph.text(" in "),
                                Type($['type parameter']['constraint']),
                                p_.from.optional($['as']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        sh.ph.text(" as "),
                                        Type($.type),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                                sh.ph.text("]"),
                                p_.from.optional($['question modifier minus']).decide(() => sh.ph.text("-"), () => sh.ph.nothing()),
                                p_.from.optional($['question modifier plus']).decide(() => sh.ph.text("+"), () => sh.ph.nothing()),
                                p_.from.optional($['question modifier question']).decide(() => sh.ph.text("?"), () => sh.ph.nothing()),
                                p_.from.optional($['body']).decide(
                                    ($) => sh.ph.composed(p_.literal.list([
                                        sh.ph.text(": "),
                                        Type($['type']),
                                    ])),
                                    () => sh.ph.nothing()
                                ),
                            ]),
                        )
                    ]))
                ),
                sh.ph.text("}"),
            ])))
            case 'never': return p_.option($, ($) => sh.ph.text("never"))
            case 'number': return p_.option($, ($) => sh.ph.text("number"))
            case 'object': return p_.option($, ($) => sh.ph.text("object"))
            case 'parenthesized': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("("),
                Type($['type']),
                sh.ph.text(")"),
            ])))
            case 'query': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("typeof "),
                Entity_Name($['name']),
                Type_Arguments($['type arguments']),
            ])))
            case 'string': return p_.option($, ($) => sh.ph.text("string"))
            case 'symbol': return p_.option($, ($) => sh.ph.text("symbol"))
            case 'tuple type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("["),
                sh.ph.composed(
                    p_.from.list($['elements']).map(
                        ($) => p_.from.state($).decide(
                            ($) => {
                                switch ($[0]) {
                                    case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                                    case 'entry': return p_.option($, ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'named': return p_.ss($, ($) => sh.ph.composed(p_.literal.list([
                                                    JSDoc($['jsdoc']),
                                                    p_.from.optional($['dot dot dot token']).decide(
                                                        () => sh.ph.text("..."),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    sh.ph.text($.name.text),
                                                    p_.from.optional($['question token']).decide(
                                                        () => sh.ph.text("?"),
                                                        () => sh.ph.nothing()
                                                    ),
                                                    sh.ph.text(": "),
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
                sh.ph.text("]"),
            ])))
            case 'rest type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text("..."),
                Type($['type']),
            ])))
            case 'type literal': return p_.option($, ($) => Object_Type($))
            case 'type operator': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                p_.from.state($.operator).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'key of': return p_.option($, ($) => sh.ph.text("keyof "))
                            case 'unique': return p_.option($, ($) => sh.ph.text("unique "))
                            case 'readonly': return p_.option($, ($) => sh.ph.text("readonly "))
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
                    ($) => sh.ph.text("."),
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
                                case 'separator': return p_.option($, ($) => sh.ph.text(" | "))
                                default: return p_.exhaustive($[0])
                            }
                        }
                    )
                ),
            ))
            case 'optional type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                Type($['type']),
                sh.ph.text("?"),
            ])))
            case 'undefined': return p_.option($, ($) => sh.ph.text("undefined"))
            case 'unknown': return p_.option($, ($) => sh.ph.text("unknown"))
            case 'this': return p_.option($, ($) => sh.ph.text("this"))
            case 'void': return p_.option($, ($) => sh.ph.text("void"))
            case 'template literal type': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                sh.ph.text($.head.text),
                sh.ph.composed(
                    p_.from.list($['template spans']).map(
                        ($) => sh.ph.composed(p_.literal.list([
                            Type($['type']),
                            p_.from.state($['suffix']).decide(
                                ($) => {
                                    switch ($[0]) {
                                        case 'middle': return p_.option($, ($) => sh.ph.text($.text))
                                        case 'tail': return p_.option($, ($) => sh.ph.text($.text))
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

export const Type_Arguments: declarations.Type_Arguments = ($) => p_.from.optional($).decide(
    ($) => sh.ph.composed(p_.literal.list([
        sh.ph.text("<"),
        sh.ph.composed(
            p_.from.list($['entries']).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                            case 'entry': return p_.option($, ($) => Type($))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            )
        ),
        sh.ph.text(">")
    ])),
    () => sh.ph.nothing()
)

export const Type_Parameters: declarations.Type_Parameters = ($) => p_.from.optional($).decide(
    ($) => sh.ph.rich_phrase(
        p_.from.list($['entries']).map(
            ($) => p_.from.state($).decide(
                ($) => {
                    switch ($[0]) {
                        case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                        case 'entry': return p_.option($, ($) => sh.ph.composed(p_.literal.list([
                            p_.from.optional($['modifiers']).decide(
                                ($) => sh.ph.composed(p_.from.list($).map(
                                    ($) => p_.from.state($).decide(
                                        ($) => {
                                            switch ($[0]) {
                                                case 'const': return p_.option($, ($) => sh.ph.text("const "))
                                                case 'in': return p_.option($, ($) => sh.ph.text("in "))
                                                case 'out': return p_.option($, ($) => sh.ph.text("out "))
                                                case 'public': return p_.option($, ($) => sh.ph.text("public "))
                                                default: return p_.exhaustive($[0])
                                            }
                                        }
                                    )
                                )),
                                () => sh.ph.nothing()
                            ),
                            sh.ph.text($.identifier.text),
                            p_.from.optional($['extends']).decide(
                                ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text(" extends "),
                                    Type($['type']),
                                ])),
                                () => sh.ph.nothing()
                            ),
                            p_.from.optional($['default']).decide(
                                ($) => sh.ph.composed(p_.literal.list([
                                    sh.ph.text(" = "),
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
        sh.ph.text("<"),
        sh.ph.text(","),
        sh.ph.text(">"),
    ),
    () => sh.ph.nothing()
)

export const Variable_Declaration: declarations.Variable_Declaration = ($) => sh.ph.composed(
    p_.literal.list([
        Binding_Pattern($.name),
        p_.from.optional($['exclamation token']).decide(
            ($) => sh.ph.text("!"),
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

export const Variable_Declaration_List: declarations.Variable_Declaration_List = ($) => sh.ph.composed(
    p_.literal.list([
        p_.from.state($.mutability).decide(
            ($) => {
                switch ($[0]) {
                    case 'await using': return sh.ph.text("await using ")
                    case 'const': return sh.ph.text("const ")
                    case 'let': return sh.ph.text("let ")
                    case 'using': return sh.ph.text("using ")
                    case 'var': return sh.ph.text("var ")
                    default: return p_.exhaustive($[0])
                }
            }
        ),
        sh.ph.composed(
            p_.from.list($['declarations']).map(
                ($) => p_.from.state($).decide(
                    ($) => {
                        switch ($[0]) {
                            case 'separator': return p_.option($, ($) => sh.ph.text(", "))
                            case 'entry': return p_.option($, ($) => Variable_Declaration($))
                            default: return p_.exhaustive($[0])
                        }
                    }
                )
            )
        )
    ])
)