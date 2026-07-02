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

export const Optional_Arguments: h.Production<d_out.Optional_Arguments> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Optional_Arguments",
    (context): d_out.Optional_Arguments => context.peek_for_optional(
        "OpenParenToken",
        (context) => ({
            'question dot token': context.prop("question dot token").peek_for_optional("QuestionDotToken", (context) => context.consume_keyword()),
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
)

export const Binding_Pattern: h.Production<d_out.Binding_Pattern> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    $p,
    "Binding_Pattern",
    (context): d_out.Binding_Pattern => ({
        'modifiers': context.prop("modifiers").peek_for_optional(
            "SyntaxList",
            (context) => context.consume_and_parse_children_as_non_separated_list(
                (context) => context.peek_for_state(
                    (kind, abort) => {
                        switch (kind) {
                            case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                            case "Decorator": return ['decorator', context.option("decorator").consume_keyword()]
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
        'type': context.prop("type").peek_for_state(
            (kind, abort): d_out.Binding_Pattern['type'] => {
                switch (kind) {
                    case "ArrayBindingPattern": return ['array binding pattern', context.option("array binding pattern").consume_and_parse_children_as_type(
                        (context): d_out.Binding_Pattern__Array => ({
                            'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                            'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                "CommaToken",
                                (context) => context.peek_for_state(
                                    (kind, abort): d_out.Binding_Pattern__Array__Element => {
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
                    case "Identifier": return ['identifier', context.option("identifier").consume_literal()]
                    case "NumberKeyword": return ['number keyword', context.option("number keyword").consume_keyword()]
                    case "ObjectBindingPattern": return ['object binding pattern', context.option("object binding pattern").consume_and_parse_children_as_type(
                        (context): d_out.Binding_Pattern__Object => ({
                            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                            'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                "CommaToken",
                                (context): d_out.Binding_Pattern__Object__Element => context.consume_and_parse_children_as_type(
                                    (context): d_out.Binding_Pattern__Object__Element => ({
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
            "Class_Member_Modifiers",
            (context) => context.assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                (context) => context.peek_for_state(
                    (kind, abort) => {
                        switch (kind) {
                            // case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                            default: return abort(null)
                        }
                    }
                )
            )
        ),
        'class keyword': context.prop("class keyword").assert_kind("ClassKeyword").consume_keyword(),
        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
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
            (context): d_out.Class_Body__Member => context.peek_for_state(
                (kind, abort): d_out.Class_Body__Member => {
                    switch (kind) {
                        case "Constructor": return ['constructor', context.option("constructor").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body__Member__Constructor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'constructor keyword': context.prop("constructor keyword").assert_kind("ConstructorKeyword").consume_keyword(),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                            })
                        )]
                        case "GetAccessor": return ['get accessor', context.option("get accessor").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body__Member__Get_Accessor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'get keyword': context.prop("get keyword").assert_kind("GetKeyword").consume_keyword(),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                            })
                        )]
                        case "MethodDeclaration": return ['method', context.option("method").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body__Member__Method => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),

                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                            })
                        )]
                        case "PropertyDeclaration": return ['property', context.option("property").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body__Member__Property => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'question token': context.prop("question token").peek_for_optional(
                                    "QuestionToken",
                                    (context) => context.consume_keyword()
                                ),
                                'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                                'optional initializer': context.prop("optional initializer").defer_parsing_to_component(Optional_Initializer),

                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                            })
                        )]
                        case "SetAccessor": return ['set accessor', context.option("set accessor").consume_and_parse_children_as_type(
                            (context): d_out.Class_Body__Member__Set_Accessor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'set keyword': context.prop("set keyword").assert_kind("SetKeyword").consume_keyword(),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'body': context.prop("body").peek_for_optional(
                                    "Block",
                                    (context) => context.consume_component(Block)
                                ),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                            })
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
                case "Identifier": return ['identifier', context.option("identifier").consume_literal()]
                default: return abort(null)
            }
        }
    )
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
                    (context): d_out.Expression__Array_Literal => ({
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.defer_parsing_to_component(Expression,)
                        ),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "ArrowFunction": return ['arrow function', context.option("arrow function").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Arrow_Function => ({
                        'parameters': context.prop("parameters").peek_for_state(
                            (kind, abort): d_out.Expression__Arrow_Function_Parameters => {
                                switch (kind) {
                                    case "SyntaxList": {
                                        type Phase1 = ['async', null] | ['without parentheses', d_out.Expression__Arrow_Function__Without_Parentheses]
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
                                            return context.peek_for_state((nextKind, nextAbort): d_out.Expression__Arrow_Function_Parameters => {
                                                switch (nextKind) {
                                                    case "SyntaxList": return ['without parentheses', context.consume_and_parse_children_as_type(
                                                        (inner): d_out.Expression__Arrow_Function__Without_Parentheses => ({
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
                    (context): d_out.Expression__As => ({
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "TypeAssertionExpression": return ['assertion', context.option("assertion").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Assertion => ({
                        'less than token': context.prop("less than token").assert_kind("LessThanToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'greater than token': context.prop("greater than token").assert_kind("GreaterThanToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                    })
                )]
                case "AwaitExpression": return ['await', context.option("await").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Await => ({
                        'await keyword': context.prop("await keyword").assert_kind("AwaitKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression)
                    })
                )]
                case "BigIntLiteral": return ['big int literal', context.option("big int literal").prop("big int literal").assert_kind("BigIntLiteral").consume_literal()]
                case "BinaryExpression": return ['binary', context.option("binary").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Binary => ({
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
                    (context): d_out.Expression__Call => ({
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
                    (context): d_out.Expression__Conditional => ({
                        'condition': context.prop("condition").defer_parsing_to_component(Expression),
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                        'when true': context.prop("when true").defer_parsing_to_component(Expression),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'when false': context.prop("when false").defer_parsing_to_component(Expression)
                    })
                )]
                case "DeleteExpression": return ['delete', context.option("delete").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Delete => ({
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
                        'module name': context.prop("module name").assert_kind("StringLiteral").consume_literal(),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                    })
                )]
                case "FalseKeyword": return ['false', context.option("false").consume_keyword()]
                case "FunctionExpression": return ['function', context.option("function").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Function => ({
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
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'body': context.prop("body").consume_component(Block)
                    })
                )]
                case "Identifier": return ['identifier', context.option("identifier").consume_literal()]
                case "ImportKeyword": return ['import keyword', context.option("import keyword").consume_keyword()]
                case "JSDoc": return ['jsdoc', context.option("jsdoc").consume_blob()]
                case "MetaProperty": return ['meta property', context.option("meta property").consume_and_parse_children_as_type(
                    (context) => ({
                        'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                        'dot token': context.prop("dot token").assert_kind("DotToken").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                    })
                )]

                case "NewExpression": return ['new', context.option("new").consume_and_parse_children_as_type(
                    (context) => ({
                        'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                        'arguments': context.prop("arguments").defer_parsing_to_component(Optional_Arguments)
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
                case "NumericLiteral": return ['numeric literal', context.option("numeric literal").consume_literal()]
                case "ObjectLiteralExpression": return ['object literal', context.option("object literal").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Object_Literal => ({
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'properties': context.prop("properties").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context): d_out.Expression__Object_Literal__Property => context.peek_for_state(
                                (kind, abort) => {
                                    switch (kind) {
                                        case "MethodDeclaration": return ['method', context.option("method").consume_and_parse_children_as_type(
                                            (context): d_out.Expression__Object_Literal__Property__Method => ({
                                                // 'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                                'body': context.prop("body").consume_component(Block)
                                            })
                                        )]
                                        case "PropertyAssignment": return ['property', context.option("property assignment").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'initializer': context.prop("initializer").defer_parsing_to_component(Expression)
                                            })
                                        )]
                                        case "ShorthandPropertyAssignment": return ['shorthand property', context.option("shorthand property assignment").consume_and_parse_children_as_type(
                                            (context) => ({
                                                // 'jsdoc': context.prop("jsdoc").call(
                                                //     "'jsdoc'",
                                                //     JSDoc
                                                // ),
                                                'name': context.prop("name").assert_kind("Identifier").consume_literal(),
                                            })
                                        )]
                                        case "SpreadAssignment": return ['spread', context.option("spread").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'dot dot dot token': context.prop("dot dot dot token").assert_kind("DotDotDotToken").consume_keyword(),
                                                'expression': context.prop("expression").defer_parsing_to_component(Expression),
                                            })
                                        )]
                                        case "GetAccessor": return ['get accessor', context.option("get accessor").consume_and_parse_children_as_type(
                                            (context) => ({
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
                                        default: return abort(null)
                                    }
                                }
                            )
                        ),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                    })
                )]
                case "ParenthesizedExpression": return ['parenthesized', context.option("parenthesized").consume_and_parse_children_as_type(
                    (context) => ({
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
                    (context): d_out.Expression__Property_Access => ({
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
                                    case "Identifier": return ['named', context.option("named").consume_literal()]
                                    case "PrivateIdentifier": return ['private', context.option("private").consume_literal()]
                                    default: return abort(null)
                                }
                            }
                        )
                    })
                )]
                case "RegularExpressionLiteral": return ['regular expression literal', context.option("regular expression literal").consume_literal()]
                case "StringLiteral": return ['string literal', context.option("string literal").consume_literal()]
                case "TaggedTemplateExpression": return ['tagged template', context.option("tagged template").consume_and_parse_children_as_type(
                    (context): d_out.Expression__Tagged_Template => ({
                        'tag': context.prop("tag").defer_parsing_to_component(Expression),
                        'template': context.prop("template").peek_for_state(
                            (kind, abort): d_out.Expression__Tagged_Template['template'] => {
                                switch (kind) {
                                    case "NoSubstitutionTemplateLiteral": return ['no substitution template literal', context.option("no substitution template literal").consume_literal()]
                                    case "TemplateExpression": return ['template', context.option("template").consume_and_parse_children_as_type(
                                        (context): d_out.Expression__Template => ({
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
                    (context): d_out.Expression__Template => ({
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
            (context): d_out.Heritage__Clause => context.assert_kind("HeritageClause").consume_and_parse_children_as_type(
                (context): d_out.Heritage__Clause => ({
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

export const Object_Type: h.Production<d_out.Object_Type> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Object_Type",
    (context): d_out.Object_Type => ({
        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
        'signatures': context.prop("signatures").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
            (context): d_out.Object_Type__Signature => context.peek_for_state(
                (kind, abort): d_out.Object_Type__Signature => {
                    switch (kind) {
                        case "CallSignature": return ['call', context.option("call").consume_and_parse_children_as_type(
                            (context): d_out.Object_Type__Signature__Call => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),

                            })
                        )]
                        case "ConstructSignature": return ['construct', context.option("construct").consume_and_parse_children_as_type(
                            (context): d_out.Object_Type__Signature__Construct => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'type': context.prop("type").defer_parsing_to_component(Optional_Type),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                            })
                        )]
                        case "IndexSignature": return ['index', context.option("index").consume_and_parse_children_as_type(
                            (context): d_out.Object_Type__Signature__Index => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                                'parameter': context.prop("parameter").assert_kind("SyntaxList").consume_and_parse_children_as_type(
                                    (context) => context.assert_kind("Parameter").consume_and_parse_children_as_type(
                                        (context) => ({
                                            'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                                            'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                            'type': context.prop("type").defer_parsing_to_component(Type),
                                        })
                                    )
                                ),
                                'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                            })
                        )]
                        case "MethodSignature": return ['method', context.option("method").consume_and_parse_children_as_type(
                            (context): d_out.Object_Type__Signature__Method => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'identifier': context.prop("identifier").defer_parsing_to_component(Property_Name),
                                'question token': context.prop("question token").peek_for_optional(
                                    "QuestionToken",
                                    (context) => context.consume_keyword()
                                ),
                                'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                                'comma': context.prop("comma").defer_parsing_to_component(Optional_Comma),
                            })
                        )]
                        case "PropertySignature": return ['property', context.option("property").consume_and_parse_children_as_type(
                            (context): d_out.Object_Type__Signature__Property => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'modifiers': context.prop("modifiers").defer_parsing_to_component(Signature_Modifiers),
                                'id': context.prop("id").defer_parsing_to_component(Property_Name),
                                'question token': context.prop("question token").peek_for_optional(
                                    "QuestionToken",
                                    (context) => context.consume_keyword()
                                ),
                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
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
                            (context): d_out.Object_Type__Signature__Get_Accessor => ({
                                'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                'get keyword': context.prop("get keyword").assert_kind("GetKeyword").consume_keyword(),
                                'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                                'return type': context.prop("return type").defer_parsing_to_component(Return_Type_Annotation),
                                'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                            })
                        )]
                        default: return abort(null)
                    }
                }
            ),
        ),
        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
    })
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
                (context): d_out.Parameters__Parameter => ({
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
        'type': context.peek_for_state(
            (kind, abort) => {
                switch (kind) {
                    case "ComputedPropertyName": return ['computed', context.option("computed").consume_and_parse_children_as_type(
                        (context): d_out.Property_Name__Computed => ({
                            'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                            'expression': context.prop("expression").defer_parsing_to_component(Expression),
                            'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                        })
                    )]
                    case "Identifier": return ['identifier', context.option("identifier").consume_literal()]
                    case "NumericLiteral": return ['numeric literal', context.option("numeric literal").consume_literal()]
                    case "StringLiteral": return ['string literal', context.option("string literal").consume_literal()]
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
            'second': context.prop("second").assert_kind("Identifier").consume_literal()
        })
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
                        case "TypePredicate": return ['type predicate', context.option("type predicate").consume_and_parse_children_as_type(
                            (context) => ({
                                'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                                'is keyword': context.prop("is keyword").assert_kind("IsKeyword").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                            })
                        )]
                        default: return ['type', context.option("type").defer_parsing_to_component(Type)]
                    }
                }
            )
        })
    )
)

export const Optional_Comma: h.Production<d_out.Optional_Comma> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Comma",
    (context) => context.peek_for_optional(
        "CommaToken",
        (context) => context.prop("comma token").consume_keyword()
    )
)

export const Optional_Semicolon: h.Production<d_out.Optional_Semi_Colon> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Semi_Colon",
    (context) => context.peek_for_optional(
        "SemicolonToken",
        (context) => context.prop("semicolon token").consume_keyword()
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
            (context): d_out.Signature_Modifiers__L => context.peek_for_state(
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
                'end of file': context.prop("end of file").assert_kind("EndOfFileToken").consume_keyword(),
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
                    (context): d_out.Statement__Class_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'class': context.prop("class").defer_parsing_to_component(Class),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "DoStatement": return ['do', context.option("do").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Do => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'do keyword': context.prop("do keyword").assert_kind("DoKeyword").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'while keyword': context.prop("while keyword").assert_kind("WhileKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "EmptyStatement": return ['empty', context.option("empty").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Empty => ({
                        'semicolon token': context.prop("semicolon token").assert_kind("SemicolonToken").consume_keyword(),
                    })
                )]
                case "EnumDeclaration": return ['enum', context.option("enum").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Enum_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").peek_for_optional(
                            "SyntaxList",
                            (context) => context.consume_and_parse_children_as_non_separated_list(
                                (context) => context.peek_for_state(
                                    (kind, abort) => {
                                        switch (kind) {
                                            case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                                            case "Decorator": return ['decorator', context.option("decorator").consume_keyword()]
                                            case "ConstKeyword": return ['const', context.option("const").consume_keyword()]
                                            case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                                            case "DefaultKeyword": return ['default', context.option("default").consume_keyword()]
                                            case "ExportKeyword": return ['export', context.option("export").consume_keyword()]
                                            default: return abort(null)
                                        }
                                    }
                                )
                            )
                        ),
                        'enum keyword': context.prop("enum keyword").assert_kind("EnumKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'members': context.prop("members").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.consume_and_parse_children_as_type(
                                (context): d_out.Statement__Enum_Declaration__Member => ({
                                    'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                                    'name': context.prop("name").defer_parsing_to_component(Property_Name),
                                    'initializer': context.prop("initializer").defer_parsing_to_component(Optional_Initializer)
                                })
                            )
                        ),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ExportAssignment": return ['export assignment', context.option("export assignment").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'export keyword': context.prop("export keyword").assert_kind("ExportKeyword").consume_keyword(),
                        'initializer': context.prop("initializer").defer_parsing_to_component(Initializer),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ExportDeclaration": return ['export declaration', context.option("export declaration").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Export_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'export keyword': context.prop("export keyword").assert_kind("ExportKeyword").consume_keyword(),
                        'type keyword': context.prop("type keyword").peek_for_optional(
                            "TypeKeyword",
                            (context) => context.consume_keyword()
                        ),
                        'type': context.prop("type").peek_for_state(
                            (kind, abort): d_out.Statement__Export_Declaration['type'] => {
                                switch (kind) {
                                    case "AsteriskToken": return ['all', context.option("all").based_on_first_node(
                                        (context) => ({
                                            'asterisk token': context.prop("asterisk token").consume_keyword(),
                                            'as': context.prop("as").peek_for_optional(
                                                "AsKeyword",
                                                (context) => ({
                                                    'as keyword': context.prop("as keyword").consume_keyword(),
                                                    'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal()
                                                })
                                            )
                                        })
                                    )]
                                    case "NamedExports": return ['named', context.option("named").consume_and_parse_children_as_type(
                                        (context) => ({
                                            'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                            'exports': context.prop("exports").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                                "CommaToken",
                                                (context): d_out.Statement__Export_Declaration_Entry => context.consume_and_parse_children_as_type(
                                                    (context) => ({
                                                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                                                        'as': context.prop("as").peek_for_optional(
                                                            "AsKeyword",
                                                            (context) => ({
                                                                'as keyword': context.prop("as keyword").consume_keyword(),
                                                                'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal()
                                                            })
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
                                            'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal()
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
                                'string literal': context.prop("string literal").assert_kind("StringLiteral").consume_literal(),
                            })
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ExpressionStatement": return ['expression', context.option("expression").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Expression => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                    })
                )]
                case "ForStatement": return ['for', context.option("for").consume_and_parse_children_as_type(
                    (context): d_out.Statement__For => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'for keyword': context.prop("for keyword").assert_kind("ForKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'initializer': context.prop("initializer").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "VariableDeclarationList": return ['variable declaration list', context.option("variable declaration list").consume_component(VariableDeclarationList)]
                                    default: return ['expression', context.option("expression").defer_parsing_to_component(Expression)]
                                }
                            }
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ForInStatement": return ['for in', context.option("for in").consume_and_parse_children_as_type(
                    (context) => ({
                        'for keyword': context.prop("for keyword").assert_kind("ForKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'variable declaration list': context.prop("variable declaration list").consume_component(VariableDeclarationList),
                        'in keyword': context.prop("in keyword").assert_kind("InKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ForOfStatement": return ['for of', context.option("for of").consume_and_parse_children_as_type(
                    (context): d_out.Statement__For_Of => ({
                        'for keyword': context.prop("for keyword").assert_kind("ForKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'variable declaration list': context.prop("variable declaration list").consume_component(VariableDeclarationList),
                        'of keyword': context.prop("of keyword").assert_kind("OfKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "FunctionDeclaration": return ['function', context.option("function").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Function_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'function keyword': context.prop("function keyword").assert_kind("FunctionKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'return type annotation': context.prop("return type annotation").defer_parsing_to_component(Return_Type_Annotation),
                        'body': context.prop("body").peek_for_optional(
                            "Block",
                            (context) => context.consume_component(Block)
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]


                case "IfStatement": return ['if', context.option("if").consume_and_parse_children_as_type(
                    (context) => ({
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ImportDeclaration": return ['import', context.option("import").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Import_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'import keyword': context.prop("import keyword").assert_kind("ImportKeyword").consume_keyword(),
                        'clause': context.prop("clause").assert_kind("ImportClause").consume_and_parse_children_as_type(
                            (context): d_out.Statement__Import_Declaration['clause'] => ({
                                'type keyword': context.prop("type keyword").peek_for_optional(
                                    "TypeKeyword",
                                    (context) => context.consume_keyword()
                                ),
                                'type': context.prop("type").peek_for_state(
                                    (kind, abort) => {
                                        switch (kind) {
                                            case "Identifier": return ['identifier', context.option("identifier").consume_literal()]
                                            case "NamedImports": return ['named imports', context.option("named imports").consume_and_parse_children_as_type(
                                                (context) => ({
                                                    'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                                    'entries': context.prop("entries").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                                        "CommaToken",
                                                        (context) => context.assert_kind("ImportSpecifier").consume_and_parse_children_as_type(
                                                            (context): d_out.Import_Specifier => ({
                                                                'type keyword': context.prop("type keyword").peek_for_optional(
                                                                    "TypeKeyword",
                                                                    (context) => context.consume_keyword()
                                                                ),
                                                                'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                                                                'as': context.prop("as").peek_for_optional(
                                                                    "AsKeyword",
                                                                    (context) => ({
                                                                        'as keyword': context.prop("as keyword").consume_keyword(),
                                                                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal()
                                                                    })
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
                                                    'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal()
                                                })
                                            )]

                                            default: return abort(null)
                                        }
                                    }
                                ),
                            })
                        ),
                        'from keyword': context.prop("from keyword").assert_kind("FromKeyword").consume_keyword(),
                        'string literal': context.prop("string literal").assert_kind("StringLiteral").consume_literal(),
                        'import attributes': context.prop("import attributes").peek_for_optional(
                            "ImportAttributes",
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'with keyword': context.prop("with keyword").assert_kind("WithKeyword").consume_keyword(),
                                    'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                    'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                                        "CommaToken",
                                        (context) => context.assert_kind("ImportAttribute").consume_and_parse_children_as_type(
                                            (context) => ({
                                                'name': context.prop("name").assert_kind("Identifier").consume_literal(),
                                                'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                                                'value': context.prop("value").assert_kind("StringLiteral").consume_literal(),
                                            })
                                        )
                                    ),
                                    'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                                })
                            )
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ImportEqualsDeclaration": return ['import equals', context.option("import equals").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'import keyword': context.prop("import keyword").assert_kind("ImportKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'initializer': context.prop("initializer").defer_parsing_to_component(Initializer),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                    })

                )]
                case "InterfaceDeclaration": return ['interface', context.option("interface").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Interface => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'interface keyword': context.prop("interface keyword").assert_kind("InterfaceKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'heritage': context.prop("heritage").defer_parsing_to_component(Heritage),
                        'body': context.prop("body").defer_parsing_to_component(Object_Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "LabeledStatement": return ['labeled', context.option("labeled").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Labeled => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                    })
                )]
                case "ModuleDeclaration": return ['module', context.option("module").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Module_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'type': context.prop("type").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "Identifier": return ['global', context.option("global").consume_literal()]
                                    case "ModuleKeyword": return ['module', context.option("module").based_on_first_node(
                                        (context): d_out.Statement__Module_Declaration__Module => ({
                                            'keyword': context.prop("keyword").consume_keyword(),
                                            'name': context.prop("name").defer_parsing_to_component(Property_Name)
                                        })
                                    )]
                                    case "NamespaceKeyword": return ['namespace', context.option("namespace").based_on_first_node(
                                        (context) => ({
                                            'keyword': context.prop("keyword").consume_keyword(),
                                            'name': context.prop("name").assert_kind("Identifier").consume_literal()
                                        })
                                    )]
                                    default: return abort(null)
                                }
                            }
                        ),
                        'block': context.prop("block").assert_kind("ModuleBlock").consume_and_parse_children_as_type(
                            (context): d_out.Statement__Module_Declaration__Block => ({
                                // 'jsdoc': context.prop("jsdoc").construct_component(
                                //     "'jsdoc'",
                                //     JSDoc
                                // ),
                                'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                'statements': context.prop("statements").consume_component(Statements),
                                'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                                // 'semicolon': context.prop("semicolon").construct_component(
                                //     "'semicolon token'",
                                //     Semi_Colon
                                // )
                            })
                        ),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "NamespaceExportDeclaration": return ['namespace export', context.option("namespace export").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Namespace_Export => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'export keyword': context.prop("export keyword").assert_kind("ExportKeyword").consume_keyword(),
                        'as keyword': context.prop("as keyword").assert_kind("AsKeyword").consume_keyword(),
                        'namespace keyword': context.prop("namespace keyword").assert_kind("NamespaceKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "SwitchStatement": return ['switch', context.option("switch").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Switch => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'switch keyword': context.prop("switch keyword").assert_kind("SwitchKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'case block': context.prop("case block").assert_kind("CaseBlock").consume_and_parse_children_as_type(
                            (context) => ({
                                'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                                'clauses': context.prop("clauses").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                                    (context): d_out.Statement__Switch_Case_Clause => context.peek_for_state(
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "TryStatement": return ['try', context.option("try").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Try => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'try keyword': context.prop("try keyword").assert_kind("TryKeyword").consume_keyword(),
                        'try block': context.prop("try block").consume_component(Block),
                        'catch clause': context.prop("catch clause").peek_for_optional(
                            "CatchClause",
                            (context): d_out.Statement__Try__Catch_Clause => context.consume_and_parse_children_as_type(
                                (context) => ({
                                    'catch keyword': context.prop("catch keyword").assert_kind("CatchKeyword").consume_keyword(),
                                    'binding': context.prop("binding").peek_for_optional(
                                        "OpenParenToken",
                                        (context) => ({
                                            'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                                            'variable declaration': context.prop("variable declaration").consume_component(VariableDeclaration),
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
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "ThrowStatement": return ['throw', context.option("throw").consume_and_parse_children_as_type(
                    (context) => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'throw keyword': context.prop("throw keyword").assert_kind("ThrowKeyword").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "TypeAliasDeclaration": return ['type alias', context.option("type alias").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Type_Alias_Declaration => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'type keyword': context.prop("type keyword").assert_kind("TypeKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'equals token': context.prop("equals token").assert_kind("EqualsToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                case "VariableStatement": return ['variable', context.option("variable").consume_and_parse_children_as_type(
                    (context): d_out.Statement__Variable => ({
                        'jsdoc': context.prop("jsdoc").defer_parsing_to_component(JSDoc),
                        'modifiers': context.prop("modifiers").defer_parsing_to_component(Statement_Modifiers),
                        'variable declaration list': context.prop("variable declaration list").consume_component(VariableDeclarationList),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon)
                    })
                )]
                case "WhileStatement": return ['while', context.option("while").consume_and_parse_children_as_type(
                    (context) => ({
                        'while keyword': context.prop("while keyword").assert_kind("WhileKeyword").consume_keyword(),
                        'open parenthesis token': context.prop("open parenthesis token").assert_kind("OpenParenToken").consume_keyword(),
                        'expression': context.prop("expression").defer_parsing_to_component(Expression),
                        'close parenthesis token': context.prop("close parenthesis token").assert_kind("CloseParenToken").consume_keyword(),
                        'statement': context.prop("statement").defer_parsing_to_component(Statement),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                    })
                )]
                default: return abort(null)
            }
        }
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

export const Statement_Modifiers: h.Production<d_out.Statement_Modifiers> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    $p,
    "Statement_Modifiers",
    (context) => context.peek_for_optional(
        "SyntaxList",
        (context) => context.consume_and_parse_children_as_non_separated_list(
            (context): d_out.Statement_Modifiers__L => context.peek_for_state(
                (kind, abort): d_out.Statement_Modifiers__L => {
                    switch (kind) {
                        // case "ReadonlyKeyword": return ['readonly', context.option("readonly").consume_keyword()]
                        case "AbstractKeyword": return ['abstract', context.option("abstract").consume_keyword()]
                        case "AsyncKeyword": return ['async', context.option("async").consume_keyword()]
                        case "DeclareKeyword": return ['declare', context.option("declare").consume_keyword()]
                        case "Decorator": return ['decorator', context.option("decorator").consume_keyword()]
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
                    (context): d_out.Type__Array => ({
                        'element type': context.prop("element type").defer_parsing_to_component(Type),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "BigIntKeyword": return ['big int', context.option("bigint").consume_keyword()]
                case "BooleanKeyword": return ['boolean', context.option("boolean").consume_keyword()]
                case "ConditionalType": return ['conditional', context.option("conditional").consume_and_parse_children_as_type(
                    (context): d_out.Type__Conditional => ({
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
                    (context): d_out.Type__Constructor => ({
                        'new keyword': context.prop("new keyword").assert_kind("NewKeyword").consume_keyword(),
                        // 'type parameters': context.prop("type parameters").construct_component(
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'equals greater than token': context.prop("equals greater than token").assert_kind("EqualsGreaterThanToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                    })
                )]
                case "IndexedAccessType": return ['indexed access', context.option("indexed access").consume_and_parse_children_as_type(
                    (context): d_out.Type__Indexed_Access => ({
                        'object type': context.prop("object type").defer_parsing_to_component(Type),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'index type': context.prop("index type").defer_parsing_to_component(Type),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                    })
                )]
                case "InferType": return ['infer', context.option("infer").consume_and_parse_children_as_type(
                    (context): d_out.Type__Infer => ({
                        'infer keyword': context.prop("infer keyword").assert_kind("InferKeyword").consume_keyword(),
                        'identifier': context.prop("identifier").assert_kind("TypeParameter").consume_and_parse_children_as_type(
                            (context) => context.consume_and_parse_children_as_type(
                                (context) => context.assert_kind("Identifier").consume_literal()
                            )
                        ),
                        'extends': context.prop("extends").peek_for_optional(
                            "ExtendsKeyword",
                            ($) => ({
                                'extends keyword': context.prop("extends keyword").consume_keyword(),
                                'type': context.prop("type").defer_parsing_to_component(Type),
                            })
                        )
                    })
                )]
                case "IntersectionType": return ['intersection', context.option("intersection").consume_and_parse_children_as_type(
                    (context): d_out.Type__Intersection => context.prop("types").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                        "AmpersandToken",
                        (context) => context.defer_parsing_to_component(Type),
                    )
                )]

                case "JSDocAllType": return ['jsdoc all', context.option("jsdoc all").consume_and_parse_children_as_type(
                    (context): d_out.Type__JSDoc_All => ({
                        'asterisk token': context.prop("asterisk token").assert_kind("AsteriskToken").consume_keyword(),
                    })
                )]
                case "JSDocFunctionType": return ['jsdoc function', context.option("jsdoc function").consume_and_parse_children_as_type(
                    (context): d_out.Type__JSDoc_Function => ({
                        'function keyword': context.prop("function keyword").assert_kind("FunctionKeyword").consume_keyword(),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'type': context.prop("type").defer_parsing_to_component(Optional_Type)
                    })
                )]
                case "JSDocNonNullableType": return ['jsdoc non nullable', context.option("jsdoc non nullable").consume_and_parse_children_as_type(
                    (context): d_out.Type__JSDoc_Non_Nullable => ({
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
                    (context): d_out.Type__JSDoc_Nullable => ({
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
                    (context): d_out.Type__JSDoc_Unknown => ({
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                    })
                )]
                case "FunctionType": return ['function', context.option("function").consume_and_parse_children_as_type(
                    (context): d_out.Type__Function_Type => ({
                        'type parameters': context.prop("type parameters").defer_parsing_to_component(Type_Parameters),
                        'parameters': context.prop("parameters").defer_parsing_to_component(Parameters),
                        'equals greater than token': context.prop("equals greater than token").assert_kind("EqualsGreaterThanToken").consume_keyword(),
                        'return type': context.prop("return type").defer_parsing_to_component(Type),
                        'type': context.prop("type").defer_parsing_to_component(Optional_Type)
                    })
                )]
                case "LiteralType": return ['literal type', context.option("literal type").consume_and_parse_children_as_type(
                    (context): d_out.Type__Literal => ({
                        'type': context.prop("type").peek_for_state(
                            (kind, abort) => {
                                switch (kind) {
                                    case "FalseKeyword": return ['false keyword', context.option("false keyword").consume_keyword()]
                                    case "NullKeyword": return ['null', context.option("null").consume_keyword()]
                                    case "NumericLiteral": return ['numeric literal', context.option("numeric literal").consume_literal()]
                                    case "StringLiteral": return ['string literal', context.option("string literal").consume_literal()]
                                    case "TrueKeyword": return ['true keyword', context.option("true keyword").consume_keyword()]
                                    default: return abort(null)
                                }
                            },
                        ),
                    })
                )]
                case "MappedType": return ['mapped', context.option("mapped").consume_and_parse_children_as_type(
                    (context): d_out.Type__Mapped => ({
                        'open brace token': context.prop("open brace token").assert_kind("OpenBraceToken").consume_keyword(),
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'type parameter': context.prop("type parameter").assert_kind("TypeParameter").consume_and_parse_children_as_type(
                            (context) => ({
                                'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
                                'in keyword': context.prop("in keyword").assert_kind("InKeyword").consume_keyword(),
                                'constraint': context.prop("constraint").defer_parsing_to_component(Type),
                                'as': context.prop("as").peek_for_optional(
                                    "AsKeyword",
                                    (context) => ({
                                        'as keyword': context.prop("as keyword").consume_keyword(),
                                        'type': context.prop("type").defer_parsing_to_component(Type),
                                    })
                                )
                            })
                        ),
                        // 'question token': context.prop("question token").optional(
                        //     "QuestionToken",
                        //     ($) => context.consume_keyword(
                        //         "'question token'",
                        //         "QuestionToken"
                        //     )
                        // ),
                        // 'readonly keyword': context.prop("readonly keyword").optional(
                        //     "ReadonlyKeyword",
                        //     ($) => context.consume_keyword(
                        //         "'readonly keyword'",
                        //         "ReadonlyKeyword"      
                        // )     
                        // ),
                        'close bracket token': context.prop("close bracket token").assert_kind("CloseBracketToken").consume_keyword(),
                        'colon token': context.prop("colon token").assert_kind("ColonToken").consume_keyword(),
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'semicolon': context.prop("semicolon").defer_parsing_to_component(Optional_Semicolon),
                        'dummy syntax list': context.prop("dummy syntax list").assert_kind("SyntaxList").consume_keyword(),
                        'close brace token': context.prop("close brace token").assert_kind("CloseBraceToken").consume_keyword(),
                    })
                )]
                case "NeverKeyword": return ['never', context.option("never").consume_keyword()]
                case "NumberKeyword": return ['number', context.option("number").consume_keyword()]
                case "ObjectKeyword": return ['object', context.option("object").consume_keyword()]
                case "OptionalType": return ['optional type', context.option("optional type").consume_and_parse_children_as_type(
                    (context): d_out.Type__Optional => ({
                        'type': context.prop("type").defer_parsing_to_component(Type),
                        'question token': context.prop("question token").assert_kind("QuestionToken").consume_keyword(),
                    })
                )]
                case "ParenthesizedType": return ['parenthesized', context.option("parenthesized").consume_and_parse_children_as_type(
                    (context): d_out.Type__Parenthesized => ({
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
                    (context): d_out.Type__Tuple => ({
                        'open bracket token': context.prop("open bracket token").assert_kind("OpenBracketToken").consume_keyword(),
                        'elements': context.prop("elements").assert_kind("SyntaxList").consume_and_parse_children_as_separated_list(
                            "CommaToken",
                            (context) => context.peek_for_state(
                                (kind, abort): d_out.Type__Tuple__Element => {
                                    switch (kind) {
                                        case "NamedTupleMember": return ['named', context.option("named tuple member").consume_and_parse_children_as_type(
                                            (context) => ({
                                                // 'dot dot dot token': context.prop("dot dot dot token").optional(
                                                //     "DotDotDotToken",
                                                //     ($) => context.consume_keyword()
                                                // ),
                                                'name': context.prop("identifier").assert_kind("Identifier").consume_literal(),
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
                    (context): d_out.Type__Type_Operator => ({
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
                case "TypeQuery": return ['query', context.option("query").consume_and_parse_children_as_type(
                    (context): d_out.Type__Query => ({
                        'typeof keyword': context.prop("typeof keyword").assert_kind("TypeOfKeyword").consume_keyword(),
                        'name': context.prop("name").defer_parsing_to_component(Entity_Name)
                    })
                )]
                case "TypeReference": return ['type reference', context.option("type reference").consume_and_parse_children_as_type(
                    (context): d_out.Type__Type_Reference => ({
                        'entity name': context.prop("entity name").defer_parsing_to_component(Entity_Name),
                        'dot token': context.prop("dot token").peek_for_optional(
                            "DotToken",
                            ($) => context.consume_keyword()
                        ),
                        'type arguments': context.prop("type arguments").defer_parsing_to_component(Type_Arguments),
                    })
                )]
                case "UnionType": return ['union type', context.option("union type").consume_and_parse_children_as_type(
                    (context): d_out.Type__Union => ({
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
                    (context): d_out.Type__Template_Literal => ({
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

export const TypeParameter: h.Refiner<d_out.Type__Parameters__L> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    $p,
    "TypeParameter",
    (context): d_out.Type__Parameters__L => context.parse_children_as_type(
        (context): d_out.Type__Parameters__L => ({
            'identifier': context.prop("identifier").assert_kind("Identifier").consume_literal(),
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
                (context) => context.consume_component(TypeParameter)
            ),
            'greater than token': context.prop("greater than token").assert_kind("GreaterThanToken").consume_keyword(),
        })
    )

)

export const VariableDeclaration: h.Refiner<d_out.Variable_Declaration> = ($, abort, $p) => h.create_node_context(
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

export const VariableDeclarationList: h.Refiner<d_out.Variable_Declaration_List> = ($, abort, $p) => h.create_node_context(
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
            'declarations': context.prop("declarations").assert_kind("SyntaxList").consume_and_parse_children_as_non_separated_list(
                (context): d_out.Variable_Declaration => context.consume_component(VariableDeclaration)
            )
        })
    )
)