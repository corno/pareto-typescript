import * as h from "../../../../temp_helpers"

//data types
import * as d_out from "../../../../interface/data/typed_ast"

export const Arguments: h.Production<d_out.Arguments> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Arguments",
    (context): d_out.Arguments => ({
        'question dot token': context.prop("question dot token").peek_for_optional("QuestionDotToken", (c) => c.consume_keyword()),
        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
        'error recovery': context.prop("error recovery").defer_parsing_to_component(Error_Recovery),
        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
        'arguments': context.prop("arguments").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
            "CommaToken",
            (context) => context.peek_for_state(
                (kind, abort) => {
                    switch (kind) {
                        case "SpreadElement": return ['spread', context.option("spread").consume_and_parse_children_as_type(
                            (context) => ({
                                'dot dot dot token': context.prop("dot dot dot token").assert_kind("DotDotDotToken").consume_keyword(),
                                'expression': context.prop("expression").defer_parsing_to_component(Expression)
                            })
                        )]
                        default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                    }
                }
            )
        ),
        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
    })
)

export const As_Alias: h.Production<d_out.As_Alias> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "As_Alias",
    (context): d_out.As_Alias => ({
        'as keyword': context.prop("as keyword").consume_keyword(),
        'identifier': context.prop("identifier").peek_for_state(
            (kind, abort) => {
                switch (kind) {
                    case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                    case "StringLiteral": return ['string literal', context.option("string literal").consume_literal()]
                    default: return abort(null)
                }
            }
        )
    })
)

export const Binding_Pattern: h.Production<d_out.Binding_Pattern> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Binding_Pattern",
    (context): d_out.Binding_Pattern => ({
        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
        'modifiers': context.prop("modifiers").peek_for_optional(
            "SyntaxList",
            (context) => context.consume_and_parse_children_as_non_separated_list(
                (context) => context.peek_for_state(
                    (kind, abort) => {
                        switch (kind) {
                            case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                            case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                            case "Decorator": return ['decorator', context.option("decorator").consume_and_parse_children_as_type(
                                (context) => ({
                                    'at token': context.prop("at token").assert_kind("AtToken").consume_keyword(),
                                    'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                })
                            )]
                            case "ExportKeyword": return ['export', context.option("export").consume_keyword()]
                            case "OverrideKeyword": return ['override', context.option("override").consume_keyword()]
                            case "PrivateKeyword": return ['private', context.option("private").consume_keyword()]
                            case "ProtectedKeyword": return ['protected', context.option("protected").consume_keyword()]
                            case "PublicKeyword": return ['public', context.option("public").consume_keyword()]
                            case "ReadonlyKeyword": return ['readonly', context.option("readonly").consume_keyword()]
                            case "StaticKeyword": return ['static', context.option("static").consume_keyword()]
                            default: return abort(null)
                        }
                    }
                )
            )
        ),
        'dot dot dot token': context.prop("dot dot dot token").peek_for_optional(
            "DotDotDotToken",
            (context) => context.consume_keyword()
        ),
        'type': context.prop("type").peek_for_state(
            (kind, abort): d_out.Binding_Pattern['type'] => {
                switch (kind) {
                    case "ArrayBindingPattern": return ['array binding pattern', context.option("array binding pattern").consume_and_parse_children_as_type(
                        (context): d_out.Binding_Pattern.Array => ({
                            'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                            'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                "CommaToken",
                                (context) => context.peek_for_state(
                                    (kind, abort): d_out.Binding_Pattern.Array.Element => {
                                        switch (kind) {
                                            case "OmittedExpression": return ['omitted expression', context.option("omitted expression").consume_keyword()]
                                            case "BindingElement": return ['binding element', context.option("binding element").consume_and_parse_children_as_type(
                                                (context) => ({
                                                    'dot dot dot token': context.prop("dot dot dot token").peek_for_optional(
                                                        "DotDotDotToken",
                                                        (context) => context.consume_keyword()
                                                    ),
                                                    'name': context.prop("name").defer_parsing_to_component(Binding_Pattern),
                                                    'initializer': context.prop("initializer").peek_for_optional(
                                                        "EqualsToken",
                                                        (context) => ({
                                                            'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
                                                            'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                                        })
                                                    )
                                                })
                                            )]
                                            default: return abort(null)
                                        }
                                    }
                                )
                            ),
                            'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                        })
                    )]
                    case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                    case "NumberKeyword": return ['number keyword', context.option("number keyword").consume_keyword()]
                    case "ObjectBindingPattern": return ['object binding pattern', context.option("object binding pattern").consume_and_parse_children_as_type(
                        (context): d_out.Binding_Pattern.Object => ({
                            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                            'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                "CommaToken",
                                (context): d_out.Binding_Pattern.Object.Element => context.consume_and_parse_children_as_type(
                                    (context): d_out.Binding_Pattern.Object.Element => ({
                                        'dot dot dot token': context.prop("dot dot dot token").peek_for_optional(
                                            "DotDotDotToken",
                                            (context) => context.consume_keyword()
                                        ),
                                        'property name': context.prop("property name").defer_parsing_to_component(Property_Name),
                                        'binding': context.prop("binding").peek_for_optional(
                                            "ColonToken",
                                            (context) => ({
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'pattern': context.prop("pattern").defer_parsing_to_component(Binding_Pattern),
                                            }),
                                        ),
                                        'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer),
                                    })
                                )
                            ),
                            'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                        })
                    )]
                    case "StringKeyword": return ['string keyword', context.option("string keyword").consume_keyword()]

                    default: return abort(null)
                }
            }
        )
    })
)

export const Block: h.Refiner<d_out.Block> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "Block",
    (context): d_out.Block => context.parse_children_as_type(
        (context): d_out.Block => ({
            'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
            'statements': context.prop("statements").consume_component(Statements),
            'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
        })
    )
)

export const Class: h.Production<d_out.Class> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Class",
    (context): d_out.Class => ({
        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
        'modifiers': context.prop("modifiers").peek_for_optional(
            "SyntaxList",
            (context) => context.consume_and_parse_children_as_non_separated_list(
                (context) => context.peek_for_state(
                    (kind, abort) => {
                        switch (kind) {
                            case "AbstractKeyword": return ['abstract', context.option("abstract").consume_keyword()]
                            case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                            case "Decorator": return ['decorator', context.option("decorator").consume_and_parse_children_as_type(
                                (context) => ({
                                    'at token': context.prop("at token").assert_kind("AtToken").consume_keyword(),
                                    'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                })
                            )]
                            default: return abort(null)
                        }
                    }
                )
            )
        ),
        'class keyword': context.prop("class keyword").assert_kind("ClassKeyword").consume_keyword(),
        'identifier': context.prop("identifier").peek_for_optional(
            "Identifier",
            (context) => context.consume_literal()
        ),
        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
        'heritage': context.prop("heritage").defer_parsing_to_component(Heritage),
        'body': context.prop("body").defer_parsing_to_component(Class_Body),
    })
)

export const Class_Body: h.Production<d_out.Class_Body> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Class_Body",
    (context): d_out.Class_Body => ({
        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
        'members': context.prop("members").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
            (context): d_out.Class_Body.Member => context.peek_for_state(
                (kind, abort): d_out.Class_Body.Member => {
                    switch (kind) {
                        case "Constructor": return ['constructor', context.option("constructor").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body.Member.Constructor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'constructor keyword': context.prop("constructor keyword").peek_for_state(
                                    (kind, abort): d_out.Class_Body.Member.Constructor['constructor keyword'] => {
                                        switch (kind) {
                                            case "ConstructorKeyword": return ['constructor keyword', context.option("constructor keyword").assert_kind("ConstructorKeyword").consume_keyword()]
                                            case "StringLiteral": return ['constructor keyword as string literal', context.option("constructor keyword as string literal").consume_keyword()]
                                            default: return abort(null)
                                        }
                                    }
                                ),
                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                            })
                        )]
                        case "GetAccessor": return ['get accessor', context.option("get accessor").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body.Member.Get_Accessor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'get keyword': context.prop("get keyword").assert_kind("GetKeyword").consume_keyword(),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                            })
                        )]
                        case "MethodDeclaration": return ['method', context.option("method").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body.Member.Method => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'asterisk token': context.prop("asterisk token").peek_for_optional(
                                    "AsteriskToken",
                                    (context) => context.consume_keyword()
                                ),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'question token': context.prop("question token").peek_for_optional(
                                    "QuestionToken",
                                    (context) => context.consume_keyword()
                                ),
                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                            })
                        )]
                        case "PropertyDeclaration": return ['property', context.option("property").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body.Member.Property => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'question token': context.prop("question token").peek_for_optional(
                                    "QuestionToken",
                                    (context) => context.consume_keyword()
                                ),
                                'exclamation token': context.prop("exclamation token").peek_for_optional(
                                    "ExclamationToken",
                                    (context) => context.consume_keyword()
                                ),
                                'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                                'initializer': context.prop("optional initializer").defer_parsing_to_component(Optional_Initializer),

                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                            })
                        )]
                        case "SetAccessor": return ['set accessor', context.option("set accessor").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body.Member.Set_Accessor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'set keyword': context.prop("set keyword").assert_kind("SetKeyword").consume_keyword(),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                            })
                        )]
                        case "ClassStaticBlockDeclaration": return ['static block', context.option("static block").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body.Member.Static_Block => ({
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                                'static keyword': context.prop("static keyword").assert_kind("StaticKeyword").consume_keyword(),
                                'body': context.prop("body").consume_component(Block),
                            })
                        )]
                        case "IndexSignature": return ['index signature', context.option("index signature").consume_and_parse_children_as_type(
                            (context): d_out.Object_Type.Signature.Index => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                                'parameter': context.prop("parameter").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                    "CommaToken",
                                    (context) => context.assert_kind("Parameter").consume_and_parse_children_as_type(
                                        (context) => ({
                                            'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                            'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                            'dot dot dot token': context.prop("dot dot dot token").peek_for_optional("DotDotDotToken", (context) => context.consume_keyword()),
                                            'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                            'question token': context.prop("question token").peek_for_optional("QuestionToken", (context) => context.consume_keyword()),
                                            'annotation': context.prop("annotation").peek_for_optional("ColonToken", (context) => ({
                                                'colon token': context.prop("colon token").consume_keyword(),
                                                'type': context.prop("type").defer_parsing_to_component(Type),
                                            })),
                                            'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer),
                                        })
                                    )
                                ),
                                'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                                'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.consume_keyword()),
                            })
                        )]
                        case "SemicolonClassElement": return ['semicolon element', context.option("semicolon element").consume_and_parse_children_as_type(
                            (context) => {
                                const jsdoc = context.prop("jsdoc").defer_parsing_to_component(JSDoc)
                                context.prop("semicolon token").assert_kind("SemicolonToken").consume_keyword()
                                return { 'jsdoc': jsdoc }
                            }
                        )]
                        default: return abort(null)
                    }
                }
            )
        ),
        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword()
    })
)

export const Entity_Name: h.Production<d_out.Entity_Name> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Entity_Name",
    (context): d_out.Entity_Name => context.peek_for_state(
        (kind, abort): d_out.Entity_Name => {

            switch (kind) {
                case "QualifiedName": return ['qualified name', context.option("qualified name").consume_component(Qualified_Name)]
                case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                default: return abort(null)
            }
        }
    )
)

export const Error_Recovery: h.Production<d_out.Error_Recovery> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Error_Recovery",
    (context): d_out.Error_Recovery => context.prop("error recovery type args").peek_for_optional("SyntaxList", (context) => ({
        'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list("CommaToken", (context) => context.defer_parsing_to_component(Type)),
        'greater than token': context.prop("greater than token").peek_for_optional("GreaterThanToken", (context) => context.consume_keyword()),
    }))
)


export const Expression: h.Production<d_out.Expression> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Expression",
    (context): d_out.Expression => context.peek_for_state(
        (kind, abort): d_out.Expression => {
            switch (kind) {
                case "ArrayLiteralExpression": return ['array literal', context.option("array literal").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Array_Literal => ({
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.defer_parsing_to_component(Expression,)
                        ),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "ArrowFunction": return ['arrow function', context.option("arrow function").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Arrow_Function => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'parameters': context.prop("parameters").peek_for_state(
                            (kind, abort): d_out.Expression.Arrow_Function_Parameters => {
                                switch (kind) {
                                    case "SyntaxList": {
                                        type Phase1 = ['async', null] | ['without parentheses', d_out.Expression.Arrow_Function.Without_Parentheses]
                                        const phase1 = context.consume_and_parse_children_as_type((inner): Phase1 =>
                                            inner.peek_for_state((innerKind, innerAbort) => {
                                                switch (innerKind) {
                                                    case "AsyncKeyword":
                                                        inner.prop("async").consume_keyword()
                                                        return ['async', null] as Phase1
                                                    case "Parameter":
                                                        return ['without parentheses', {
                                                            'parameter': inner.prop("parameter").assert_kind("Parameter").consume_and_parse_children_as_type(
                                                                (ctx) => ({
                                                                    'jsdoc': ctx.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                                    'name': ctx.prop("name").defer_parsing_to_component(Binding_Pattern),
                                                                    'type': ctx.prop("type").defer_parsing_to_component(Optional_Type),
                                                                })
                                                            )
                                                        }] as Phase1
                                                    default: return innerAbort(null)
                                                }
                                            })
                                        )
                                        if (phase1[0] === 'async') {
                                            return context.peek_for_state((nextKind, nextAbort): d_out.Expression.Arrow_Function_Parameters => {
                                                switch (nextKind) {
                                                    case "SyntaxList": return ['without parentheses', context.consume_and_parse_children_as_type(
                                                        (inner): d_out.Expression.Arrow_Function.Without_Parentheses => ({
                                                            'parameter': inner.prop("parameter").assert_kind("Parameter").consume_and_parse_children_as_type(
                                                                (ctx) => ({
                                                                    'jsdoc': ctx.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                                    'name': ctx.prop("name").defer_parsing_to_component(Binding_Pattern),
                                                                    'type': ctx.prop("type").defer_parsing_to_component(Optional_Type),
                                                                })
                                                            )
                                                        })
                                                    )]
                                                    default: return ['with parentheses', {
                                                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                                    }]
                                                }
                                            })
                                        } else {
                                            return phase1
                                        }
                                    }
                                    default: return ['with parentheses', {
                                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                    }]
                                }
                            }
                        ),
                        'type': context.prop("type").defer_parsing_to_component(Return_Type_Annotation),
                        'equals greater than token': context.prop("equals greater than token").assert_kind("EqualsGreaterThanToken").consume_keyword(),
                        'body': context.prop("body").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "Block": return ['block', context.option("block").consume_component(Block,)]
                                    default: return ['expression', context.option("expression").defer_parsing_to_component(Expression),]
                                }
                            }
                        )
                    })
                )]
                case "AsExpression": return ['as expression', context.option("as expression").consume_and_parse_children_as_type(
                    (context): d_out.Expression.As => ({
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "SatisfiesExpression": return ['satisfies', context.option("satisfies").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Satisfies => ({
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'satisfies keyword': context.prop("satisfies keyword").assert_kind("SatisfiesKeyword").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "TypeAssertionExpression": return ['assertion', context.option("assertion").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Assertion => ({
                        'less than token': context.prop("less than token").assert_kind("LessThanToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'greater than token': context.prop("greater than token").assert_kind("GreaterThanToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                    })
                )]
                case "AwaitExpression": return ['await', context.option("await").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Await => ({
                        'await keyword': context.prop("await keyword").assert_kind("AwaitKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression)
                    })
                )]
                case "BigIntLiteral": return ['big int literal', context.option("big int literal").prop("big int literal").assert_kind("BigIntLiteral").consume_literal()]
                case "BinaryExpression": return ['binary', context.option("binary").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Binary => ({
                        'left': context.prop("left").defer_parsing_to_component(Expression),
                        'operator token': context.prop("operator token").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "AmpersandAmpersandEqualsToken": return ['&&=', context.option("&&=").consume_keyword()]
                                    case "AmpersandAmpersandToken": return ['&&', context.option("&&").consume_keyword()]
                                    case "AmpersandEqualsToken": return ['&=', context.option("&=").consume_keyword()]
                                    case "AmpersandToken": return ['&', context.option("&").consume_keyword()]
                                    case "AsteriskAsteriskEqualsToken": return ['**=', context.option("**=").consume_keyword()]
                                    case "AsteriskAsteriskToken": return ['**', context.option("**").consume_keyword()]
                                    case "AsteriskEqualsToken": return ['*=', context.option("*=").consume_keyword()]
                                    case "AsteriskToken": return ['*', context.option("*").consume_keyword()]
                                    case "BarBarEqualsToken": return ['||=', context.option("||=").consume_keyword()]
                                    case "BarBarToken": return ['||', context.option("||").consume_keyword()]
                                    case "BarEqualsToken": return ['|=', context.option("|=").consume_keyword()]
                                    case "BarToken": return ['|', context.option("|").consume_keyword()]
                                    case "CaretEqualsToken": return ['^=', context.option("^=").consume_keyword()]
                                    case "CaretToken": return ['^', context.option("^").consume_keyword()]
                                    case "EqualsEqualsEqualsToken": return ['===', context.option("===").consume_keyword()]
                                    case "EqualsEqualsToken": return ['==', context.option("==").consume_keyword()]
                                    case "EqualsToken": return ['=', context.option("=").consume_keyword()]
                                    case "ExclamationEqualsEqualsToken": return ['!==', context.option("!==").consume_keyword()]
                                    case "ExclamationEqualsToken": return ['!=', context.option("!=").consume_keyword()]
                                    case "GreaterThanEqualsToken": return ['>=', context.option(">=").consume_keyword()]
                                    case "GreaterThanGreaterThanEqualsToken": return ['>>=', context.option(">>=").consume_keyword()]
                                    case "GreaterThanGreaterThanGreaterThanEqualsToken": return ['>>>=', context.option(">>>=").consume_keyword()]
                                    case "GreaterThanGreaterThanGreaterThanToken": return ['>>>', context.option(">>>").consume_keyword()]
                                    case "GreaterThanGreaterThanToken": return ['>>', context.option(">>").consume_keyword()]
                                    case "GreaterThanToken": return ['>', context.option(">").consume_keyword()]
                                    case "InKeyword": return ['in', context.option("in").consume_keyword()]
                                    case "InstanceOfKeyword": return ['instanceof', context.option("instanceof").consume_keyword()]
                                    case "CommaToken": return [',', context.option(",").consume_keyword()]
                                    case "LessThanEqualsToken": return ['<=', context.option("<=").consume_keyword()]
                                    case "LessThanLessThanEqualsToken": return ['<<=', context.option("<<=").consume_keyword()]
                                    case "LessThanLessThanToken": return ['<<', context.option("<<").consume_keyword()]
                                    case "LessThanToken": return ['<', context.option("<").consume_keyword()]
                                    case "MinusEqualsToken": return ['-=', context.option("-=").consume_keyword()]
                                    case "MinusToken": return ['-', context.option("-").consume_keyword()]
                                    case "PercentToken": return ['%', context.option("%").consume_keyword()]
                                    case "PercentEqualsToken": return ['%=', context.option("%=").consume_keyword()]
                                    case "PlusEqualsToken": return ['+=', context.option("+=").consume_keyword()]
                                    case "PlusToken": return ['+', context.option("+").consume_keyword()]
                                    case "QuestionQuestionEqualsToken": return ['??=', context.option("??=").consume_keyword()]
                                    case "QuestionQuestionToken": return ['??', context.option("??").consume_keyword()]
                                    case "SlashEqualsToken": return ['/=', context.option("/=").consume_keyword()]
                                    case "SlashToken": return ['/', context.option("/").consume_keyword()]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'right': context.prop("right").defer_parsing_to_component(Expression)
                    })
                )]
                case "CallExpression": return ['call', context.option("call").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Call => ({
                        'callee': context.prop("callee").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "ImportKeyword": return ['import', context.option("import").consume_keyword()]
                                    case "SuperKeyword": return ['super', context.option("super").consume_keyword()]
                                    default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                                }
                            }
                        ),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                        'arguments': context.prop("arguments").defer_parsing_to_component(Arguments)
                    })
                )]
                case "ClassExpression": return ['class', context.option("class").consume_and_parse_children_as_type(
                    (context) => context.defer_parsing_to_component(Class)
                )]
                case "ConditionalExpression": return ['conditional', context.option("conditional").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Conditional => ({
                        'condition': context.prop("condition").defer_parsing_to_component(Expression),
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                        'when true': context.prop("when true").defer_parsing_to_component(Expression),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'when false': context.prop("when false").defer_parsing_to_component(Expression)
                    })
                )]
                case "DeleteExpression": return ['delete', context.option("delete").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Delete => ({
                        'delete keyword': context.prop("delete keyword").assert_kind("DeleteKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression)
                    })
                )]
                case "ElementAccessExpression": return ['element access', context.option("element access").consume_and_parse_children_as_type(
                    (context) => ({
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'question dot token': context.prop("question dot token").peek_for_optional("QuestionDotToken", (context) => context.consume_keyword()),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'argument expression': context.prop("argument expression").defer_parsing_to_component(Expression),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "ExpressionWithTypeArguments": return ['with type arguments', context.option("with type arguments").consume_component(Expression_With_Type_Arguments)]
                case "ExternalModuleReference": return ['external module reference', context.option("external module reference").consume_and_parse_children_as_type(
                    (context) => ({
                        'require keyword': context.prop("require keyword").assert_kind("RequireKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'module name': context.prop("module name").defer_parsing_to_component(String_Literal),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                    })
                )]
                case "FalseKeyword": return ['false', context.option("false").consume_keyword()]
                case "FunctionExpression": return ['function', context.option("function").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Function => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").peek_for_optional(
                            "SyntaxList",
                            (context) => context.consume_and_parse_children_as_non_separated_list(
                                (context) => context.peek_for_state(
                                    (kind, abort) => {
                                        switch (kind) {
                                            case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                                            default: return abort(null)
                                        }
                                    }
                                )
                            )
                        ),
                        'function keyword': context.prop("function keyword").assert_kind("FunctionKeyword").consume_keyword(),
                        'asterisk token': context.prop("asterisk token").peek_for_optional(
                            "AsteriskToken",
                            (context) => context.consume_keyword()
                        ),
                        'name': context.prop("name").peek_for_optional(
                            "Identifier",
                            (context) => context.consume_literal()
                        ),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                        'body': context.prop("body").consume_component(Block)
                    })
                )]
                case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                case "ImportKeyword": return ['import keyword', context.option("import keyword").consume_keyword()]
                case "JSDoc": return ['jsdoc', context.option("jsdoc").consume_blob()]
                case "MetaProperty": return ['meta property', context.option("meta property").consume_and_parse_children_as_type(
                    (context) => ({
                        'new keyword': context.prop("new keyword").peek_for_state(
                            (kind, abort): d_out.Expression.Meta_Property['new keyword'] => {
                                switch (kind) {
                                    case "NewKeyword": return ['new keyword', context.option("new keyword").assert_kind("NewKeyword").consume_keyword()]
                                    case "ImportKeyword": return ['import keyword', context.option("import keyword").assert_kind("ImportKeyword").consume_keyword()]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'dot token': context.prop("dot token").assert_kind("DotToken").consume_keyword(),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                    })
                )]

                case "NewExpression": return ['new', context.option("new").consume_and_parse_children_as_type(
                    (context) => ({
                        'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                        'arguments': context.prop("arguments").peek_for_optional(
                            "OpenParenToken",
                            (context) => ({
                                'question dot token': context.prop("question dot token").peek_for_optional("QuestionDotToken", (context) => context.consume_keyword()),
                                'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                                'error recovery': context.prop("error recovery").defer_parsing_to_component(Error_Recovery),
                                'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                                'arguments': context.prop("arguments").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                    "CommaToken",
                                    (context) => context.peek_for_state(
                                        (kind, abort) => {
                                            switch (kind) {
                                                case "SpreadElement": return ['spread', context.option("spread").consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'dot dot dot token': context.prop("dot dot dot token").assert_kind("DotDotDotToken").consume_keyword(),
                                                        'expression': context.prop("expression").defer_parsing_to_component(Expression)
                                                    })
                                                )]
                                                default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                                            }
                                        }
                                    )
                                ),
                                'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                            })
                        )
                    })
                )]
                case "NoSubstitutionTemplateLiteral": return ['no substitution template literal', context.option("no substitution template literal").consume_literal()]
                case "NonNullExpression": return ['non null', context.option("non null").consume_and_parse_children_as_type(
                    (context) => ({
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'exclamation token': context.prop("exclamation token").assert_kind("ExclamationToken").consume_keyword()
                    })
                )]
                case "NullKeyword": return ['null keyword', context.option("null keyword").consume_keyword()]
                case "NumericLiteral": return ['numeric literal', context.option("numeric literal").defer_parsing_to_component(Numeric_Literal)]
                case "ObjectLiteralExpression": return ['object literal', context.option("object literal").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Object_Literal => ({
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'properties': context.prop("properties").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context): d_out.Expression.Object_Literal.Property => context.peek_for_state(
                                (kind, abort): d_out.Expression.Object_Literal.Property => {
                                    switch (kind) {
                                        case "MethodDeclaration": return ['method', context.option("method").consume_and_parse_children_as_type(
                                            (context): d_out.Expression.Object_Literal.Property.Method => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                                'asterisk token': context.prop("asterisk token").peek_for_optional(
                                                    "AsteriskToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                                'question token': context.prop("question token").peek_for_optional(
                                                    "QuestionToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'exclamation token': context.prop("exclamation token").peek_for_optional(
                                                    "ExclamationToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                                'body': context.prop("body").peek_for_optional(
                                                    "Block",
                                                    (context) => context.consume_component(Block)
                                                ),
                                                'semicolon': context.prop("semicolon").peek_for_optional(
                                                    "SemicolonToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                            })
                                        )] // MethodDeclaration
                                        case "PropertyAssignment": return ['property', context.option("property assignment").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                                'question token': context.prop("question token").peek_for_optional(
                                                    "QuestionToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'initializer': context.prop("initializer").defer_parsing_to_component(Expression)
                                            })
                                        )]
                                        case "ShorthandPropertyAssignment": return ['shorthand property', context.option("shorthand property").consume_and_parse_children_as_type(
                                            (context): d_out.Expression.Object_Literal.Property.Shorthand_Property => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'name': context.prop("name").defer_parsing_to_component(Identifier),
                                                'initializer': context.prop("initializer").peek_for_optional(
                                                    "EqualsToken",
                                                    (context) => ({
                                                        'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
                                                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                                    })
                                                ),
                                                'question token': context.prop("question token").peek_for_optional(
                                                    "QuestionToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'exclamation token': context.prop("exclamation token").peek_for_optional(
                                                    "ExclamationToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                            })
                                        )]
                                        case "SpreadAssignment": return ['spread', context.option("spread").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'dot dot dot token': context.prop("dot dot dot token").assert_kind("DotDotDotToken").consume_keyword(),
                                                'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                            })
                                        )]
                                        case "GetAccessor": return ['get accessor', context.option("get accessor").consume_and_parse_children_as_type(
                                            (context): d_out.Expression.Object_Literal.Property.Get_Accessor => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                                'get keyword': context.prop("get keyword").assert_kind("GetKeyword").consume_keyword(),
                                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                                'body': context.prop("body").peek_for_optional(
                                                    "Block",
                                                    (context) => context.consume_component(Block)
                                                ),
                                            })
                                        )]
                                        case "SetAccessor": return ['set accessor', context.option("set accessor").consume_and_parse_children_as_type(
                                            (context): d_out.Expression.Object_Literal.Property.Set_Accessor => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'set keyword': context.prop("set keyword").assert_kind("SetKeyword").consume_keyword(),
                                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                                'body': context.prop("body").peek_for_optional(
                                                    "Block",
                                                    (context) => context.consume_component(Block)
                                                ),
                                            })
                                        )]
                                        default: return abort(null)
                                    }
                                }
                            )
                        ),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                    })
                )]
                case "OmittedExpression": return ['omitted expression', context.option("omitted expression").consume_keyword()]
                case "ParenthesizedExpression": return ['parenthesized', context.option("parenthesized").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                    })
                )]
                case "PostfixUnaryExpression": return ['postfix unary', context.option("postfix unary").consume_and_parse_children_as_type(
                    (context) => ({
                        'operand': context.prop("operand").defer_parsing_to_component(Expression),
                        'operator token': context.prop("operator token").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "MinusMinusToken": return ['--', context.option("--").consume_keyword()]
                                    case "PlusPlusToken": return ['++', context.option("++").consume_keyword()]
                                    default: return abort(null)
                                }
                            }
                        )
                    })
                )]
                case "PrefixUnaryExpression": return ['prefix unary', context.option("prefix unary").consume_and_parse_children_as_type(
                    (context) => ({
                        'operator token': context.prop("operator token").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "ExclamationToken": return ['!', context.option("!").consume_keyword()]
                                    case "MinusMinusToken": return ['--', context.option("--").consume_keyword()]
                                    case "MinusToken": return ['-', context.option("-").consume_keyword()]
                                    case "PlusToken": return ['+', context.option("+").consume_keyword()]
                                    case "PlusPlusToken": return ['++', context.option("++").consume_keyword()]
                                    case "TildeToken": return ['~', context.option("~").consume_keyword()]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'operand': context.prop("operand").defer_parsing_to_component(Expression)
                    })
                )]
                case "PropertyAccessExpression": return ['property access', context.option("property access").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Property_Access => ({
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'dot token': context.prop("dot token").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "DotToken": return ['.', context.option(".").consume_keyword()]
                                    case "QuestionDotToken": return ['?.', context.option("?.").consume_keyword()]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'identifier': context.prop("identifier").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "Identifier": return ['named', context.option("named").defer_parsing_to_component(Identifier)]
                                    case "PrivateIdentifier": return ['private', context.option("private").defer_parsing_to_component(Identifier)]
                                    default: return abort(null)
                                }
                            }
                        )
                    })
                )]
                case "QualifiedName": return ['qualified name', context.option("qualified name").consume_component(Qualified_Name)]
                case "PrivateIdentifier": return ['private identifier', context.option("private identifier").consume_literal()]
                case "RegularExpressionLiteral": return ['regular expression literal', context.option("regular expression literal").consume_literal()]
                case "StringLiteral": return ['string literal', context.option("string literal").defer_parsing_to_component(String_Literal)]
                case "TaggedTemplateExpression": return ['tagged template', context.option("tagged template").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Tagged_Template => ({
                        'tag': context.prop("tag").defer_parsing_to_component(Expression),
                        'question dot token': context.prop("question dot token").peek_for_optional("QuestionDotToken", (context) => context.consume_keyword()),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                        'template': context.prop("template").peek_for_state(
                            (kind, abort): d_out.Expression.Tagged_Template['template'] => {
                                switch (kind) {
                                    case "NoSubstitutionTemplateLiteral": return ['no substitution template literal', context.option("no substitution template literal").consume_literal()]
                                    case "TemplateExpression": return ['template', context.option("template").consume_and_parse_children_as_type(
                                        (context): d_out.Expression.Template => ({
                                            'head': context.prop("head").assert_kind("TemplateHead").consume_literal(),
                                            'template spans': context.prop("template spans").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                                                (context) => context.consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                                        'suffix': context.prop("suffix").peek_for_state(
                                                            (kind, abort) => {
                                                                switch (kind) {
                                                                    case "TemplateTail": return ['tail', context.option("tail").consume_literal()]
                                                                    case "TemplateMiddle": return ['middle', context.option("middle").consume_literal()]
                                                                    default: return abort(null)
                                                                }
                                                            }
                                                        )
                                                    })
                                                )
                                            )
                                        })
                                    )]
                                    default: return abort(null)
                                }
                            }
                        ),
                    })
                )]
                case "TemplateExpression": return ['template', context.option("template").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Template => ({
                        'head': context.prop("head").assert_kind("TemplateHead").consume_literal(),
                        'template spans': context.prop("template spans").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                    'suffix': context.prop("suffix").peek_for_state(
                                        (kind, abort) => {
                                            switch (kind) {
                                                case "TemplateTail": return ['tail', context.option("tail").consume_literal()]
                                                case "TemplateMiddle": return ['middle', context.option("middle").consume_literal()]
                                                default: return abort(null)
                                            }
                                        }
                                    )
                                })
                            )
                        )
                    })
                )]
                case "SuperKeyword": return ['super', context.option("super").consume_keyword()]
                case "ThisKeyword": return ['this', context.option("this").consume_keyword()]
                case "TrueKeyword": return ['true keyword', context.option("true keyword").consume_keyword()]
                case "TypeOfExpression": return ['type of', context.option("type of").consume_and_parse_children_as_type(
                    (context) => ({
                        'type of keyword': context.prop("type of keyword").assert_kind("TypeOfKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                    })
                )]
                case "VoidExpression": return ['void', context.option("void").consume_and_parse_children_as_type(
                    (context) => ({
                        'void keyword': context.prop("void keyword").assert_kind("VoidKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                    })
                )]
                case "YieldExpression": return ['yield', context.option("yield").consume_and_parse_children_as_type(
                    (context) => ({
                        'yield keyword': context.prop("yield keyword").assert_kind("YieldKeyword").consume_keyword(),
                        'asterisk token': context.prop("asterisk token").peek_for_optional(
                            "AsteriskToken",
                            (context) => context.consume_keyword()
                        ),
                        'expression': context.prop("expression").optional_set_if_not(
                            "SemicolonToken",
                            ($) => context.defer_parsing_to_component(Expression)
                        ),
                    })
                )]
                case "SpreadElement": return ['spread element', context.option("spread element").consume_and_parse_children_as_type(
                    (context) => ({
                        'dot dot dot token': context.prop("dot dot dot token").assert_kind("DotDotDotToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                    })
                )]
                default: return abort(null)
            }
        }
    )
)

export const Expression_With_Type_Arguments: h.Refiner<d_out.Expression_With_Type_Arguments> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "ExpressionWithTypeArguments",
    (context): d_out.Expression_With_Type_Arguments => context.parse_children_as_type(
        (context) => ({
            'expression': context.prop("expression").defer_parsing_to_component(Expression),
            'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments)
        })
    )
)

export const Heritage: h.Production<d_out.Heritage> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Heritage",
    (context) => context.peek_for_optional(
        "SyntaxList",
        (context) => context.consume_and_parse_children_as_non_separated_list(
            (context): d_out.Heritage.Clause => context.assert_kind("HeritageClause").consume_and_parse_children_as_type(
                (context): d_out.Heritage.Clause => ({
                    'extends or implements keyword': context.prop("extends or implements keyword").peek_for_state(
                        (kind, abort) => {
                            switch (kind) {
                                case "ExtendsKeyword": return ['extends', context.option("extends").consume_keyword()]
                                case "ImplementsKeyword": return ['implements', context.option("implements").consume_keyword()]
                                default: return abort(null)
                            }
                        }
                    ),
                    'types': context.prop("types").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                        "CommaToken",
                        (context) => context.consume_component(
                            Expression_With_Type_Arguments
                        )
                    )
                })
            )
        )
    )
)

export const Identifier: h.Production<d_out.Identifier> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Identifier",
    (context): d_out.Identifier => context.consume_literal()
)

export const Import_Attributes: h.Refiner<d_out.Import_Attributes> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "ImportAttributes",
    (context): d_out.Import_Attributes => context.parse_children_as_type(
        (context): d_out.Import_Attributes => ({
            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
            'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                "CommaToken",
                (context) => context.assert_kind("ImportAttribute").consume_and_parse_children_as_type(
                    (context) => ({
                        'name': context.prop("name").defer_parsing_to_component(Property_Name),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'value': context.prop("value").defer_parsing_to_component(Expression),
                    })
                )
            ),
            'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
        })
    )
)

export const Initializer: h.Production<d_out.Initializer> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Initializer",
    (context): d_out.Initializer => ({
        'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
        'expression': context.prop("expression").defer_parsing_to_component(Expression)
    })
)

export const JSDoc: h.Production<d_out.JSDoc> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "JSDoc",
    (context) => context.parse_partial_list(
        ($) => $ === "JSDoc",
        (context) => context.consume_blob()
    )
)

export const Module_Body: h.Production<d_out.Module_Body> = (iterator, abort, $p) => h.create_iterator_context(
    iterator, abort, $p, "Module_Body",
    (context): d_out.Module_Body => context.peek_for_state(
        (kind, abort): d_out.Module_Body => {
            switch (kind) {
                case "ModuleBlock": return ['module block', context.option("module block").consume_and_parse_children_as_type(
                    (context): d_out.Block => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'statements': context.prop("statements").consume_component(Statements),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                    })
                )]
                case "DotToken": return ['dotted', context.option("dotted").based_on_first_node(
                    (context) => ({
                        'dot token': context.prop("dot token").consume_keyword(),
                        'module declaration': context.prop("module declaration").assert_kind("ModuleDeclaration").consume_and_parse_children_as_type(
                            (context) => ({
                                'name': context.prop("name").defer_parsing_to_component(Identifier),
                                'block': context.prop("block").defer_parsing_to_component(Module_Body),
                            })
                        ),
                    })
                )]
                default: return ['shorthand', context.prop("shorthand").defer_parsing_to_component(Semi_Colon)]
            }
        }
    )
)

export const Module_Specifier: h.Production<d_out.Module_Specifier> = (iterator, abort, $p) => h.create_iterator_context(
    iterator, abort, $p,
    "Module_Specifier",
    (context): d_out.Module_Specifier => context.peek_for_state(
        (kind, abort): d_out.Module_Specifier => {
            switch (kind) {
                case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                case "StringLiteral": return ['string literal', context.option("string literal").consume_literal()]
                case "TemplateExpression": return ['template', context.option("template").consume_and_parse_children_as_type(
                    (context): d_out.Expression.Template => ({
                        'head': context.prop("head").assert_kind("TemplateHead").consume_literal(),
                        'template spans': context.prop("template spans").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                    'suffix': context.prop("suffix").peek_for_state(
                                        (kind, abort) => {
                                            switch (kind) {
                                                case "TemplateTail": return ['tail', context.option("tail").consume_literal()]
                                                case "TemplateMiddle": return ['middle', context.option("middle").consume_literal()]
                                                default: return abort(null)
                                            }
                                        }
                                    )
                                })
                            )
                        )
                    })
                )]
                default: return abort(null)
            }
        }
    )
)

export const Numeric_Literal: h.Production<d_out.Numeric_Literal> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Numeric_Literal",
    (context): d_out.Numeric_Literal => context.consume_literal()
)

export const Object_Type: h.Production<d_out.Object_Type> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Object_Type",
    (context): d_out.Object_Type => ({
        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
        'signatures': context.prop("signatures").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
            (context): d_out.Object_Type.Signature => context.defer_parsing_to_component(Object_Type_Signature),
        ),
        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
    })
)

const Object_Type_Signature: h.Production<d_out.Object_Type.Signature> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Object_Type_Signature",
    (context): d_out.Object_Type.Signature => context.peek_for_state(
        (kind, abort): d_out.Object_Type.Signature => {
            switch (kind) {
                case "CallSignature": return ['call', context.option("call").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Call => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                        'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.consume_keyword()),
                    })
                )]
                case "ConstructSignature": return ['construct', context.option("construct").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Construct => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                        'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.consume_keyword()),
                    })
                )]
                case "IndexSignature": return ['index', context.option("index").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Index => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'parameter': context.prop("parameter").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.assert_kind("Parameter").consume_and_parse_children_as_type(
                                (context) => ({
                                    'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                    'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                    'dot dot dot token': context.prop("dot dot dot token").peek_for_optional("DotDotDotToken", (context) => context.consume_keyword()),
                                    'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                    'question token': context.prop("question token").peek_for_optional("QuestionToken", (context) => context.consume_keyword()),
                                    'annotation': context.prop("annotation").peek_for_optional("ColonToken", (context) => ({
                                        'colon token': context.prop("colon token").consume_keyword(),
                                        'type': context.prop("type").defer_parsing_to_component(Type),
                                    })),
                                    'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer),
                                })
                            )
                        ),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                        'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                        'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.consume_keyword()),
                    })
                )]
                case "MethodSignature": return ['method', context.option("method").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Method => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Property_Name),
                        'question token': context.prop("question token").peek_for_optional(
                            "QuestionToken",
                            (context) => context.consume_keyword()
                        ),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                        'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.prop("comma token").consume_keyword()),
                    })
                )]
                case "PropertySignature": return ['property', context.option("property").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Property => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                        'id': context.prop("id").defer_parsing_to_component(Property_Name),
                        'question token': context.prop("question token").peek_for_optional(
                            "QuestionToken",
                            (context) => context.consume_keyword()
                        ),
                        'type annotation': context.prop("type annotation").defer_parsing_to_component(Optional_Type),
                        'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer),
                        'comma token': context.prop("comma token").peek_for_optional(
                            "CommaToken",
                            (context) => context.consume_keyword()
                        ),
                        'semicolon token': context.prop("semicolon token").peek_for_optional(
                            "SemicolonToken",
                            (context) => context.consume_keyword()
                        ),
                    })
                )]
                case "GetAccessor": return ['get accessor', context.option("get accessor").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Get_Accessor => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'get keyword': context.prop("get keyword").assert_kind("GetKeyword").consume_keyword(),
                        'name': context.prop("name").defer_parsing_to_component(Property_Name),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                        'body': context.prop("body").peek_for_optional("Block", (context) => context.consume_component(Block)),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                        'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.consume_keyword()),
                    })
                )]
                case "SetAccessor": return ['set accessor', context.option("set accessor").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type.Signature.Set_Accessor => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'set keyword': context.prop("set keyword").assert_kind("SetKeyword").consume_keyword(),
                        'name': context.prop("name").defer_parsing_to_component(Property_Name),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                        'body': context.prop("body").peek_for_optional("Block", (context) => context.consume_component(Block)),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                        'comma': context.prop("comma").peek_for_optional("CommaToken", (context) => context.consume_keyword()),
                    })
                )]
                default: return abort(null)
            }
        }
    )
)

export const Optional_Initializer: h.Production<d_out.Optional_Initializer> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Optional_Initializer",
    (context): d_out.Optional_Initializer => context.peek_for_optional(
        "EqualsToken",
        (context) => ({
            'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
            'expression': context.prop("expression").defer_parsing_to_component(Expression)
        })
    )
)

export const Optional_Type: h.Production<d_out.Optional_Type> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Optional_Type",
    (context): d_out.Optional_Type => context.peek_for_optional(
        "ColonToken",
        (context) => ({
            'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
            'type': context.prop("type").defer_parsing_to_component(Type),
        })
    )
)

export const Parameters: h.Production<d_out.Parameters> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Parameters",
    (context): d_out.Parameters => ({
        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
        'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
            "CommaToken",
            (context) => context.consume_and_parse_children_as_type(
                (context): d_out.Parameters.Parameter => ({
                    'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                    // 'modifiers': context.prop("modifiers").construct_component(
                    //     "'modifiers'",
                    //     Parmeter_Modifiers
                    // ),
                    'dot dot dot token': context.prop("dot dot dot token").peek_for_optional(
                        "DotDotDotToken",
                        (context) => context.consume_keyword()
                    ),
                    'name': context.prop("name").defer_parsing_to_component(Binding_Pattern),
                    'question token': context.prop("question token").peek_for_optional(
                        "QuestionToken",
                        (context) => context.consume_keyword()
                    ),
                    'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                    'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer)
                })
            )
        ),
        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
    })

)

export const Property_Name: h.Production<d_out.Property_Name> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Property_Name",
    (context): d_out.Property_Name => ({
        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
        'modifiers': context.prop("modifiers").peek_for_optional(
            "SyntaxList",
            (context) => context.consume_and_parse_children_as_non_separated_list(
                (context) => context.peek_for_state(
                    (kind, abort) => {
                        switch (kind) {
                            case "AbstractKeyword": return ['abstract', context.option("abstract").consume_keyword()]
                            case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                            case "ExportKeyword": return ['export', context.option("export").consume_keyword()]
                            case "OverrideKeyword": return ['override', context.option("override").consume_keyword()]
                            case "PrivateKeyword": return ['private', context.option("private").consume_keyword()]
                            case "ProtectedKeyword": return ['protected', context.option("protected").consume_keyword()]
                            case "PublicKeyword": return ['public', context.option("public").consume_keyword()]
                            default: return abort(null)
                        }
                    }
                )
            )
        ),
        'type': context.peek_for_state(
            (kind, abort) => {
                switch (kind) {
                    case "ComputedPropertyName": return ['computed', context.option("computed").consume_and_parse_children_as_type(
                        (context): d_out.Property_Name.Computed => ({
                            'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                            'expression': context.prop("expression").defer_parsing_to_component(Expression),
                            'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                        })
                    )]
                    case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                    case "NumericLiteral": return ['numeric literal', context.option("numeric literal").defer_parsing_to_component(Numeric_Literal)]
                    case "PrivateIdentifier": return ['private identifier', context.option("private identifier").defer_parsing_to_component(Identifier)]
                    case "BigIntLiteral": return ['big int literal', context.option("big int literal").consume_literal()]
                    case "StringLiteral": return ['string literal', context.option("string literal").defer_parsing_to_component(String_Literal)]
                    default: return abort(null)
                }
            }
        )
    })
)

export const Qualified_Name: h.Refiner<d_out.Qualified_Name> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "QualifiedName",
    (context) => context.parse_children_as_type(
        (context): d_out.Qualified_Name => ({
            'first': context.prop("first").defer_parsing_to_component(Entity_Name),
            'dot token': context.prop("dot token").assert_kind("DotToken").consume_keyword(),
            'second': context.prop("second").defer_parsing_to_component(Identifier)
        })
    )
)

export const Semi_Colon: h.Production<d_out.Semi_Colon> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Semi_Colon",
    (context) => context.peek_for_optional(
        "SemicolonToken",
        (context) => context.prop("semicolon token").consume_keyword()
    )
)

export const Return_Type_Annotation: h.Production<d_out.Return_Type_Annotation> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Return_Type_Annotation",
    (context) => context.peek_for_optional(
        "ColonToken",
        (context) => ({
            'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
            'kind': context.prop("kind").peek_for_state(
                (kind, abort) => {
                    switch (kind) {
                        case "TypePredicate": return ['type predicate', context.option("type predicate").consume_component(Type_Predicate)]
                        default: return ['type', context.option("type").defer_parsing_to_component(Type)]
                    }
                }
            )
        })
    )
)

export const Signature_Modifiers: h.Production<d_out.Signature_Modifiers> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Signature_Modifiers",
    (context) => context.peek_for_optional(
        "SyntaxList",
        (context) => context.consume_and_parse_children_as_non_separated_list(
            (context): d_out.Signature_Modifiers.L => context.peek_for_state(
                (kind, abort) => {
                    switch (kind) {
                        case "AccessorKeyword": return ['accessor', context.option("accessor").consume_keyword()]
                        case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                        case "ConstKeyword": return ['const', context.option("const").consume_keyword()]
                        case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                        case "ExportKeyword": return ['export', context.option("export").consume_keyword()]
                        case "OverrideKeyword": return ['override', context.option("override").consume_keyword()]
                        case "ProtectedKeyword": return ['protected', context.option("protected").consume_keyword()]
                        case "StaticKeyword": return ['static', context.option("static").consume_keyword()]
                        case "AbstractKeyword": return ['abstract', context.option("abstract").consume_keyword()]
                        case "Decorator": return ['decorator', context.option("decorator").consume_and_parse_children_as_type(
                            (context) => ({
                                'at token': context.prop("at token").assert_kind("AtToken").consume_keyword(),
                                'expression': context.prop("expression").defer_parsing_to_component(Expression),
                            })
                        )]
                        case "PrivateKeyword": return ['private', context.option("private").consume_keyword()]
                        case "PublicKeyword": return ['public', context.option("public").consume_keyword()]
                        case "InKeyword": return ['in', context.option("in").consume_keyword()]
                        case "OutKeyword": return ['out', context.option("out").consume_keyword()]
                        case "ReadonlyKeyword": return ['readonly', context.option("readonly").consume_keyword()]
                        default: return abort(null)
                    }
                },
            )
        )
    )
)

export const Source_File: h.Root<d_out.Source_File> = ($, abort) => h.create_root_node_context(
    $,
    abort,
    "SourceFile",
    (context): d_out.Source_File => context.parse_children_as_type(
        (context) => {
            return {
                'statements': context.prop("statements").consume_component(Statements),
                'end of file': context.prop("end of file").assert_kind("EndOfFileToken").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                    })
                ),
            }
        }
    )
)

export const Statement: h.Production<d_out.Statement> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Statement",
    (context): d_out.Statement => context.peek_for_state(
        (kind, abort): d_out.Statement => {
            switch (kind) {
                case "Block": return ['block', context.option("block").consume_component(Block)]
                case "ClassDeclaration": return ['class', context.option("class").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Class_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'class': context.prop("class").defer_parsing_to_component(Class),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ContinueStatement": return ['continue', context.option("continue").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'continue keyword': context.prop("continue keyword").assert_kind("ContinueKeyword").consume_keyword(),
                        'label': context.prop("label").peek_for_optional(
                            "Identifier",
                            (context) => context.consume_literal()
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "DebuggerStatement": return ['debugger', context.option("debugger").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'debugger keyword': context.prop("debugger keyword").assert_kind("DebuggerKeyword").consume_keyword(),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "BreakStatement": return ['break', context.option("break").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'break keyword': context.prop("break keyword").assert_kind("BreakKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").peek_for_optional(
                            "Identifier",
                            (context) => context.consume_literal()
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "DoStatement": return ['do', context.option("do").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Do => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'do keyword': context.prop("do keyword").assert_kind("DoKeyword").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'while keyword': context.prop("while keyword").assert_kind("WhileKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "EmptyStatement": return ['empty', context.option("empty").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Empty => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'semicolon token': context.prop("semicolon token").assert_kind("SemicolonToken").consume_keyword(),
                    })
                )]
                case "EnumDeclaration": return ['enum', context.option("enum").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Enum_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'enum keyword': context.prop("enum keyword").assert_kind("EnumKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'members': context.prop("members").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.consume_and_parse_children_as_type(
                                (context): d_out.Statement.Enum_Declaration.Member => ({
                                    'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                    'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                    'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer)
                                })
                            )
                        ),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ExportAssignment": return ['export assignment', context.option("export assignment").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'export keyword': context.prop("export keyword").assert_kind("ExportKeyword").consume_keyword(),
                        'type': context.prop("type").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "DefaultKeyword": return ['default', context.option("default").based_on_first_node(
                                        (context) => ({
                                            'default keyword': context.prop("default keyword").consume_keyword(),
                                            'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                        })
                                    )]
                                    default: return ['equals', context.option("equals").defer_parsing_to_component(Initializer)]
                                }
                            }
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ExportDeclaration": return ['export declaration', context.option("export declaration").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Export_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'export keyword': context.prop("export keyword").assert_kind("ExportKeyword").consume_keyword(),
                        'type keyword': context.prop("type keyword").peek_for_optional(
                            "TypeKeyword",
                            (context) => context.consume_keyword()
                        ),
                        'type': context.prop("type").peek_for_state(
                            (kind, abort): d_out.Statement.Export_Declaration['type'] => {
                                switch (kind) {
                                    case "AsteriskToken": return ['all', context.option("all").based_on_first_node(
                                        (context) => ({
                                            'asterisk token': context.prop("asterisk token").consume_keyword(),
                                            'as': context.prop("as").peek_for_optional(
                                                "AsKeyword",
                                                (context) => context.defer_parsing_to_component(As_Alias)
                                            )
                                        })
                                    )]
                                    case "NamedExports": return ['named', context.option("named").consume_and_parse_children_as_type(
                                        (context) => ({
                                            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                            'exports': context.prop("exports").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                                "CommaToken",
                                                (context): d_out.Statement.Export_Declaration.Entry => context.consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'type keyword': context.prop("type keyword").peek_for_optional(
                                                            "TypeKeyword",
                                                            (context) => context.consume_keyword()
                                                        ),
                                                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                                        'as': context.prop("as").peek_for_optional(
                                                            "AsKeyword",
                                                            (context) => context.defer_parsing_to_component(As_Alias)
                                                        )
                                                    })
                                                )
                                            ),
                                            'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                                        })
                                    )]
                                    case "NamespaceExport": return ['namespace', context.option("namespace").consume_and_parse_children_as_type(
                                        (context) => ({
                                            'asterisk token': context.prop("asterisk token").assert_kind("AsteriskToken").consume_keyword(),
                                            'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                                            'identifier': context.prop("identifier").defer_parsing_to_component(Identifier)
                                        })
                                    )]
                                    default: return abort(null)
                                }

                            }
                        ),
                        'from clause': context.prop("from clause").peek_for_optional(
                            "FromKeyword",
                            (context) => ({
                                'from keyword': context.prop("from keyword").assert_kind("FromKeyword").consume_keyword(),
                                'module specifier': context.prop("module specifier").defer_parsing_to_component(Module_Specifier),
                            })
                        ),
                        'import attributes': context.prop("import attributes").peek_for_optional(
                            "ImportAttributes",
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'with keyword': context.prop("with keyword").consume_keyword(),
                                    'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                    'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                        "CommaToken",
                                        (context) => context.assert_kind("ImportAttribute").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'name': context.prop("name").defer_parsing_to_component(Identifier),
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'value': context.prop("value").defer_parsing_to_component(Expression),
                                            })
                                        )
                                    ),
                                    'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                                })
                            )
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ExpressionStatement": return ['expression', context.option("expression").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Expr => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                    })
                )]
                case "ForStatement": return ['for', context.option("for").consume_and_parse_children_as_type(
                    (context): d_out.Statement.For => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'for keyword': context.prop("for keyword").assert_kind("ForKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'initializer': context.prop("initializer").optional_set_if_not(
                            "SemicolonToken",
                            (context) => context.peek_for_state(
                                (kind, abort) => {
                                    switch (kind) {
                                        case "VariableDeclarationList": return ['variable declaration list', context.option("variable declaration list").consume_component(Variable_Declaration_List)]
                                        default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                                    }
                                }
                            )
                        ),
                        'semicolon token': context.prop("semicolon token").assert_kind("SemicolonToken").consume_keyword(),
                        'condition': context.prop("condition").optional_set_if_not(
                            "SemicolonToken",
                            (context) => context.defer_parsing_to_component(Expression),
                        ),
                        'semicolon token 2': context.prop("semicolon token 2").assert_kind("SemicolonToken").consume_keyword(),
                        'incrementor': context.prop("incrementor").optional_set_if_not(
                            "CloseParenToken",
                            (context) => context.defer_parsing_to_component(Expression),
                        ),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ForInStatement": return ['for in', context.option("for in").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'for keyword': context.prop("for keyword").assert_kind("ForKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'initializer': context.prop("initializer").peek_for_state(
                            (kind, abort): d_out.Statement.For_In['initializer'] => {
                                switch (kind) {
                                    case "VariableDeclarationList": return ['variable declaration list', context.option("variable declaration list").consume_component(Variable_Declaration_List)]
                                    default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                                }
                            }
                        ),
                        'in keyword': context.prop("in keyword").assert_kind("InKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ForOfStatement": return ['for of', context.option("for of").consume_and_parse_children_as_type(
                    (context): d_out.Statement.For_Of => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'for keyword': context.prop("for keyword").assert_kind("ForKeyword").consume_keyword(),
                        'await keyword': context.prop("await keyword").peek_for_optional(
                            "AwaitKeyword",
                            (context) => context.consume_keyword()
                        ),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'initializer': context.prop("initializer").peek_for_state(
                            (kind, abort): d_out.Statement.For_Of['initializer'] => {
                                switch (kind) {
                                    case "VariableDeclarationList": return ['variable declaration list', context.option("variable declaration list").consume_component(Variable_Declaration_List)]
                                    default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                                }
                            }
                        ),
                        'of keyword': context.prop("of keyword").assert_kind("OfKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "FunctionDeclaration": return ['function', context.option("function").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Function_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'function keyword': context.prop("function keyword").assert_kind("FunctionKeyword").consume_keyword(),
                        'asterisk token': context.prop("asterisk token").peek_for_optional(
                            "AsteriskToken",
                            (context) => context.consume_keyword()
                        ),
                        'identifier': context.prop("identifier").peek_for_optional(
                            "Identifier",
                            (context) => context.consume_literal()
                        ),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'return type annotation': context.prop("return type annotation").defer_parsing_to_component(Return_Type_Annotation),
                        'body': context.prop("body").peek_for_optional(
                            "Block",
                            (context) => context.consume_component(Block)
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]


                case "IfStatement": return ['if', context.option("if").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'if keyword': context.prop("if keyword").assert_kind("IfKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'then statement': context.prop("then statement").defer_parsing_to_component(Statement),
                        'else': context.prop("else").peek_for_optional(
                            "ElseKeyword",
                            (context) => ({
                                'else keyword': context.prop("else keyword").consume_keyword(),
                                'statement': context.prop("statement").defer_parsing_to_component(Statement)
                            })
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ImportDeclaration": return ['import', context.option("import").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Import_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'import keyword': context.prop("import keyword").assert_kind("ImportKeyword").consume_keyword(),
                        'clause': context.prop("clause").peek_for_optional(
                            "ImportClause",
                            (context) => context.consume_and_parse_children_as_type(
                                (context): d_out.Statement.Import.Clause => ({
                                    'type keyword': context.prop("type keyword").peek_for_optional(
                                        "TypeKeyword",
                                        (context) => context.consume_keyword()
                                    ),
                                    'type': context.prop("type").peek_for_state(
                                        (kind, abort) => {
                                            switch (kind) {
                                                case "Identifier": return ['identifier', context.option("identifier").based_on_first_node(
                                                    (context) => ({
                                                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                                        'named': context.prop("named").peek_for_optional(
                                                            "CommaToken",
                                                            (context) => ({
                                                                'comma token': context.prop("comma token").consume_keyword(),
                                                                'bindings': context.prop("bindings").peek_for_state(
                                                                    (kind, abort) => {
                                                                        switch (kind) {
                                                                            case "NamedImports": return ['named imports', context.option("named imports").consume_and_parse_children_as_type(
                                                                                (context) => ({
                                                                                    'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                                                                    'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                                                                        "CommaToken",
                                                                                        (context) => context.assert_kind("ImportSpecifier").consume_and_parse_children_as_type(
                                                                                            (context) => ({
                                                                                                'type keyword': context.prop("type keyword").peek_for_optional(
                                                                                                    "TypeKeyword",
                                                                                                    (context) => context.consume_keyword()
                                                                                                ),
                                                                                                'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                                                                                'as': context.prop("as").peek_for_optional(
                                                                                                    "AsKeyword",
                                                                                                    (context) => context.defer_parsing_to_component(As_Alias)
                                                                                                )
                                                                                            })
                                                                                        )
                                                                                    ),
                                                                                    'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword()
                                                                                })
                                                                            )]
                                                                            case "NamespaceImport": return ['namespace import', context.option("namespace import").consume_and_parse_children_as_type(
                                                                                (context) => ({
                                                                                    'asterisk token': context.prop("asterisk token").assert_kind("AsteriskToken").consume_keyword(),
                                                                                    'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                                                                                    'identifier': context.prop("identifier").defer_parsing_to_component(Identifier)
                                                                                })
                                                                            )]
                                                                            default: return abort(null)
                                                                        }
                                                                    }
                                                                ),
                                                            })
                                                        ),
                                                    })
                                                )]
                                                case "NamedImports": return ['named imports', context.option("named imports").consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                                        'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                                            "CommaToken",
                                                            (context) => context.assert_kind("ImportSpecifier").consume_and_parse_children_as_type(
                                                                (context) => ({
                                                                    'type keyword': context.prop("type keyword").peek_for_optional(
                                                                        "TypeKeyword",
                                                                        (context) => context.consume_keyword()
                                                                    ),
                                                                    'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                                                    'as': context.prop("as").peek_for_optional(
                                                                        "AsKeyword",
                                                                        (context) => context.defer_parsing_to_component(As_Alias)
                                                                    )
                                                                })
                                                            )
                                                        ),
                                                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword()
                                                    })
                                                )]
                                                case "NamespaceImport": return ['namespace import', context.option("namespace import").consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'asterisk token': context.prop("asterisk token").assert_kind("AsteriskToken").consume_keyword(),
                                                        'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                                                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier)
                                                    })
                                                )]
                                                case "DeferKeyword": return ['defer', context.option("defer").based_on_first_node(
                                                    (context) => ({
                                                        'defer keyword': context.prop("defer keyword").consume_keyword(),
                                                        'import': context.prop("import").peek_for_state(
                                                            (kind, abort) => {
                                                                switch (kind) {
                                                                    case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                                                                    case "NamespaceImport": return ['namespace import', context.option("namespace import").assert_kind("NamespaceImport").consume_and_parse_children_as_type(
                                                                        (context) => ({
                                                                            'asterisk token': context.prop("asterisk token").assert_kind("AsteriskToken").consume_keyword(),
                                                                            'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                                                                            'identifier': context.prop("identifier").defer_parsing_to_component(Identifier)
                                                                        })
                                                                    )]
                                                                    case "NamedImports": return ['named imports', context.option("named imports").consume_and_parse_children_as_type(
                                                                        (context) => ({
                                                                            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                                                            'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                                                                "CommaToken",
                                                                                (context) => context.assert_kind("ImportSpecifier").consume_and_parse_children_as_type(
                                                                                    (context) => ({
                                                                                        'type keyword': context.prop("type keyword").peek_for_optional("TypeKeyword", (context) => context.consume_keyword()),
                                                                                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                                                                        'as': context.prop("as").peek_for_optional("AsKeyword", (context) => context.defer_parsing_to_component(As_Alias))
                                                                                    })
                                                                                )
                                                                            ),
                                                                            'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword()
                                                                        })
                                                                    )]
                                                                    default: return abort(null)
                                                                }
                                                            }
                                                        ),
                                                    })
                                                )]
                                                default: return abort(null)
                                            }
                                        }
                                    ),
                                })
                            )
                        ),
                        'from keyword': context.prop("from keyword").peek_for_optional(
                            "FromKeyword",
                            (context) => context.consume_keyword()
                        ),
                        'module specifier': context.prop("module specifier").defer_parsing_to_component(Module_Specifier),
                        'import attributes': context.prop("import attributes").peek_for_optional(
                            "ImportAttributes",
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'with keyword': context.prop("with keyword").consume_keyword(),
                                    'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                    'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                        "CommaToken",
                                        (context) => context.assert_kind("ImportAttribute").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'name': context.prop("name").defer_parsing_to_component(Identifier),
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'value': context.prop("value").defer_parsing_to_component(Expression),
                                            })
                                        )
                                    ),
                                    'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                                })
                            )
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ImportEqualsDeclaration": return ['import equals', context.option("import equals").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'import keyword': context.prop("import keyword").assert_kind("ImportKeyword").consume_keyword(),
                        'type keyword': context.prop("type keyword").peek_for_optional("TypeKeyword", (context) => context.consume_keyword()),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'initializer': context.prop("initializer").defer_parsing_to_component(Initializer),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                    })

                )]
                case "InterfaceDeclaration": return ['interface', context.option("interface").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Interface => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'interface keyword': context.prop("interface keyword").assert_kind("InterfaceKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'heritage': context.prop("heritage").defer_parsing_to_component(Heritage),
                        'body': context.prop("body").defer_parsing_to_component(Object_Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "LabeledStatement": return ['labeled', context.option("labeled").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Labeled => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                    })
                )]
                case "ModuleDeclaration": return ['module', context.option("module").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Module_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'type': context.prop("type").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "Identifier": return ['global', context.option("global").defer_parsing_to_component(Identifier)]
                                    case "ModuleKeyword": return ['module', context.option("module").based_on_first_node(
                                        (context): d_out.Statement.Module_Declaration.Module => ({
                                            'keyword': context.prop("keyword").consume_keyword(),
                                            'name': context.prop("name").defer_parsing_to_component(Property_Name)
                                        })
                                    )]
                                    case "NamespaceKeyword": return ['namespace', context.option("namespace").based_on_first_node(
                                        (context) => ({
                                            'keyword': context.prop("keyword").consume_keyword(),
                                            'name': context.prop("name").defer_parsing_to_component(Identifier)
                                        })
                                    )]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'block': context.prop("block").optional_set_if_not("SemicolonToken", (context) => context.defer_parsing_to_component(Module_Body)),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "NamespaceExportDeclaration": return ['namespace export', context.option("namespace export").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Namespace_Export => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'export keyword': context.prop("export keyword").assert_kind("ExportKeyword").consume_keyword(),
                        'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                        'namespace keyword': context.prop("namespace keyword").assert_kind("NamespaceKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                    })
                )]
                case "ReturnStatement": return ['return', context.option("return").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'return keyword': context.prop("return keyword").assert_kind("ReturnKeyword").consume_keyword(),
                        'expression': context.prop("expression").optional_set_if_not(
                            "SemicolonToken",
                            ($) => context.defer_parsing_to_component(Expression),
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "SwitchStatement": return ['switch', context.option("switch").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Switch => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'switch keyword': context.prop("switch keyword").assert_kind("SwitchKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'case block': context.prop("case block").assert_kind("CaseBlock").consume_and_parse_children_as_type(
                            (context) => ({
                                'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                'clauses': context.prop("clauses").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                                    (context): d_out.Statement.Switch.Case_Clause => context.peek_for_state(
                                        (kind, abort) => {
                                            switch (kind) {
                                                case "CaseClause": return ['case', context.option("case").consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'case keyword': context.prop("case keyword").assert_kind("CaseKeyword").consume_keyword(),
                                                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                        'statements': context.prop("statements").consume_component(Statements),
                                                    })
                                                )]
                                                case "DefaultClause": return ['default', context.option("default").consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'default keyword': context.prop("default keyword").assert_kind("DefaultKeyword").consume_keyword(),
                                                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                        'statements': context.prop("statements").consume_component(Statements),
                                                    })
                                                )]
                                                default: return abort(null)
                                            }
                                        }
                                    )
                                ),
                                'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                            })
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "TryStatement": return ['try', context.option("try").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Try => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'try keyword': context.prop("try keyword").assert_kind("TryKeyword").consume_keyword(),
                        'try block': context.prop("try block").consume_component(Block),
                        'catch clause': context.prop("catch clause").peek_for_optional(
                            "CatchClause",
                            (context): d_out.Statement.Try.Catch_Clause => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'catch keyword': context.prop("catch keyword").assert_kind("CatchKeyword").consume_keyword(),
                                    'binding': context.prop("binding").peek_for_optional(
                                        "OpenParenToken",
                                        (context) => ({
                                            'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                                            'variable declaration': context.prop("variable declaration").consume_component(Variable_Declaration),
                                            'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                                        })
                                    ),
                                    'block': context.prop("block").consume_component(Block),
                                })
                            )
                        ),
                        'finally block': context.prop("finally block").peek_for_optional(
                            "FinallyKeyword",
                            (context) => ({
                                'finally keyword': context.prop("finally keyword").consume_keyword(),
                                'block': context.prop("block").consume_component(Block)
                            })
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "ThrowStatement": return ['throw', context.option("throw").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'throw keyword': context.prop("throw keyword").assert_kind("ThrowKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "TypeAliasDeclaration": return ['type alias', context.option("type alias").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Type_Alias_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'type keyword': context.prop("type keyword").assert_kind("TypeKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "VariableStatement": return ['variable', context.option("variable").consume_and_parse_children_as_type(
                    (context): d_out.Statement.Variable => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'variable declaration list': context.prop("variable declaration list").consume_component(Variable_Declaration_List),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon)
                    })
                )]
                case "WhileStatement": return ['while', context.option("while").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'while keyword': context.prop("while keyword").assert_kind("WhileKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                    })
                )]
                case "WithStatement": return ['with', context.option("with").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'with keyword': context.prop("with keyword").assert_kind("WithKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                    })
                )]
                default: return abort(null)
            }
        }
    )
)

export const Statement_Modifiers: h.Production<d_out.Statement_Modifiers> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Statement_Modifiers",
    (context) => context.peek_for_optional(
        "SyntaxList",
        (context) => context.consume_and_parse_children_as_non_separated_list(
            (context): d_out.Statement_Modifiers.L => context.peek_for_state(
                (kind, abort): d_out.Statement_Modifiers.L => {
                    switch (kind) {
                        case "ReadonlyKeyword": return ['readonly', context.option("readonly").consume_keyword()]
                        case "AbstractKeyword": return ['abstract', context.option("abstract").consume_keyword()]
                        case "AccessorKeyword": return ['accessor', context.option("accessor").consume_keyword()]
                        case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                        case "ConstKeyword": return ['const', context.option("const").consume_keyword()]
                        case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                        case "Decorator": return ['decorator', context.option("decorator").consume_and_parse_children_as_type(
                            (context) => ({
                                'at token': context.prop("at token").assert_kind("AtToken").consume_keyword(),
                                'expression': context.prop("expression").defer_parsing_to_component(Expression),
                            })
                        )]
                        case "PrivateKeyword": return ['private', context.option("private").consume_keyword()]
                        case "DefaultKeyword": return ['default', context.option("default").consume_keyword()]
                        case "ExportKeyword": return ['export', context.option("export").consume_keyword()]
                        case "ProtectedKeyword": return ['protected', context.option("protected").consume_keyword()]
                        case "PublicKeyword": return ['public', context.option("public").consume_keyword()]
                        case "StaticKeyword": return ['static', context.option("static").consume_keyword()]
                        default: return abort(null)
                    }
                }
            ),
        )
    )
)

export const Statements: h.Refiner<d_out.Statements> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "SyntaxList",
    (context) => context.parse_children_as_list(
        (context) => context.defer_parsing_to_component(Statement)
    )
)

export const String_Literal: h.Production<d_out.String_Literal> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "String_Literal",
    (context): d_out.String_Literal => context.consume_literal()
)

export const Type: h.Production<d_out.Type> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Type",
    (context): d_out.Type => context.peek_for_state(
        (kind, abort): d_out.Type => {
            switch (kind) {
                case "AnyKeyword": return ['any', context.option("any").consume_keyword()]
                case "ArrayType": return ['array', context.option("array").consume_and_parse_children_as_type(
                    (context): d_out.Type.Array => ({
                        'element type': context.prop("element type").defer_parsing_to_component(Type),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "BigIntKeyword": return ['big int', context.option("bigint").consume_keyword()]
                case "BooleanKeyword": return ['boolean', context.option("boolean").consume_keyword()]
                case "ConditionalType": return ['conditional', context.option("conditional").consume_and_parse_children_as_type(
                    (context): d_out.Type.Conditional => ({
                        'check type': context.prop("check type").defer_parsing_to_component(Type),
                        'extends keyword': context.prop("extends keyword").assert_kind("ExtendsKeyword").consume_keyword(),
                        'extends type': context.prop("extends type").defer_parsing_to_component(Type),
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                        'true type': context.prop("true type").defer_parsing_to_component(Type),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'false type': context.prop("false type").defer_parsing_to_component(Type),
                    })
                )]
                case "ConstructorType": return ['constructor', context.option("constructor").consume_and_parse_children_as_type(
                    (context): d_out.Type.Constructor => ({
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                        'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'equals greater than token': context.prop("equals greater than token").assert_kind("EqualsGreaterThanToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "IndexedAccessType": return ['indexed access', context.option("indexed access").consume_and_parse_children_as_type(
                    (context): d_out.Type.Indexed_Access => ({
                        'object type': context.prop("object type").defer_parsing_to_component(Type),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'index type': context.prop("index type").defer_parsing_to_component(Type),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "InferType": return ['infer', context.option("infer").consume_and_parse_children_as_type(
                    (context): d_out.Type.Infer => ({
                        'infer keyword': context.prop("infer keyword").assert_kind("InferKeyword").consume_keyword(),
                        'type parameter': context.prop("type parameter").assert_kind("TypeParameter").consume_and_parse_children_as_type(
                            (context) => ({
                                'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                'extends': context.prop("extends").peek_for_optional(
                                    "ExtendsKeyword",
                                    (context) => ({
                                        'extends keyword': context.prop("extends keyword").consume_keyword(),
                                        'type': context.prop("type").defer_parsing_to_component(Type),
                                    })
                                ),
                            })
                        ),
                    })
                )]
                case "IntersectionType": return ['intersection', context.option("intersection").consume_and_parse_children_as_type(
                    (context): d_out.Type.Intersection => context.prop("types").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                        "AmpersandToken",
                        (context) => context.defer_parsing_to_component(Type),
                    )
                )]

                case "JSDocAllType": return ['jsdoc all', context.option("jsdoc all").consume_and_parse_children_as_type(
                    (context): d_out.Type.JSDoc_All => ({
                        'asterisk token': context.prop("asterisk token").assert_kind("AsteriskToken").consume_keyword(),
                    })
                )]
                case "JSDocFunctionType": return ['jsdoc function', context.option("jsdoc function").consume_and_parse_children_as_type(
                    (context): d_out.Type.JSDoc_Function => ({
                        'function keyword': context.prop("function keyword").assert_kind("FunctionKeyword").consume_keyword(),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'type': context.prop("type").defer_parsing_to_component(Optional_Type)
                    })
                )]
                case "JSDocNonNullableType": return ['jsdoc non nullable', context.option("jsdoc non nullable").consume_and_parse_children_as_type(
                    (context): d_out.Type.JSDoc_Non_Nullable => ({
                        'exclamation token before': context.prop("exclamation token before").peek_for_optional(
                            "ExclamationToken",
                            ($) => context.consume_keyword()
                        ),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'exclamation token after': context.prop("exclamation token after").peek_for_optional(
                            "ExclamationToken",
                            ($) => context.consume_keyword()
                        )
                    })
                )]
                case "JSDocNullableType": return ['jsdoc nullable', context.option("jsdoc nullable").consume_and_parse_children_as_type(
                    (context): d_out.Type.JSDoc_Nullable => ({
                        'question token before': context.prop("question token before").peek_for_optional(
                            "QuestionToken",
                            ($) => context.consume_keyword()
                        ),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'question token after': context.prop("question token after").peek_for_optional(
                            "QuestionToken",
                            ($) => context.consume_keyword()
                        )
                    })
                )]
                case "JSDocUnknownType": return ['jsdoc unknown', context.option("jsdoc unknown").consume_and_parse_children_as_type(
                    (context): d_out.Type.JSDoc_Unknown => ({
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                    })
                )]
                case "FunctionType": return ['function', context.option("function").consume_and_parse_children_as_type(
                    (context): d_out.Type.Function_Type => ({
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'equals greater than token': context.prop("equals greater than token").assert_kind("EqualsGreaterThanToken").consume_keyword(),
                        'return type': context.prop("return type").defer_parsing_to_component(Type),
                        'type': context.prop("type").defer_parsing_to_component(Optional_Type)
                    })
                )]
                case "IntrinsicKeyword": return ['intrinsic', context.option("intrinsic").consume_keyword()]
                case "ImportType": return ['import type', context.option("import type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Import => ({
                        'typeof keyword': context.prop("typeof keyword").peek_for_optional(
                            "TypeOfKeyword",
                            (context) => context.consume_keyword()
                        ),
                        'import keyword': context.prop("import keyword").assert_kind("ImportKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'argument': context.prop("argument").defer_parsing_to_component(Type),
                        'attributes': context.prop("attributes").peek_for_optional(
                            "CommaToken",
                            (context) => ({
                                'comma token': context.prop("comma token").consume_keyword(),
                                'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                'with keyword': context.prop("with keyword").consume_keyword(),
                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                'import attributes': context.prop("import attributes").consume_component(Import_Attributes),
                                'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                            })
                        ),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'qualifier': context.prop("qualifier").peek_for_optional(
                            "DotToken",
                            (context) => ({
                                'dot token': context.prop("dot token").consume_keyword(),
                                'name': context.prop("name").defer_parsing_to_component(Entity_Name),
                            })
                        ),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                        'error recovery': context.prop("error recovery type args").peek_for_optional("SyntaxList", (context) => ({
                            'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list("CommaToken", (context) => context.defer_parsing_to_component(Type)),
                            'greater than token': context.prop("greater than token").peek_for_optional("GreaterThanToken", (context) => context.consume_keyword()),
                        })),
                    })
                )]
                case "LiteralType": return ['literal type', context.option("literal type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Literal => ({
                        'type': context.prop("type").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "BigIntLiteral": return ['bigint literal', context.option("bigint literal").consume_literal()]
                                    case "FalseKeyword": return ['false keyword', context.option("false keyword").consume_keyword()]
                                    case "NoSubstitutionTemplateLiteral": return ['no substitution template literal', context.option("no substitution template literal").consume_literal()]
                                    case "NullKeyword": return ['null', context.option("null").consume_keyword()]
                                    case "NumericLiteral": return ['numeric literal', context.option("numeric literal").defer_parsing_to_component(Numeric_Literal)]
                                    case "PrefixUnaryExpression": return ['negative numeric literal', context.option("negative numeric literal").consume_and_parse_children_as_type(
                                        (context) => ({
                                            'minus token': context.prop("minus token").assert_kind("MinusToken").consume_keyword(),
                                            'value': context.prop("value").defer_parsing_to_component(Numeric_Literal),
                                        })
                                    )]
                                    case "StringLiteral": return ['string literal', context.option("string literal").defer_parsing_to_component(String_Literal)]
                                    case "TrueKeyword": return ['true keyword', context.option("true keyword").consume_keyword()]
                                    default: return abort(null)
                                }
                            },
                        ),
                    })
                )]
                case "MappedType": return ['mapped', context.option("mapped").consume_and_parse_children_as_type(
                    (context): d_out.Type.Mapped => ({
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'readonly modifier': context.prop("readonly modifier").optional_set_if_not(
                            "OpenBracketToken",
                            (context) => ({
                                'modifier': context.prop("modifier").optional_set_if_not(
                                    "ReadonlyKeyword",
                                    (context) => context.consume_literal()
                                ),
                                'readonly keyword': context.prop("readonly keyword").assert_kind("ReadonlyKeyword").consume_keyword(),
                            })
                        ),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'type parameter': context.prop("type parameter").assert_kind("TypeParameter").consume_and_parse_children_as_type(
                            (context) => ({
                                'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                                'in keyword': context.prop("in keyword").assert_kind("InKeyword").consume_keyword(),
                                'constraint': context.prop("constraint").defer_parsing_to_component(Type),
                            })
                        ),
                        'as': context.prop("as").peek_for_optional(
                            "AsKeyword",
                            (context) => ({
                                'as keyword': context.prop("as keyword").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                            })
                        ),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                        'question modifier minus': context.prop("question modifier minus").peek_for_optional("MinusToken", (context) => context.consume_keyword()),
                        'question modifier plus': context.prop("question modifier plus").peek_for_optional("PlusToken", (context) => context.consume_keyword()),
                        'question modifier question': context.prop("question modifier question").peek_for_optional("QuestionToken", (context) => context.consume_keyword()),
                        'body': context.prop("body").peek_for_optional(
                            "ColonToken",
                            (context) => ({
                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Semi_Colon),
                            })
                        ),
                        'dummy syntax list': context.prop("dummy syntax list").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                            (context): d_out.Object_Type.Signature => context.defer_parsing_to_component(Object_Type_Signature),
                        ),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                    })
                )]
                case "NeverKeyword": return ['never', context.option("never").consume_keyword()]
                case "NumberKeyword": return ['number', context.option("number").consume_keyword()]
                case "ObjectKeyword": return ['object', context.option("object").consume_keyword()]
                case "OptionalType": return ['optional type', context.option("optional type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Optional => ({
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                    })
                )]
                case "ParenthesizedType": return ['parenthesized', context.option("parenthesized").consume_and_parse_children_as_type(
                    (context): d_out.Type.Parenthesized => ({
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                    })
                )]
                case "StringKeyword": return ['string', context.option("string").consume_keyword()]
                case "SymbolKeyword": return ['symbol', context.option("symbol").consume_keyword()]
                case "ThisType": return ['this', context.option("this").consume_and_parse_children_as_type(
                    (context) => context.assert_kind("ThisKeyword").consume_keyword()
                )]
                case "TupleType": return ['tuple type', context.option("tuple type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Tuple => ({
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.peek_for_state(
                                (kind, abort): d_out.Type.Tuple.Element => {
                                    switch (kind) {
                                        case "NamedTupleMember": return ['named', context.option("named tuple member").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'dot dot dot token': context.prop("dot dot dot token").peek_for_optional(
                                                    "DotDotDotToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'name': context.prop("identifier").defer_parsing_to_component(Identifier),
                                                'question token': context.prop("question token").peek_for_optional(
                                                    "QuestionToken",
                                                    (context) => context.consume_keyword()
                                                ),
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'type': context.prop("type").defer_parsing_to_component(Type),
                                            })
                                        )]
                                        default: return ['regular', context.defer_parsing_to_component(Type)]
                                    }
                                }
                            ),
                        ),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "TypeLiteral": return ['type literal', context.option("type literal").consume_and_parse_children_as_type(
                    (context): d_out.Object_Type => context.defer_parsing_to_component(Object_Type)
                )]
                case "TypeOperator": return ['type operator', context.option("type operator").consume_and_parse_children_as_type(
                    (context): d_out.Type.Type_Operator => ({
                        'operator': context.prop("operator").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "KeyOfKeyword": return ['key of', context.option("key of").consume_keyword()]
                                    case "UniqueKeyword": return ['unique', context.option("unique").consume_keyword()]
                                    case "ReadonlyKeyword": return ['readonly', context.option("readonly").consume_keyword()]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "TypePredicate": return ['type predicate', context.option("type predicate").consume_component(Type_Predicate)]
                case "TypeQuery": return ['query', context.option("query").consume_and_parse_children_as_type(
                    (context): d_out.Type.Query => ({
                        'typeof keyword': context.prop("typeof keyword").assert_kind("TypeOfKeyword").consume_keyword(),
                        'name': context.prop("name").defer_parsing_to_component(Entity_Name),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                    })
                )]
                case "RestType": return ['rest type', context.option("rest type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Rest => ({
                        'dot dot dot token': context.prop("dot dot dot token").assert_kind("DotDotDotToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "TypeReference": return ['type reference', context.option("type reference").consume_and_parse_children_as_type(
                    (context): d_out.Type.Type_Reference => ({
                        'entity name': context.prop("entity name").defer_parsing_to_component(Entity_Name),
                        'dot token': context.prop("dot token").peek_for_optional(
                            "DotToken",
                            ($) => context.consume_keyword()
                        ),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                        'error recovery': context.prop("error recovery type args").defer_parsing_to_component(Error_Recovery),
                    })
                )]
                case "UnionType": return ['union type', context.option("union type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Union => ({
                        'members': context.prop("members").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "BarToken",
                            (context) => context.defer_parsing_to_component(Type),
                        )
                    })
                )]
                case "UndefinedKeyword": return ['undefined', context.option("undefined").consume_keyword()]
                case "UnknownKeyword": return ['unknown', context.option("unknown").consume_keyword()]
                case "VoidKeyword": return ['void', context.option("void").consume_keyword()]
                case "TemplateLiteralType": return ['template literal type', context.option("template literal type").consume_and_parse_children_as_type(
                    (context): d_out.Type.Template_Literal => ({
                        'head': context.prop("head").assert_kind("TemplateHead").consume_literal(),
                        'template spans': context.prop("template spans").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'type': context.prop("type").defer_parsing_to_component(Type),
                                    'suffix': context.prop("suffix").peek_for_state(
                                        (kind, abort) => {
                                            switch (kind) {
                                                case "TemplateTail": return ['tail', context.option("tail").consume_literal()]
                                                case "TemplateMiddle": return ['middle', context.option("middle").consume_literal()]
                                                default: return abort(null)
                                            }
                                        }
                                    )
                                })
                            )
                        )
                    })
                )]
                default: return abort(null)
            }
        }
    )
)

export const Type_Arguments: h.Production<d_out.Type_Arguments> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Type_Arguments",
    (context): d_out.Type_Arguments => context.peek_for_optional(
        "LessThanToken",
        (context) => ({
            'less than token': context.prop("less than token").consume_keyword(),
            'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                "CommaToken",
                (context) => context.defer_parsing_to_component(Type),
            ),
            'greater than token': context.prop("greater than token").assert_kind("GreaterThanToken").consume_keyword(),
        })
    )
)

export const Type_Parameters: h.Production<d_out.Type_Parameters> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Type_Parameters",
    (context): d_out.Type_Parameters => context.peek_for_optional(
        "LessThanToken",
        (context) => ({
            'less than token': context.prop("less than token").consume_keyword(),
            'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                "CommaToken",
                (context) => context.assert_kind("TypeParameter").consume_and_parse_children_as_type(
                    (context): d_out.Type_Parameters.Entries => ({
                        'modifiers': context.prop("modifiers").peek_for_optional(
                            "SyntaxList",
                            (context) => context.consume_and_parse_children_as_non_separated_list(
                                (context) => context.peek_for_state(
                                    (kind, abort) => {
                                        switch (kind) {
                                            case "ConstKeyword": return ['const', context.option("const").consume_keyword()]
                                            case "InKeyword": return ['in', context.option("in").consume_keyword()]
                                            case "OutKeyword": return ['out', context.option("out").consume_keyword()]
                                            case "PublicKeyword": return ['public', context.option("public").consume_keyword()]
                                            default: return abort(null)
                                        }
                                    }
                                )
                            )
                        ),
                        'identifier': context.prop("identifier").defer_parsing_to_component(Identifier),
                        'extends': context.prop("extends").peek_for_optional(
                            "ExtendsKeyword",
                            (context) => ({
                                'extends keyword': context.prop("extends keyword").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                            })
                        ),
                        'default': context.prop("default").peek_for_optional(
                            "EqualsToken",
                            (context) => ({
                                'equals token': context.prop("equals token").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                            })
                        ),
                    })
                )
            ),
            'greater than token': context.prop("greater than token").assert_kind("GreaterThanToken").consume_keyword(),
        })
    )

)

export const Type_Predicate: h.Refiner<d_out.Type_Predicate> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "TypePredicate",
    (context): d_out.Type_Predicate => context.parse_children_as_type(
        (context): d_out.Type_Predicate => ({
            'asserts keyword': context.prop("asserts keyword").peek_for_optional(
                "AssertsKeyword",
                (context) => context.consume_keyword()
            ),
            'parameter name': context.prop("parameter name").peek_for_state(
                (kind, abort) => {
                    switch (kind) {
                        case "Identifier": return ['identifier', context.option("identifier").defer_parsing_to_component(Identifier)]
                        case "ThisType": return ['this', context.option("this").consume_and_parse_children_as_type(
                            (context) => context.assert_kind("ThisKeyword").consume_keyword()
                        )]
                        default: return abort(null)
                    }
                }
            ),
            'is predicate': context.prop("is predicate").peek_for_optional(
                "IsKeyword",
                (context) => ({
                    'is keyword': context.prop("is keyword").consume_keyword(),
                    'type': context.prop("type").defer_parsing_to_component(Type),
                })
            ),
        })
    )
)

export const Variable_Declaration: h.Refiner<d_out.Variable_Declaration> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "VariableDeclaration",
    (context): d_out.Variable_Declaration => context.parse_children_as_type(
        (context): d_out.Variable_Declaration => ({
            // 'modifiers': context.prop("modifiers").construct_component(
            //     "'modifiers'",
            //     Signature_Modifiers
            // ),
            'name': context.prop("name").defer_parsing_to_component(Binding_Pattern),
            'exclamation token': context.prop("exclamation token").peek_for_optional(
                "ExclamationToken",
                ($) => context.consume_keyword()
            ),
            'type': context.prop("type").defer_parsing_to_component(Optional_Type),
            'assignment': context.prop("assignment").peek_for_optional(
                "EqualsToken",
                (context) => ({
                    'initializer': context.prop("initializer").defer_parsing_to_component(Initializer)
                })
            ),
        })
    )
)

export const Variable_Declaration_List: h.Refiner<d_out.Variable_Declaration_List> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "VariableDeclarationList",
    (context): d_out.Variable_Declaration_List => context.parse_children_as_type(
        (context): d_out.Variable_Declaration_List => ({
            'mutability': context.prop("mutability").peek_for_state(
                (kind, abort) => {
                    switch (kind) {
                        case "AwaitKeyword": return ['await using', context.option("await using").based_on_first_node(
                            (context) => ({
                                'await keyword': context.prop("await keyword").consume_keyword(),
                                'using keyword': context.prop("using keyword").assert_kind("UsingKeyword").consume_keyword()
                            })
                        )]
                        case "ConstKeyword": return ['const', context.option("const").consume_keyword()]
                        case "LetKeyword": return ['let', context.option("let").consume_keyword()]
                        case "UsingKeyword": return ['using', context.option("using").consume_keyword()]
                        case "VarKeyword": return ['var', context.option("var").consume_keyword()]
                        default: return abort(null)
                    }
                }
            ),
            'declarations': context.prop("declarations").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                "CommaToken",
                (context): d_out.Variable_Declaration => context.consume_component(Variable_Declaration)
            )
        })
    )
)
