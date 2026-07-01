import * as h from "../../../../temp_helpers"

//data types
import * as d_out from "../../../../interface/data/typed_ast"

export const Binding_Pattern: h.Refiner<d_out.Binding_Pattern> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Binding_Pattern",
    },
    (context): d_out.Binding_Pattern => {
        switch ($.kind) {
            case "ArrayBindingPattern": return ['array binding pattern', context.parse_children(
                "ArrayBindingPattern",
                (context): d_out.Binding_Pattern__Array => ({
                    'open bracket token': context.consume_keyword(
                        "ArrayBindingPattern['open bracket token']",
                        "OpenBracketToken",
                    ),
                    'elements': context.consume_syntax_list(
                        "ArrayBindingPattern['elements']",
                        ($, context) => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                case "OmittedExpression": return ['omitted expression', null]
                                case "BindingElement": return ['binding element', context.parse_children(
                                    "BindingElement",
                                    (context) => ({
                                        'dot dot dot token': context.optional(
                                            ($) => $.kind === "DotDotDotToken",
                                            (context) => context.consume_keyword(
                                                "BindingElement['dot dot dot token']",
                                                "DotDotDotToken",
                                            )
                                        ),
                                        'name': context.consume_component(
                                            "BindingElement['name']",
                                            Binding_Pattern
                                        ),
                                        'initializer': context.optional(
                                            ($) => $.kind === "EqualsToken",
                                            (context) => ({
                                                'equals token': context.consume_keyword(
                                                    "BindingElement['initializer']['equals token']",
                                                    "EqualsToken",
                                                ),
                                                'expression': context.consume_component(
                                                    "BindingElement['initializer']['expression']",
                                                    Expression
                                                )
                                            })
                                        )
                                    })
                                )]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Binding_Pattern",
                                    'internal path description': "ArrayBindingPattern['elements']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    ),
                    'close bracket token': context.consume_keyword(
                        "ArrayBindingPattern['close bracket token']",
                        "CloseBracketToken",
                    ),
                })
            )]
            case "Identifier": return ['identifier', $]
            case "NumberKeyword": return ['number keyword', null]
            case "ObjectBindingPattern": return ['object binding pattern', context.parse_children(
                "ObjectBindingPattern",
                (context): d_out.Binding_Pattern__Object => ({
                    'open brace token': context.consume_keyword(
                        "ObjectBindingPattern['open brace token']",
                        "OpenBraceToken",
                    ),
                    'elements': context.consume_syntax_list(
                        "ObjectBindingPattern['elements']",
                        ($, context) => {
                            switch ($.kind) {
                                case "BindingElement": return ['binding element', context.parse_children(
                                    "BindingElement",
                                    (context): d_out.Binding_Pattern__Object__Element => ({
                                        'property name': context.consume_component(
                                            "BindingElement['property name']",
                                            Property_Name
                                        ),
                                        // 'dot dot dot token': context.optional(
                                        //     ($) => $.kind === "DotDotDotToken",
                                        //     (context) => context.consume_keyword(
                                        //         "BindingElement['dot dot dot token']",
                                        //         "DotDotDotToken",
                                        //     )
                                        // ),
                                        'colon token': context.consume_keyword(
                                            "BindingElement['colon token']",
                                            "ColonToken"
                                        ),
                                        'name': context.consume_component(
                                            "'name'",
                                            Binding_Pattern
                                        ),
                                        // 'initializer': context.optional(
                                        //     ($) => $.kind === "EqualsToken",
                                        //     (context) => ({
                                        //         'equals token': context.consume_keyword(
                                        //             "BindingElement['initializer']['equals token']",
                                        //             "EqualsToken",
                                        //         ),
                                        //         'expression': context.consume_component(
                                        //             "BindingElement['initializer']['expression']",
                                        //             Expression
                                        //         )
                                        //     })
                                        // )
                                    })
                                )]
                                case "CommaToken": return ['comma token', null]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Binding_Pattern",
                                    'internal path description': "ObjectBindingPattern['elements']",
                                    'problem': ['unexpected node', $],
                                })
                            }

                        }
                    ),
                    'close brace token': context.consume_keyword(
                        "ObjectBindingPattern['close brace token']",
                        "CloseBraceToken",
                    ),
                })
            )]
            case "StringKeyword": return ['string keyword', null]

            default: return abort({
                'parent': $,
                'external location description': $p['location description'] + ">Binding_Pattern",
                'module name': "Binding_Pattern",
                'internal path description': "-",
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Block: h.Refiner<d_out.Block> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Block",
    },
    (context): d_out.Block => {
        switch ($.kind) {
            case "Block": return context.parse_children(
                "Block",
                (context): d_out.Block => ({
                    'open brace token': context.consume_keyword(
                        "Block['open brace token']",
                        "OpenBraceToken"
                    ),
                    'statements': context.consume_component(
                        "Block['statements']",
                        Statements
                    ),
                    'close brace token': context.consume_keyword(
                        "Block['close brace token']",
                        "CloseBraceToken",
                    ),
                })
            )
            default: return abort({
                'parent': $p.parent,
                'external location description': $p['location description'],
                'module name': "Block",
                'internal path description': "-",
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Class_Body: h.Production<d_out.Class_Body> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Class_Body",
    },
    (context): d_out.Class_Body => ({
        'open brace token': context.consume_keyword(
            "Class_Body['open brace token']",
            "OpenBraceToken",
        ),
        'members': context.consume_syntax_list(
            "Class_Body['members']",
            ($, context): d_out.Class_Body__Member => {
                switch ($.kind) {
                    case "Constructor": return ['constructor', context.parse_children(
                        "Constructor",
                        (context): d_out.Class_Body__Member__Constructor => ({
                            'jsdoc': context.construct_component(
                                "Constructor['jsdoc']",
                                JSDoc
                            ),
                            'constructor keyword': context.consume_keyword(
                                "Constructor['constructor keyword']",
                                "ConstructorKeyword"
                            ),
                            'parameters': context.construct_component(
                                "Constructor['parameters']",
                                Parameters
                            ),
                            'body': context.consume_component(
                                "Constructor['body']",
                                Block
                            )
                        })
                    )]
                    default: return abort({
                        'parent': $,
                        'external location description': $p['location description'],
                        'module name': "Class_Body",
                        'internal path description': "Class_Body['members']",

                        'problem': ['unexpected node', $],
                    })
                }
            }
        ),
        'close brace token': context.consume_keyword(
            "Class_Body['close brace token']",
            "CloseBraceToken",
        )
    })
)

export const Entity_Name: h.Refiner<d_out.Entity_Name> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Entity_Name",
    },
    (context): d_out.Entity_Name => {

        switch ($.kind) {
            case "QualifiedName": return ['qualified name', context.call_with_this_node(
                "Entity_Name",
                Qualified_Name,
            )]
            case "Identifier": return ['identifier', $]
            default: return abort({
                'parent': $,
                'external location description': $p['location description'],
                'module name': "Entity_Name",
                'internal path description': "-",
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Expression: h.Refiner<d_out.Expression> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Expression",
    },
    (context): d_out.Expression => {
        switch ($.kind) {
            case "ArrayLiteralExpression": return ['array literal', context.parse_children(
                "ArrayLiteralExpression",
                (context): d_out.Expression__Array_Literal => ({
                    'open bracket token': context.consume_keyword(
                        "ArrayLiteralExpression['open bracket token']",
                        "OpenBracketToken",
                    ),
                    'elements': context.consume_syntax_list(
                        "ArrayLiteralExpression['elements']",
                        ($, context): d_out.Expression__Array_Literal__Element => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                default: return ['expression', context.call_with_this_node(
                                    "ArrayLiteralExpression['elements']",
                                    Expression,
                                )]
                            }
                        }
                    ),
                    'close bracket token': context.consume_keyword(
                        "ArrayLiteralExpression['close bracket token']",
                        "CloseBracketToken",
                    ),
                })
            )]
            case "ArrowFunction": return ['arrow function', context.parse_children(
                "ArrowFunction",
                (context): d_out.Expression__Arrow_Function => ({
                    'modifiers': context.optional(
                        ($) => $.kind === "SyntaxList",
                        (context) => context.consume_component( //I'm misusing the 'consume_component' here, it's not really a component. I'm not sure how to do it differently for now (consume_syntax_list?)
                            "Modifiers",
                            ($, abort, $p) => h.create_node_context(
                                $,
                                abort,
                                {
                                    'location description': $p['location description'],
                                    'parent': $p.parent,
                                    'module name': "['arrow function']['modifiers']",
                                },
                                (context) => context.process_children_as_list(
                                    "Modifiers",
                                    ($) => {
                                        switch ($.kind) {
                                            case "AsyncKeyword": return ['async', null]
                                            default: return abort({
                                                'parent': $p.parent,
                                                'external location description': $p['location description'],
                                                'module name': "Modifiers",
                                                'internal path description': "-",
                                                'problem': ['unexpected node', $],
                                            })
                                        }
                                    },
                                )
                            )
                        )
                    ),
                    'type parameters': context.construct_component(
                        "ArrowFunction['type parameters']",
                        Type_Parameters
                    ),
                    'parameters': context.peek_for_state(
                        "ArrowFunction['parameters']",
                        ($): d_out.Expression__Arrow_Function_Parameters => {
                            switch ($.kind) {
                                //this seems to be a misuse of the concept of 'SyntaxList'; there is exactly 1 element expected
                                case "SyntaxList": return ['without parentheses', context.consume_group(
                                    "ArrowFunction['parameters']",
                                    "SyntaxList",
                                    ($, context): d_out.Expression__Arrow_Function__Without_Parentheses => context.parse_children(
                                        "xxx",
                                        (context): d_out.Expression__Arrow_Function__Without_Parentheses => ({
                                            'parameter': context.consume_group(
                                                "SyntaxList['parameter']",
                                                "Parameter",
                                                ($, context) => context.parse_children(
                                                    "Parameter",
                                                    (context) => ({
                                                        'jsdoc': context.construct_component(
                                                            "Parameter['jsdoc']",
                                                            JSDoc
                                                        ),
                                                        'name': context.consume_component(
                                                            "Parameter['name']",
                                                            Binding_Pattern
                                                        ),
                                                        'type': context.construct_component(
                                                            "Parameter['type']",
                                                            Optional_Type
                                                        ),
                                                    })
                                                )
                                            )
                                        })
                                    )
                                )]
                                default: return ['with parentheses', context.construct_component(
                                    "ArrowFunction['parameters']",
                                    Parameters
                                )]
                            }
                        }
                    ),
                    'type': context.construct_component(
                        "ArrowFunction['type']",
                        Optional_Type
                    ),
                    'equals greater than token': context.consume_keyword(
                        "ArrowFunction['equals greater than token']",
                        "EqualsGreaterThanToken"
                    ),
                    'body': context.consume_state(
                        "ArrowFunction['body']",
                        ($, context) => {
                            switch ($.kind) {
                                case "Block": return ['block', context.call_with_this_node(
                                    "ArrowFunction['body']",
                                    Block,
                                )]
                                default: return ['expression', context.call_with_this_node(
                                    "ArrowFunction['body']",
                                    Expression,
                                )]
                            }
                        }
                    )
                })
            )]
            case "AsExpression": return ['as expression', context.parse_children(
                "AsExpression",
                (context) => ({
                    'expression': context.consume_component(
                        "AsExpression['expression']",
                        Expression
                    ),
                    'as keyword': context.consume_keyword(
                        "AsExpression['as keyword']",
                        "AsKeyword"
                    ),
                    'type': context.consume_component(
                        "AsExpression['type']",
                        Type
                    )
                })
            )]
            case "AwaitExpression": return ['await', context.parse_children(
                "AwaitExpression",
                (context) => ({
                    'await keyword': context.consume_keyword(
                        "AwaitExpression['await keyword']",
                        "AwaitKeyword"
                    ),
                    'expression': context.consume_component(
                        "AwaitExpression['expression']",
                        Expression
                    )
                })
            )]
            case "BigIntLiteral": return ['big int literal', $]
            case "BinaryExpression": return ['binary', context.parse_children(
                "BinaryExpression",
                (context): d_out.Expression__Binary => ({
                    'left': context.consume_component(
                        "BinaryExpression['left']",
                        Expression
                    ),
                    'operator token': context.consume_state(
                        "BinaryExpression['operator token']",
                        ($) => {
                            switch ($.kind) {
                                case "AmpersandAmpersandEqualsToken": return ['&&=', null]
                                case "AmpersandAmpersandToken": return ['&&', null]
                                case "AmpersandEqualsToken": return ['&=', null]
                                case "AmpersandToken": return ['&', null]
                                case "AsteriskAsteriskEqualsToken": return ['**=', null]
                                case "AsteriskAsteriskToken": return ['**', null]
                                case "AsteriskEqualsToken": return ['*=', null]
                                case "AsteriskToken": return ['*', null]
                                case "BarBarEqualsToken": return ['||=', null]
                                case "BarBarToken": return ['||', null]
                                case "BarEqualsToken": return ['|=', null]
                                case "BarToken": return ['|', null]
                                case "CaretEqualsToken": return ['^=', null]
                                case "CaretToken": return ['^', null]
                                case "EqualsEqualsEqualsToken": return ['===', null]
                                case "EqualsEqualsToken": return ['==', null]
                                case "EqualsToken": return ['=', null]
                                case "ExclamationEqualsEqualsToken": return ['!==', null]
                                case "ExclamationEqualsToken": return ['!=', null]
                                case "GreaterThanEqualsToken": return ['>=', null]
                                case "GreaterThanGreaterThanEqualsToken": return ['>>=', null]
                                case "GreaterThanGreaterThanGreaterThanEqualsToken": return ['>>>=', null]
                                case "GreaterThanGreaterThanGreaterThanToken": return ['>>>', null]
                                case "GreaterThanGreaterThanToken": return ['>>', null]
                                case "GreaterThanToken": return ['>', null]
                                case "InKeyword": return ['in', null]
                                case "InstanceOfKeyword": return ['instanceof', null]
                                case "LessThanEqualsToken": return ['<=', null]
                                case "LessThanLessThanEqualsToken": return ['<<=', null]
                                case "LessThanLessThanToken": return ['<<', null]
                                case "LessThanToken": return ['<', null]
                                case "MinusEqualsToken": return ['-=', null]
                                case "MinusToken": return ['-', null]
                                case "PercentToken": return ['%', null]
                                case "PlusEqualsToken": return ['+=', null]
                                case "PlusToken": return ['+', null]
                                case "QuestionQuestionEqualsToken": return ['??=', null]
                                case "QuestionQuestionToken": return ['??', null]
                                case "SlashEqualsToken": return ['/=', null]
                                case "SlashToken": return ['/', null]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Expression",
                                    'internal path description': "BinaryExpression['operator token']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    ),
                    'right': context.consume_component(
                        "BinaryExpression['right']",
                        Expression
                    )
                })
            )]
            case "CallExpression": return ['call', context.parse_children(
                "CallExpression",
                (context): d_out.Expression__Call => ({
                    'callee': context.consume_state(
                        "'callee'",
                        ($, context) => {
                            switch ($.kind) {
                                case "ImportKeyword": return ['import', null]
                                default: return ['expression', context.call_with_this_node(
                                    "CallExpression['callee']",
                                    Expression
                                )]
                            }
                        }
                    ),
                    'type arguments': context.construct_component(
                        "CallExpression['type arguments']",
                        Type_Arguments
                    ),
                    'arguments': { //FIX extract into a function, because this is the same as in NewExpression

                        'open parenthesis token': context.consume_keyword(
                            "CallExpression['open parenthesis token']",
                            "OpenParenToken"
                        ),
                        'arguments': context.consume_syntax_list(
                            "CallExpression['arguments']",
                            ($, context) => {
                                switch ($.kind) {
                                    case "CommaToken": return ['comma token', null]
                                    case "SpreadElement": return ['spread', context.parse_children(
                                        "SpreadElement",
                                        (context) => ({
                                            'dot dot dot token': context.consume_keyword(
                                                "SpreadElement['dot dot dot token']",
                                                "DotDotDotToken",
                                            ),
                                            'expression': context.consume_component(
                                                "SpreadElement['expression']",
                                                Expression
                                            )
                                        })
                                    )]
                                    default: return ['expression', context.call_with_this_node(
                                        "CallExpression['arguments']",
                                        Expression
                                    )]
                                }
                            }
                        ),
                        'close parenthesis token': context.consume_keyword(
                            "CallExpression['close parenthesis token']",
                            "CloseParenToken"
                        ),
                    }
                })
            )]
            case "ClassExpression": return ['class expression', context.parse_children(
                "ClassExpression",
                (context) => ({
                    'class keyword': context.consume_keyword(
                        "ClassExpression['class keyword']",
                        "ClassKeyword"
                    ),
                    'identifier': context.consume_component(
                        "ClassExpression['identifier']",
                        Identifier
                    ),
                    'body': context.construct_component(
                        "ClassExpression['body']",
                        Class_Body
                    )
                })
            )]
            case "ConditionalExpression": return ['conditional', context.parse_children(
                "ConditionalExpression",
                (context): d_out.Expression__Conditional => ({
                    'condition': context.consume_component(
                        "ConditionalExpression['condition']",
                        Expression
                    ),
                    'question token': context.consume_keyword(
                        "ConditionalExpression['question token']",
                        "QuestionToken"
                    ),
                    'when true': context.consume_component(
                        "ConditionalExpression['when true']",
                        Expression
                    ),
                    'colon token': context.consume_keyword(
                        "ConditionalExpression['colon token']",
                        "ColonToken"
                    ),
                    'when false': context.consume_component(
                        "ConditionalExpression['when false']",
                        Expression
                    )
                })
            )]
            case "DeleteExpression": return ['delete', context.parse_children(
                "DeleteExpression",
                (context) => ({
                    'delete keyword': context.consume_keyword(
                        "DeleteExpression['delete keyword']",
                        "DeleteKeyword"
                    ),
                    'expression': context.consume_component(
                        "DeleteExpression['expression']",
                        Expression
                    )
                })
            )]
            case "ElementAccessExpression": return ['element access', context.parse_children(
                "ElementAccessExpression",
                (context) => ({
                    'expression': context.consume_component(
                        "ElementAccessExpression['expression']",
                        Expression
                    ),
                    'open bracket token': context.consume_keyword(
                        "ElementAccessExpression['open bracket token']",
                        "OpenBracketToken",
                    ),
                    'argument expression': context.consume_component(
                        "ElementAccessExpression['argument expression']",
                        Expression
                    ),
                    'close bracket token': context.consume_keyword(
                        "ElementAccessExpression['close bracket token']",
                        "CloseBracketToken",
                    ),
                })
            )]
            case "ExpressionWithTypeArguments": return ['with type arguments', context.parse_children(
                "ExpressionWithTypeArguments",
                (context) => ({
                    'expression': context.consume_component(
                        "ExpressionWithTypeArguments['expression']",
                        Expression
                    ),
                    'type arguments': context.construct_component(
                        "ExpressionWithTypeArguments['type arguments']",
                        Type_Arguments
                    )
                })
            )]
            case "ExternalModuleReference": return ['external module reference', context.parse_children(
                "ExternalModuleReference",
                (context) => ({
                    'require keyword': context.consume_keyword(
                        "ExternalModuleReference['require keyword']",
                        "RequireKeyword",
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "ExternalModuleReference['open parenthesis token']",
                        "OpenParenToken",
                    ),
                    'module name': context.consume_literal(
                        "ExternalModuleReference['module name']",
                        "StringLiteral",
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "ExternalModuleReference['close parenthesis token']",
                        "CloseParenToken",
                    ),
                })
            )]
            case "FalseKeyword": return ['false', null]
            case "FunctionExpression": return ['function', context.parse_children(
                "FunctionExpression",
                (context) => ({
                    'function keyword': context.consume_keyword(
                        "FunctionExpression['function keyword']",
                        "FunctionKeyword",
                    ),
                    'parameters': context.construct_component(
                        "FunctionExpression['parameters']",
                        Parameters
                    ),
                    'body': context.consume_component(
                        "FunctionExpression['body']",
                        Block
                    )
                })
            )]
            case "Identifier": return ['identifier', $]
            case "ObjectLiteralExpression": return ['object literal', context.parse_children(
                "ObjectLiteralExpression",
                (context): d_out.Expression__Object_Literal => ({
                    'open brace token': context.consume_keyword(
                        "ObjectLiteralExpression['open brace token']",
                        "OpenBraceToken",
                    ),
                    'properties': context.consume_syntax_list(
                        "ObjectLiteralExpression['properties']",
                        ($, context): d_out.Expression__Object_Literal__Property => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                case "MethodDeclaration": return ['method', null]
                                case "PropertyAssignment": return ['property assignment', context.parse_children(
                                    "PropertyAssignment",
                                    (context) => ({
                                        'jsdoc': context.construct_component(
                                            "PropertyAssignment['jsdoc']",
                                            JSDoc
                                        ),
                                        'name': context.consume_component(
                                            "PropertyAssignment['name']",
                                            Property_Name
                                        ),
                                        'colon token': context.consume_keyword(
                                            "PropertyAssignment['colon token']",
                                            "ColonToken",
                                        ),
                                        'initializer': context.consume_component(
                                            "PropertyAssignment['initializer']",
                                            Expression
                                        )
                                    })
                                )]
                                case "ShorthandPropertyAssignment": return ['shorthand property assignment', context.parse_children(
                                    "ShorthandPropertyAssignment",
                                    (context) => ({
                                        // 'jsdoc': context.call(
                                        //     "ShorthandPropertyAssignment['jsdoc']",
                                        //     JSDoc
                                        // ),
                                        'name': context.consume_component(
                                            "ShorthandPropertyAssignment['name']",
                                            Property_Name
                                        ),
                                    })
                                )]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Expression",
                                    'internal path description': "ObjectLiteralExpression['properties']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    ),
                    'close brace token': context.consume_keyword(
                        "ObjectLiteralExpression['close brace token']",
                        "CloseBraceToken",
                    ),
                })
            )]
            case "NewExpression": return ['new', context.parse_children(
                "NewExpression",
                (context) => ({
                    'new keyword': context.consume_keyword(
                        "NewExpression['new keyword']",
                        "NewKeyword"
                    ),
                    'expression': context.consume_component(
                        "NewExpression['expression']",
                        Expression
                    ),
                    'type arguments': context.construct_component(
                        "NewExpression['type arguments']",
                        Type_Arguments
                    ),
                    'arguments': { //FIX extract into a function, because this is the same as in CallExpression

                        'open parenthesis token': context.consume_keyword(
                            "NewExpression['open parenthesis token']",
                            "OpenParenToken"
                        ),
                        'arguments': context.consume_syntax_list(
                            "NewExpression['arguments']",
                            ($, context) => {
                                switch ($.kind) {
                                    case "CommaToken": return ['comma token', null]
                                    case "SpreadElement": return ['spread', context.parse_children(
                                        "SpreadElement",
                                        (context) => ({
                                            'dot dot dot token': context.consume_keyword(
                                                "SpreadElement['dot dot dot token']",
                                                "DotDotDotToken",
                                            ),
                                            'expression': context.consume_component(
                                                "SpreadElement['expression']",
                                                Expression
                                            )
                                        })
                                    )]
                                    default: return ['expression', context.call_with_this_node(
                                        "NewExpression['arguments']",
                                        Expression
                                    )]
                                }
                            },
                        ),
                        'close parenthesis token': context.consume_keyword(
                            "NewExpression['close parenthesis token']",
                            "CloseParenToken"
                        ),
                    }
                })
            )]
            case "NoSubstitutionTemplateLiteral": return ['no substitution template literal', $]
            case "NonNullExpression": return ['non null', context.parse_children(
                "NonNullExpression",
                (context) => ({
                    'expression': context.consume_component(
                        "NonNullExpression['expression']",
                        Expression
                    ),
                    'exclamation token': context.consume_keyword(
                        "NonNullExpression['exclamation token']",
                        "ExclamationToken",
                    )
                })
            )]
            case "NullKeyword": return ['null keyword', null]
            case "NumericLiteral": return ['numeric literal', $]
            case "ParenthesizedExpression": return ['parenthesized', context.parse_children(
                "ParenthesizedExpression",
                (context) => ({
                    'open parenthesis token': context.consume_keyword(
                        "ParenthesizedExpression['open parenthesis token']",
                        "OpenParenToken",
                    ),
                    'expression': context.consume_component(
                        "ParenthesizedExpression['expression']",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "ParenthesizedExpression['close parenthesis token']",
                        "CloseParenToken",
                    ),
                })
            )]
            case "PostfixUnaryExpression": return ['postfix unary', context.parse_children(
                "PostfixUnaryExpression",
                (context) => ({
                    'operand': context.consume_component(
                        "PostfixUnaryExpression['operand']",
                        Expression
                    ),
                    'operator token': context.consume_state(
                        "PostfixUnaryExpression['operator token']",
                        ($) => {
                            switch ($.kind) {
                                case "MinusMinusToken": return ['--', null]
                                case "PlusPlusToken": return ['++', null]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Expression",
                                    'internal path description': "PostfixUnaryExpression['operator token']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    )
                })
            )]
            case "PrefixUnaryExpression": return ['prefix unary', context.parse_children(
                "PrefixUnaryExpression",
                (context) => ({
                    'operator token': context.consume_state(
                        "PrefixUnaryExpression['operator token']",
                        ($) => {
                            switch ($.kind) {
                                case "ExclamationToken": return ['!', null]
                                case "MinusToken": return ['-', null]
                                case "PlusToken": return ['+', null]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Expression",
                                    'internal path description': "PrefixUnaryExpression['operator token']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    ),
                    'operand': context.consume_component(
                        "PrefixUnaryExpression['operand']",
                        Expression
                    )
                })
            )]
            case "PropertyAccessExpression": return ['property access', context.parse_children(
                "PropertyAccessExpression",
                (context): d_out.Expression__Property_Access => ({
                    'expression': context.consume_component(
                        "PropertyAccessExpression['expression']",
                        Expression
                    ),
                    'dot token': context.consume_keyword(
                        "PropertyAccessExpression['dot token']",
                        "DotToken",
                    ),
                    'name': context.consume_literal(
                        "PropertyAccessExpression['name']",
                        "Identifier",
                    )
                })
            )]
            case "RegularExpressionLiteral": return ['regular expression literal', $]
            case "StringLiteral": return ['string literal', $]
            case "TemplateExpression": return ['template', context.parse_children(
                "TemplateExpression",
                (context): d_out.Expression__Template => ({
                    'head': context.consume_literal(
                        "TemplateExpression['head']",
                        "TemplateHead",
                    ),
                    'template spans': context.consume_syntax_list(
                        "TemplateExpression['template spans']",
                        ($, context): d_out.Expression__Template_Span => {
                            switch ($.kind) {
                                case "TemplateSpan": return context.parse_children(
                                    "TemplateSpan",
                                    (context): d_out.Expression__Template_Span => ({
                                        'expression': context.consume_component(
                                            "TemplateSpan['expression']",
                                            Expression
                                        ),
                                        'suffix': context.consume_state(
                                            "TemplateSpan['template middle or tail']",
                                            ($) => {
                                                switch ($.kind) {
                                                    case "TemplateTail": return ['tail', $]
                                                    case "TemplateMiddle": return ['middle', $]
                                                    default: return abort({
                                                        'parent': $,
                                                        'external location description': $p['location description'],
                                                        'module name': "Expression",
                                                        'internal path description': "TemplateSpan['template middle or tail']",
                                                        'problem': ['unexpected node', $],
                                                    })
                                                }
                                            }
                                        )
                                    })
                                )
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Expression",
                                    'internal path description': "TemplateExpression['template spans']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    )
                })
            )]
            case "ThisKeyword": return ['this', null]
            case "TrueKeyword": return ['true keyword', null]
            case "TypeOfExpression": return ['type of', context.parse_children(
                "TypeOfExpression",
                (context) => ({
                    'type of keyword': context.consume_keyword(
                        "TypeOfExpression['type of keyword']",
                        "TypeOfKeyword",
                    ),
                    'expression': context.consume_component(
                        "TypeOfExpression['expression']",
                        Expression
                    ),
                })
            )]
            case "VoidExpression": return ['void', context.parse_children(
                "VoidExpression",
                (context) => ({
                    'void keyword': context.consume_keyword(
                        "VoidExpression['void keyword']",
                        "VoidKeyword",
                    ),
                    'expression': context.consume_component(
                        "VoidExpression['expression']",
                        Expression
                    ),
                })
            )]
            default: return abort({
                'parent': $,
                'external location description': $p['location description'],
                'module name': "Expression",
                'internal path description': "-",
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Identifier: h.Refiner<d_out.Identifier> = ($, abort, $p) => $.kind !== "Identifier"
    ? abort({
        'parent': $,
        'external location description': $p['location description'],
        'module name': "Identifier",
        'internal path description': "-",
        'problem': ['unexpected node', $],
    })
    : $

export const Initializer: h.Production<d_out.Initializer> = ($, abort, $p) => h.create_iterator_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Initializer",
    },
    (context): d_out.Initializer => ({
        'equals token': context.consume_keyword(
            "'equals token'",
            "EqualsToken",
        ),
        'expression': context.consume_component(
            "'expression'",
            Expression
        )
    })
)

export const JSDoc: h.Production<d_out.JSDoc> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "JSDoc",
    },
    (context) => context.optional(
        ($) => $.kind === "JSDoc",
        (context) => context.consume_literal(
            $p['location description'],
            "JSDoc",
        )
    )
)

export const Object_Type: h.Production<d_out.Object_Type> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Object_Type",
    },
    (context): d_out.Object_Type => ({
        'open brace token': context.consume_keyword(
            "'open brace token'",
            "OpenBraceToken"
        ),
        'members': context.consume_syntax_list(
            "TypeLiteral['members']",
            ($, context): d_out.Object_Type__Element => {
                switch ($.kind) {
                    case "CallSignature": return ['call signature', context.parse_children(
                        "CallSignature",
                        (context): d_out.Object_Type__Element__Call_Signature => ({
                            'jsdoc': context.construct_component(
                                "'jsdoc'",
                                JSDoc
                            ),
                            'parameters': context.construct_component(
                                "'parameters'",
                                Parameters
                            ),
                            'type': context.construct_component(
                                "'type'",
                                Optional_Type
                            ),
                            'semicolon': context.construct_component(
                                "'semicolon token'",
                                Semi_Colon
                            ),

                        })
                    )]
                    case "ConstructSignature": return ['construct signature', context.parse_children(
                        "ConstructSignature",
                        (context): d_out.Object_Type__Element__Construct_Signature => ({
                            'jsdoc': context.construct_component(
                                "'jsdoc'",
                                JSDoc
                            ),
                            'new keyword': context.consume_keyword(
                                "'new keyword'",
                                "NewKeyword"
                            ),
                            'parameters': context.construct_component(
                                "'parameters'",
                                Parameters
                            ),
                            // 'type': context.construct_component(
                            //     "'type'",
                            //     Optional_Type
                            // ),
                            'semicolon': context.construct_component(
                                "'semicolon token'",
                                Semi_Colon
                            ),
                        })
                    )]
                    case "IndexSignature": return ['index signature', context.parse_children(
                        "IndexSignature",
                        (context): d_out.Object_Type__Element__Index_Signature => ({
                            'jsdoc': context.construct_component(
                                "IndexSignature['jsdoc']",
                                JSDoc
                            ),
                            'modifiers': context.construct_component(
                                "IndexSignature['modifiers']",
                                Modifiers
                            ),
                            'open bracket token': context.consume_keyword(
                                "IndexSignature['open bracket token']",
                                "OpenBracketToken"
                            ),
                            'parameter': context.consume_group(
                                "IndexSignature['parameter']",
                                "SyntaxList",
                                ($, context) => context.parse_children(
                                    "Parameter",
                                    (context) => context.consume_group(
                                        "Parameter",
                                        "Parameter",
                                        ($, context): d_out.Object_Type__Element__Index_Signature['parameter'] => context.parse_children(
                                            "Parameter",
                                            (context): d_out.Object_Type__Element__Index_Signature['parameter'] => ({
                                                'identifier': context.consume_literal(
                                                    "Parameter['identifier']",
                                                    "Identifier"
                                                ),
                                                'colon token': context.consume_keyword(
                                                    "Parameter['colon token']",
                                                    "ColonToken"
                                                ),
                                                'type': context.consume_component(
                                                    "Parameter['type']",
                                                    Type
                                                )
                                            })
                                        )
                                    )
                                )
                            ),
                            'close bracket token': context.consume_keyword(
                                "IndexSignature['close bracket token']",
                                "CloseBracketToken"
                            ),
                            'colon token': context.consume_keyword(
                                "IndexSignature['colon token']",
                                "ColonToken"
                            ),
                            'type': context.consume_component(
                                "IndexSignature['type']",
                                Type
                            ),
                            'semicolon': context.construct_component(
                                "IndexSignature['semicolon token']",
                                Semi_Colon
                            ),
                        })
                    )]
                    case "MethodSignature": return ['method signature', $]
                    case "PropertySignature": return ['property signature', context.parse_children(
                        "PropertySignature",
                        (context): d_out.Object_Type__Element__Property_Signature => ({
                            'jsdoc': context.construct_component(
                                "PropertyAssignment['jsdoc']",
                                JSDoc
                            ),
                            'modifiers': context.construct_component(
                                "PropertySignature['modifiers']",
                                Modifiers
                            ),
                            'id': context.consume_component(
                                "PropertySignature['id']",
                                Property_Name
                            ),
                            'question token': context.optional(
                                ($) => $.kind === "QuestionToken",
                                (context) => context.consume_keyword(
                                    "PropertySignature['question token']",
                                    "QuestionToken"
                                )
                            ),
                            'colon token': context.consume_keyword(
                                "PropertySignature['colon token']",
                                "ColonToken"
                            ),
                            'type': context.consume_component(
                                "PropertySignature['type']",
                                Type
                            ),
                            'comma token': context.optional(
                                ($) => $.kind === "CommaToken",
                                (context) => context.consume_keyword(
                                    "PropertySignature['comma token']",
                                    "CommaToken"
                                )
                            ),
                            'semicolon token': context.optional(
                                ($) => $.kind === "SemicolonToken",
                                (context) => context.consume_keyword(
                                    "PropertySignature['semicolon token']",
                                    "SemicolonToken"
                                )
                            ),
                        })
                    )]
                    default: return context.abort("a type literal member")
                }
            }
        ),
        'close brace token': context.consume_keyword(
            "TypeLiteral['close brace token']",
            "CloseBraceToken"
        ),
    })
)

export const Modifiers: h.Production<d_out.Modifiers> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Modifiers",
    },
    (context) => context.optional(
        ($) => $.kind === "SyntaxList",
        (context) => context.consume_component( //I'm misusing the 'consume_component' here, it's not really a component. I'm not sure how to do it differently for now (consume_syntax_list?)
            "Modifiers",
            ($, abort, $p) => h.create_node_context(
                $,
                abort,
                {
                    'location description': $p['location description'],
                    'parent': $p.parent,
                    'module name': "Modifiers",
                },
                (context) => context.process_children_as_list(
                    "Modifiers",
                    ($): d_out.Modifier => {
                        switch ($.kind) {
                            case "AsyncKeyword": return ['async', null]
                            case "DeclareKeyword": return ['declare', null]
                            case "DefaultKeyword": return ['default', null]
                            case "ExportKeyword": return ['export', null]
                            case "ReadonlyKeyword": return ['readonly', null]
                            default: return abort({
                                'parent': $p.parent,
                                'external location description': $p['location description'],
                                'module name': "Modifiers",
                                'internal path description': "-",
                                'problem': ['unexpected node', $],
                            })
                        }
                    },
                )
            )
        )
    )
)

export const Optional_Initializer: h.Production<d_out.Optional_Initializer> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Optional_Initializer",
    },
    (context): d_out.Optional_Initializer => context.optional(
        ($) => $.kind === "EqualsToken",
        (context) => ({
            'equals token': context.consume_keyword(
                "Optional_Initializer['equals token']",
                "EqualsToken",
            ),
            'expression': context.consume_component(
                "Optional_Initializer['expression']",
                Expression
            )
        })
    )
)

export const Optional_Type: h.Production<d_out.Optional_Type> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Optional_Type",
    },
    (context): d_out.Optional_Type => context.optional(
        ($) => $.kind === "ColonToken",
        (context) => ({
            'colon token': context.consume_keyword(
                "Optional_Type['colon token']",
                "ColonToken",
            ),
            'type': context.consume_component(
                "Optional_Type['type']",
                Type
            )
        })
    )
)

export const Return_Type_Annotation: h.Production<d_out.Return_Type_Annotation> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Return_Type_Annotation",
    },
    (context) => context.optional(
        ($) => $.kind === "ColonToken",
        (context) => ({
            'colon token': context.consume_keyword(
                "'colon token'",
                "ColonToken",
            ),
            'kind': context.peek_for_state(
                "'kind'",
                ($) => {
                    switch ($.kind) {
                        case "TypePredicate": return ['type predicate', context.consume_group(
                            "Return_Type_Annotation['kind']",
                            "TypePredicate",
                            ($, context) => context.parse_children(
                                "TypePredicate",
                                (context) => ({
                                    'identifier': context.consume_component(
                                        "TypePredicate['identifier']",
                                        Identifier
                                    ),
                                    'is keyword': context.consume_keyword(
                                        "TypePredicate['is keyword']",
                                        "IsKeyword",
                                    ),
                                    'type': context.consume_component(
                                        "TypePredicate['type']",
                                        Type
                                    )
                                })
                            )
                        )]
                        default: return ['type', context.consume_component(
                            "Return_Type_Annotation['kind']",
                            Type
                        )]
                    }
                }
            )
        })
    )
)

export const Parameters: h.Production<d_out.Parameters> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Parameters",
    },
    (context): d_out.Parameters => ({
        'open parenthesis token': context.consume_keyword(
            "Parameters['open parenthesis token']",
            "OpenParenToken",
        ),
        'entries': context.consume_syntax_list(
            "Parameters['entries']",
            ($, context) => {
                switch ($.kind) {
                    case "CommaToken": return ['comma token', null]
                    case "Parameter": return ['parameter', context.parse_children(
                        "Parameter",
                        (context): d_out.Parameters__Parameter => ({
                            'jsdoc': context.construct_component(
                                "Parameter['jsdoc']",
                                JSDoc
                            ),
                            'dot dot dot token': context.optional(
                                ($) => $.kind === "DotDotDotToken",
                                (context) => context.consume_keyword(
                                    "Parameter['dot dot dot token']",
                                    "DotDotDotToken",
                                )
                            ),
                            'name': context.consume_component(
                                "Parameter['name']",
                                Binding_Pattern
                            ),
                            'question token': context.optional(
                                ($) => $.kind === "QuestionToken",
                                (context) => context.consume_keyword(
                                    "Parameter['question token']",
                                    "QuestionToken",
                                )
                            ),
                            'type': context.construct_component(
                                "Parameter['type']",
                                Optional_Type
                            ),
                            'initializer': context.construct_component(
                                "Parameter['initializer']",
                                Optional_Initializer
                            )
                        })
                    )]
                    default: return abort({
                        'parent': $,
                        'external location description': $p['location description'] + ">Parameters_Entry",
                        'module name': "Parameters",
                        'internal path description': "-",
                        'problem': ['unexpected node', $],
                    })
                }
            }
        ),
        'close parenthesis token': context.consume_keyword(
            "Parameters['close parenthesis token']",
            "CloseParenToken",
        ),
    })

)

export const Property_Name: h.Refiner<d_out.Property_Name> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Property_Name",
    },
    (context): d_out.Property_Name => {
        switch ($.kind) {
            case "Identifier": return ['identifier', context.call_with_this_node(
                "Identifier",
                Identifier,
            )]
            case "NumericLiteral": return ['numeric literal', $]
            case "StringLiteral": return ['string literal', $]
            default: return abort({
                'parent': $,
                'external location description': $p['location description'],
                'module name': "Property_Name",
                'internal path description': "-",
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Qualified_Name: h.Refiner<d_out.Qualified_Name> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "QualifiedName",
    },
    (context) => context.parse_children(
        "QualifiedName",
        (context): d_out.Qualified_Name => ({
            'first': context.consume_component(
                "QualifiedName['first']",
                Entity_Name
            ),
            'dot token': context.consume_keyword(
                "QualifiedName['dot token']",
                "DotToken",
            ),
            'second': context.consume_component(
                "QualifiedName['second']",
                Identifier
            )
        })
    )
)

export const Semi_Colon: h.Production<d_out.Semi_Colon> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Semi_Colon",
    },
    (context) => context.optional(
        ($) => $.kind === "SemicolonToken",
        (context) => context.consume_keyword(
            $p['location description'],
            "SemicolonToken"
        )
    )
)

export const Source_File: h.Refiner<d_out.Source_File> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Source_File",
    },
    (context): d_out.Source_File => context.assert_kind(
        "Source_File",
        "SourceFile",
        ($, context): d_out.Source_File => context.parse_children(
            "SourceFile",
            (context) => {
                return {
                    'statements': context.consume_component(
                        "SourceFile['statements']",
                        Statements
                    ),
                    'end of file': context.consume_keyword(
                        "SourceFile['end of file']",
                        "EndOfFileToken",
                    ),
                }
            }
        )
    )
)

export const Statement: h.Refiner<d_out.Statement> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Statement",
    },
    (context): d_out.Statement => {
        switch ($.kind) {
            case "Block": return ['block', context.call_with_this_node(
                "Block",
                Block,
            )]
            case "ClassDeclaration": return ['class', $]
            case "BreakStatement": return ['break', context.parse_children(
                "BreakStatement",
                (context) => ({
                    'break keyword': context.consume_keyword(
                        "BreakStatement['break keyword']",
                        "BreakKeyword",
                    ),
                    'identifier': context.optional(
                        ($) => $.kind === "Identifier",
                        (context) => context.consume_literal(
                            "BreakStatement['identifier']",
                            "Identifier"
                        )
                    ),
                    'semicolon': context.construct_component(
                        "BreakStatement['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "DoStatement": return ['do', context.parse_children(
                "DoStatement",
                (context) => ({
                    'do keyword': context.consume_keyword(
                        "DoStatement['do keyword']",
                        "DoKeyword",
                    ),
                    'statement': context.consume_component(
                        "DoStatement['statement']",
                        Statement
                    ),
                    'while keyword': context.consume_keyword(
                        "DoStatement['while keyword']",
                        "WhileKeyword",
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "DoStatement['open parenthesis token']",
                        "OpenParenToken",
                    ),
                    'expression': context.consume_component(
                        "DoStatement['expression']",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "DoStatement['close parenthesis token']",
                        "CloseParenToken",
                    ),
                    'semicolon': context.construct_component(
                        "DoStatement['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "EnumDeclaration": return ['enum', context.parse_children(
                "EnumDeclaration",
                (context): d_out.Statement__Enum_Declaration => ({
                    'jsdoc': context.construct_component(
                        "EnumDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'modifiers': context.optional(
                        ($) => $.kind === "SyntaxList",
                        (context) => context.consume_component( //I'm misusing the 'consume_component' here, it's not really a component. I'm not sure how to do it differently for now (consume_syntax_list?)
                            "Modifiers",
                            ($, abort, $p) => h.create_node_context(
                                $,
                                abort,
                                {
                                    'location description': $p['location description'],
                                    'parent': $p.parent,
                                    'module name': "Modifiers",
                                },
                                (context) => context.process_children_as_list(
                                    "Modifiers",
                                    ($) => {
                                        switch ($.kind) {
                                            case "ConstKeyword": return ['const', null]
                                            case "DeclareKeyword": return ['declare', null]
                                            case "DefaultKeyword": return ['default', null]
                                            case "ExportKeyword": return ['export', null]
                                            default: return abort({
                                                'parent': $p.parent,
                                                'external location description': $p['location description'],
                                                'module name': "Modifiers",
                                                'internal path description': "-",
                                                'problem': ['unexpected node', $],
                                            })
                                        }
                                    },
                                )
                            )
                        )
                    ),
                    'enum keyword': context.consume_keyword(
                        "EnumDeclaration['enum keyword']",
                        "EnumKeyword"
                    ),
                    'identifier': context.consume_literal(
                        "EnumDeclaration['identifier']",
                        "Identifier"
                    ),
                    'open brace token': context.consume_keyword(
                        "EnumDeclaration['open brace token']",
                        "OpenBraceToken"
                    ),
                    'members': context.consume_syntax_list(
                        "EnumDeclaration['members']",
                        ($, context) => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                case "EnumMember": return ['enum member', context.parse_children(
                                    "EnumMember",
                                    (context): d_out.Statement__Enum_Declaration__Member => ({
                                        'jsdoc': context.construct_component(
                                            "EnumMember['jsdoc']",
                                            JSDoc
                                        ),
                                        'identifier': context.consume_literal(
                                            "EnumMember['identifier']",
                                            "Identifier"
                                        ),
                                        // 'initializer': context.construct_component(
                                        //     "EnumMember['initializer']",
                                        //     Optional_Initializer
                                        // )
                                    })
                                )]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Statement",
                                    'internal path description': "EnumDeclaration['members']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    ),
                    'close brace token': context.consume_keyword(
                        "EnumDeclaration['close brace token']",
                        "CloseBraceToken"
                    ),
                    'semicolon': context.construct_component(
                        "EnumDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ExportAssignment": return ['export assignment', context.parse_children(
                "ExportAssignment",
                (context) => ({
                    'jsdoc': context.construct_component(
                        "ExportAssignment['jsdoc']",
                        JSDoc
                    ),
                    'export keyword': context.consume_keyword(
                        "ExportAssignment['export keyword']",
                        "ExportKeyword"
                    ),
                    'initializer': context.construct_component(
                        "ExportAssignment['initializer']",
                        Initializer
                    ),
                    'semicolon': context.construct_component(
                        "ExportAssignment['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ExportDeclaration": return ['export declaration', context.parse_children(
                "ExportDeclaration",
                (context): d_out.Statement__Export_Declaration => ({
                    'jsdoc': context.construct_component(
                        "ExportDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'export keyword': context.consume_keyword(
                        "ExportDeclaration['export keyword']",
                        "ExportKeyword",
                    ),
                    'type': context.peek_for_state(
                        "ExportDeclaration['type']",
                        ($): d_out.Statement__Export_Declaration['type'] => {
                            switch ($.kind) {
                                case "AsteriskToken": return ['all', {
                                    'asterisk token': context.consume_keyword(
                                        "ExportDeclaration['type']['all']['asterisk token']",
                                        "AsteriskToken",
                                    ),
                                    'as': context.optional(
                                        ($) => $.kind === "AsKeyword",
                                        (context) => ({
                                            'as keyword': context.consume_keyword(
                                                "ExportDeclaration['type']['all']['alias']['as keyword']",
                                                "AsKeyword"
                                            ),
                                            'identifier': context.consume_literal(
                                                "ExportDeclaration['type']['all']['alias']['identifier']",
                                                "Identifier",
                                            )
                                        })
                                    )
                                }]
                                case "NamedExports": return ['named', context.consume_group(
                                    "ExportDeclaration['type']['named']",
                                    "NamedExports",
                                    ($, context) => context.parse_children(
                                        "NamedExports",
                                        (context) => ({
                                            'open brace token': context.consume_keyword(
                                                "NamedExports['open brace token']",
                                                "OpenBraceToken",
                                            ),
                                            'exports': context.consume_syntax_list(
                                                "NamedExports['exports']",
                                                ($, context): d_out.Statement__Export_Declaration_Entry => {
                                                    switch ($.kind) {
                                                        case "CommaToken": return ['comma token', null]
                                                        case "ExportSpecifier": return ['export specifier', context.parse_children(
                                                            "ExportSpecifier",
                                                            (context) => ({
                                                                'identifier': context.consume_literal(
                                                                    "ExportSpecifier['identifier']",
                                                                    "Identifier",
                                                                ),
                                                                'as': context.optional(
                                                                    ($) => $.kind === "AsKeyword",
                                                                    (context) => ({
                                                                        'as keyword': context.consume_keyword(
                                                                            "ExportSpecifier['as']['as keyword']",
                                                                            "AsKeyword"
                                                                        ),
                                                                        'identifier': context.consume_literal(
                                                                            "ExportSpecifier['as']['identifier']",
                                                                            "Identifier",
                                                                        )
                                                                    })
                                                                )
                                                            })
                                                        )]
                                                        default: return abort({
                                                            'parent': $,
                                                            'external location description': $p['location description'],
                                                            'module name': "Statement",
                                                            'internal path description': "ExportDeclaration['type']['named']>NamedExports['exports']",
                                                            'problem': ['unexpected node', $],
                                                        })
                                                    }
                                                }
                                            ),
                                            'close brace token': context.consume_keyword(
                                                "NamedExports['close brace token']",
                                                "CloseBraceToken"
                                            ),
                                        })
                                    )
                                )]
                                case "NamespaceExport": return ['namespace', context.consume_group(
                                    "ExportDeclaration['type']['namespace']",
                                    "NamespaceExport",
                                    ($, context) => context.parse_children(
                                        "NamespaceExport",
                                        (context) => ({
                                            'asterisk token': context.consume_keyword(
                                                "NamespaceExport['asterisk token']",
                                                "AsteriskToken",
                                            ),
                                            'as keyword': context.consume_keyword(
                                                "NamespaceExport['as keyword']",
                                                "AsKeyword"
                                            ),
                                            'identifier': context.consume_literal(
                                                "NamespaceExport['identifier']",
                                                "Identifier",
                                            )
                                        })
                                    )
                                )]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Statement",
                                    'internal path description': "ExportDeclaration['type']",
                                    'problem': ['unexpected node', $],
                                })
                            }

                        }
                    ),
                    'from clause': context.optional(
                        ($) => $.kind === "FromKeyword",
                        (context) => ({
                            'from keyword': context.consume_keyword(
                                "ExportDeclaration['from clause']['from keyword']",
                                "FromKeyword"
                            ),
                            'string literal': context.consume_literal(
                                "ExportDeclaration['from clause']['string literal']",
                                "StringLiteral"
                            )
                        })
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ExpressionStatement": return ['expression', context.parse_children(
                "ExpressionStatement",
                (context) => ({
                    'expression': context.consume_component(
                        "ExpressionStatement['expression']",
                        Expression
                    ),
                    'semicolon': context.construct_component(
                        "ExpressionStatement['semicolon token']",
                        Semi_Colon
                    )
                })
            )]
            case "ForStatement": return ['for', context.parse_children(
                "ForStatement",
                (context): d_out.Statement__For => ({
                    'jsdoc': context.construct_component(
                        "ForStatement['jsdoc']",
                        JSDoc
                    ),
                    'for keyword': context.consume_keyword(
                        "ForStatement['for keyword']",
                        "ForKeyword"
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "ForStatement['open parenthesis token']",
                        "OpenParenToken"
                    ),
                    'initializer': context.consume_state(
                        "ForStatement['initializer']",
                        ($, context) => {
                            switch ($.kind) {
                                case "VariableDeclarationList": return ['variable declaration list', context.call_with_this_node(
                                    "ForStatement['initializer']['variable declaration list']",
                                    Variable_Declaration_List
                                )]
                                default: return ['expression', context.call_with_this_node(
                                    "ForStatement['initializer']['expression']",
                                    Expression
                                )]
                            }
                        }
                    ),
                    'semicolon token': context.consume_keyword(
                        "ForStatement['semicolon token']",
                        "SemicolonToken"
                    ),
                    'condition': context.optional(
                        ($) => $.kind !== "SemicolonToken",
                        (context) => context.consume_component(
                            "ForStatement['condition']['expression']",
                            Expression
                        )
                    ),
                    'semicolon token 2': context.consume_keyword(
                        "ForStatement['semicolon token 2']",
                        "SemicolonToken"
                    ),
                    'incrementor': context.optional(
                        ($) => $.kind !== "CloseParenToken",
                        (context) => context.consume_component(
                            "ForStatement['incrementor']['expression']",
                            Expression
                        )
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "ForStatement['close parenthesis token']",
                        "CloseParenToken"
                    ),
                    'statement': context.consume_component(
                        "ForStatement['statement']",
                        Statement
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ForInStatement": return ['for in', context.parse_children(
                "ForInStatement",
                (context) => ({
                    'for keyword': context.consume_keyword(
                        "ForInStatement['for keyword']",
                        "ForKeyword"
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "ForInStatement['open parenthesis token']",
                        "OpenParenToken"
                    ),
                    'variable declaration list': context.consume_component(
                        "ForInStatement['variable declaration list']",
                        Variable_Declaration_List
                    ),
                    'in keyword': context.consume_keyword(
                        "ForInStatement['in keyword']",
                        "InKeyword"
                    ),
                    'expression': context.consume_component(
                        "ForInStatement['expression']",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "ForInStatement['close parenthesis token']",
                        "CloseParenToken"
                    ),
                    'statement': context.consume_component(
                        "ForInStatement['statement']",
                        Statement
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ForOfStatement": return ['for of', context.parse_children(
                "ForOfStatement",
                (context): d_out.Statement__For_Of => ({
                    'for keyword': context.consume_keyword(
                        "ForOfStatement['for keyword']",
                        "ForKeyword"
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "ForOfStatement['open parenthesis token']",
                        "OpenParenToken"
                    ),
                    'variable declaration list': context.consume_component(
                        "ForOfStatement['variable declaration list']",

                        Variable_Declaration_List
                    ),
                    'of keyword': context.consume_keyword(
                        "ForOfStatement['of keyword']",
                        "OfKeyword"
                    ),
                    'expression': context.consume_component(
                        "ForOfStatement['expression']",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "ForOfStatement['close parenthesis token']",
                        "CloseParenToken"
                    ),
                    'statement': context.consume_component(
                        "ForOfStatement['statement']",
                        Statement
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "FunctionDeclaration": return ['function', context.parse_children(
                "FunctionDeclaration",
                (context): d_out.Statement__Function_Declaration => ({
                    'jsdoc': context.construct_component(
                        "ModuleDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'modifiers': context.construct_component(
                        "ModuleDeclaration['modifiers']",
                        Modifiers
                    ),
                    'function keyword': context.consume_keyword(
                        "FunctionDeclaration['function keyword']",
                        "FunctionKeyword",
                    ),
                    'identifier': context.consume_literal(
                        "FunctionDeclaration['identifier']",
                        "Identifier",
                    ),
                    'type parameters': context.construct_component(
                        "FunctionDeclaration['type parameters']",
                        Type_Parameters
                    ),
                    'parameters': context.construct_component(
                        "FunctionDeclaration['parameters']",
                        Parameters
                    ),
                    'return type annotation': context.construct_component(
                        "FunctionDeclaration['return type annotation']",
                        Return_Type_Annotation
                    ),
                    'body': context.optional(
                        ($) => $.kind === "Block",
                        (context) => context.consume_component(
                            "FunctionDeclaration['body']",
                            Block
                        )
                    ),
                    'semicolon': context.construct_component(
                        "FunctionDeclaration['semicolon']",
                        Semi_Colon
                    ),
                })
            )]


            case "IfStatement": return ['if', context.parse_children(
                "IfStatement",
                (context) => ({
                    'if keyword': context.consume_keyword(
                        "IfStatement['if keyword']",
                        "IfKeyword"
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "IfStatement['open parenthesis token']",
                        "OpenParenToken"
                    ),
                    'expression': context.consume_component(
                        "IfStatement['expression']",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "IfStatement['close parenthesis token']",
                        "CloseParenToken"
                    ),
                    'then statement': context.consume_component(
                        "IfStatement['then statement']",
                        Statement
                    ),
                    'else': context.optional(
                        ($) => $.kind === "ElseKeyword",
                        (context) => ({
                            'else keyword': context.consume_keyword(
                                "IfStatement['else']['else keyword']",
                                "ElseKeyword"
                            ),
                            'statement': context.consume_component(
                                "IfStatement['else']['statement']",
                                Statement
                            )
                        })
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ImportDeclaration": return ['import', context.parse_children(
                "ImportDeclaration",
                (context): d_out.Statement__Import_Declaration => ({
                    'jsdoc': context.construct_component(
                        "ImportDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'import keyword': context.consume_keyword(
                        "ImportDeclaration['import keyword']",
                        "ImportKeyword"
                    ),
                    'clause': context.consume_group(
                        "ImportDeclaration['clause']",
                        "ImportClause",
                        ($, context): d_out.Statement__Import_Declaration['clause'] => context.parse_children(
                            "ImportDeclaration['clause']",
                            (context): d_out.Statement__Import_Declaration['clause'] => {
                                return {
                                    'type': context.consume_state(
                                        "ImportClause['type']",
                                        ($, context) => {

                                            switch ($.kind) {
                                                case "Identifier": return ['identifier', $]
                                                case "NamedImports": return ['named imports', context.parse_children(
                                                    "NamedImports",
                                                    (context): d_out.Statement__Import__Named_Imports => ({
                                                        'open brace token': context.consume_keyword(
                                                            "NamedImports['open brace token']",
                                                            "OpenBraceToken"
                                                        ),
                                                        'entries': context.consume_syntax_list(
                                                            "NamedImports['entries']",
                                                            ($, context): d_out.Import_Specifier => {
                                                                switch ($.kind) {
                                                                    case "CommaToken": return ['comma token', null]
                                                                    case "ImportSpecifier": return ['import specifier', context.parse_children(
                                                                        "ImportSpecifier",
                                                                        (context) => ({
                                                                            'identifier': context.consume_literal(
                                                                                "ImportSpecifier['identifier']",
                                                                                "Identifier",
                                                                            ),
                                                                            'as': context.optional(
                                                                                ($) => $.kind === "AsKeyword",
                                                                                (context) => ({
                                                                                    'as keyword': context.consume_keyword(
                                                                                        "ImportSpecifier['as']['as keyword']",
                                                                                        "AsKeyword"
                                                                                    ),
                                                                                    'identifier': context.consume_literal(
                                                                                        "ImportSpecifier['as']['identifier']",
                                                                                        "Identifier"
                                                                                    )
                                                                                })
                                                                            )
                                                                        })
                                                                    )]
                                                                    default: return abort({
                                                                        'parent': $,
                                                                        'external location description': $p['location description'],
                                                                        'module name': "Statement",
                                                                        'internal path description': "ImportDeclaration['clause']>ImportClause['type']>NamedImports['entries']",
                                                                        'problem': ['unexpected node', $],
                                                                    })
                                                                }
                                                            }
                                                        ),
                                                        'close brace token': context.consume_keyword(
                                                            "NamedImports['close brace token']",
                                                            "CloseBraceToken",
                                                        )
                                                    })
                                                )]
                                                case "NamespaceImport": return ['namespace import', context.parse_children(
                                                    "NamespaceImport",
                                                    (context): d_out.Statement__Import__Namespace => ({
                                                        'asterisk token': context.consume_keyword(
                                                            "NamespaceImport['asterisk token']",
                                                            "AsteriskToken",
                                                        ),
                                                        'as keyword': context.consume_keyword(
                                                            "NamespaceImport['as keyword']",
                                                            "AsKeyword"
                                                        ),
                                                        'identifier': context.consume_literal(
                                                            "NamespaceImport['identifier']",
                                                            "Identifier"
                                                        )
                                                    })
                                                )]

                                                default: return abort({
                                                    'parent': $,
                                                    'external location description': $p['location description'],
                                                    'module name': "Statement",
                                                    'internal path description': "ImportClause['type']",
                                                    'problem': ['unexpected node', $],
                                                })
                                            }
                                        }
                                    ),
                                }
                            }
                        )
                    ),
                    'from keyword': context.consume_keyword(
                        "ImportDeclaration['from keyword']",
                        "FromKeyword"
                    ),
                    'string literal': context.consume_literal(
                        "ImportDeclaration['string literal']",
                        "StringLiteral",
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ImportEqualsDeclaration": return ['import equals', context.parse_children(
                "ImportsEqualsDeclaration",
                (context) => ({
                    'modifiers': context.construct_component(
                        "ImportsEqualsDeclaration['modifiers']",
                        Modifiers
                    ),
                    'import keyword': context.consume_keyword(
                        "ImportsEqualsDeclaration['import keyword']",
                        "ImportKeyword"
                    ),
                    'identifier': context.consume_literal(
                        "ImportsEqualsDeclaration['identifier']",
                        "Identifier"
                    ),
                    'initializer': context.construct_component(
                        "ImportsEqualsDeclaration['initializer']",
                        Initializer
                    ),
                    'semicolon': context.construct_component(
                        "ImportsEqualsDeclaration['semicolon']",
                        Semi_Colon
                    )
                })

            )]
            case "InterfaceDeclaration": return ['interface', context.parse_children(
                "InterfaceDeclaration",
                (context): d_out.Statement__Interface_Declaration => ({
                    'jsdoc': context.construct_component(
                        "ModuleDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'modifiers': context.construct_component(
                        "ModuleDeclaration['modifiers']",
                        Modifiers
                    ),
                    'interface keyword': context.consume_keyword(
                        "InterfaceDeclaration['interface keyword']",
                        "InterfaceKeyword"
                    ),
                    'identifier': context.consume_literal(
                        "InterfaceDeclaration['identifier']",
                        "Identifier"
                    ),
                    'type parameters': context.construct_component(
                        "InterfaceDeclaration['type parameters']",
                        Type_Parameters
                    ),
                    'body': context.construct_component(
                        "InterfaceDeclaration['body']",
                        Object_Type
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ModuleDeclaration": return ['module', context.parse_children(
                "ModuleDeclaration",
                (context): d_out.Statement__Module_Declaration => ({
                    'jsdoc': context.construct_component(
                        "ModuleDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'modifiers': context.construct_component(
                        "ModuleDeclaration['modifiers']",
                        Modifiers
                    ),
                    'type': context.peek_for_state(
                        "ModuleDeclaration['namespace keyword']",
                        ($) => {
                            switch ($.kind) {
                                case "ModuleKeyword": return ['module', {
                                    'keyword': context.consume_keyword(
                                        "ModuleDeclaration['namespace keyword']['keyword']",
                                        "ModuleKeyword"
                                    ),
                                    'name': context.consume_component(
                                        "ModuleDeclaration['namespace keyword']['name']",
                                        Property_Name
                                    )
                                }]
                                case "NamespaceKeyword": return ['namespace', {
                                    'keyword': context.consume_keyword(
                                        "ModuleDeclaration['namespace keyword']['keyword']",
                                        "NamespaceKeyword"
                                    ),
                                    'name': context.consume_component(
                                        "ModuleDeclaration['namespace keyword']['name']",
                                        Identifier
                                    )
                                }]
                                default: return abort({

                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Statement",
                                    'internal path description': "ModuleDeclaration['namespace keyword']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        }
                    ),
                    'block': context.consume_group(
                        "ModuleDeclaration['module block']",
                        "ModuleBlock",
                        ($, context) => context.parse_children(
                            "ModuleBlock",
                            (context): d_out.Statement__Module_Declaration__Block => ({
                                // 'jsdoc': context.construct_component(
                                //     "ModuleBlock['jsdoc']",
                                //     JSDoc
                                // ),
                                'open brace token': context.consume_keyword(
                                    "ModuleBlock['first punctuation']",
                                    "OpenBraceToken"
                                ),
                                'statements': context.consume_component(
                                    "ModuleBlock['statements']",
                                    Statements
                                ),
                                'close brace token': context.consume_keyword(
                                    "ModuleBlock['close brace token']",
                                    "CloseBraceToken"
                                ),
                                // 'semicolon': context.construct_component(
                                //     "ModuleBlock['semicolon token']",
                                //     Semi_Colon
                                // )
                            })
                        )
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ReturnStatement": return ['return', context.parse_children(
                "ReturnStatement",
                (context) => ({
                    'jsdoc': context.construct_component(
                        "ReturnStatement['jsdoc']",
                        JSDoc
                    ),
                    'return keyword': context.consume_keyword(
                        "'return keyword'",
                        "ReturnKeyword"
                    ),
                    'expression': context.optional(
                        ($) => $.kind !== "SemicolonToken",
                        ($) => context.consume_component(
                            "'expression'",
                            Expression
                        )
                    ),
                    'semicolon': context.construct_component(
                        "'semicolon token'",
                        Semi_Colon
                    ),
                })
            )]
            case "SwitchStatement": return ['switch', context.parse_children(
                "SwitchStatement",
                (context): d_out.Statement__Switch => ({
                    'jsdoc': context.construct_component(
                        "SwitchStatement['jsdoc']",
                        JSDoc
                    ),
                    'switch keyword': context.consume_keyword(
                        "'switch keyword'",
                        "SwitchKeyword"
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "'open parenthesis token'",
                        "OpenParenToken"
                    ),
                    'expression': context.consume_component(
                        "'expression'",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "'close parenthesis token'",
                        "CloseParenToken"
                    ),
                    'case block': context.consume_group(
                        "'case block'",
                        "CaseBlock",
                        ($, context) => context.parse_children(
                            "CaseBlock",
                            (context): d_out.Statement__Switch['case block'] => ({
                                'open brace token': context.consume_keyword(
                                    "'open brace token'",
                                    "OpenBraceToken"
                                ),
                                'clauses': context.consume_syntax_list(
                                    "'clauses'",
                                    ($, context): d_out.Statement__Switch_Case_Clause => {
                                        switch ($.kind) {
                                            case "CaseClause": return ['case', context.parse_children(
                                                "'case clause'",
                                                (context) => ({
                                                    'case keyword': context.consume_keyword(
                                                        "'case keyword'",
                                                        "CaseKeyword"
                                                    ),
                                                    'expression': context.consume_component(
                                                        "'expression'",
                                                        Expression
                                                    ),
                                                    'colon token': context.consume_keyword(
                                                        "'colon token'",
                                                        "ColonToken"
                                                    ),
                                                    'statements': context.consume_component(
                                                        "'statements'",
                                                        Statements
                                                    ),
                                                })
                                            )]
                                            case "DefaultClause": return ['default', context.parse_children(
                                                "'default clause'",
                                                (context) => ({
                                                    'default keyword': context.consume_keyword(
                                                        "'default keyword'",
                                                        "DefaultKeyword"
                                                    ),
                                                    'colon token': context.consume_keyword(
                                                        "'colon token'",
                                                        "ColonToken"
                                                    ),
                                                    'statements': context.consume_component(
                                                        "'statements'",
                                                        Statements
                                                    ),
                                                })
                                            )]
                                            default: return abort({
                                                'parent': $,
                                                'external location description': $p['location description'],
                                                'module name': "Statement",
                                                'internal path description': "CaseBlock['clauses']",
                                                'problem': ['unexpected node', $],
                                            })
                                        }
                                    }
                                ),
                                'close brace token': context.consume_keyword(
                                    "CaseBlock['close brace token']",
                                    "CloseBraceToken"
                                ),
                            })
                        )
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "TryStatement": return ['try', context.parse_children(
                "TryStatement",
                (context): d_out.Statement__Try => ({
                    'jsdoc': context.construct_component(
                        "TryStatement['jsdoc']",
                        JSDoc
                    ),
                    'try keyword': context.consume_keyword(
                        "TryStatement['try keyword']",
                        "TryKeyword"
                    ),
                    'try block': context.consume_component(
                        "TryStatement['try block']",
                        Block
                    ),
                    'catch clause': context.optional(
                        ($) => $.kind === "CatchClause",
                        (context) => context.consume_group(
                            "TryStatement['catch clause']",
                            "CatchClause",
                            ($, context) => context.parse_children(
                                "CatchClause",
                                (context) => ({
                                    'catch keyword': context.consume_keyword(
                                        "CatchClause['catch keyword']",
                                        "CatchKeyword"
                                    ),
                                    'open parenthesis token': context.consume_keyword(
                                        "CatchClause['open parenthesis token']",
                                        "OpenParenToken"
                                    ),
                                    'variable declaration': context.consume_component(
                                        "CatchClause['variable declaration']",
                                        Variable_Declaration
                                    ),
                                    'close parenthesis token': context.consume_keyword(
                                        "CatchClause['close parenthesis token']",
                                        "CloseParenToken"
                                    ),
                                    'block': context.consume_component(
                                        "CatchClause['block']",
                                        Block
                                    ),
                                })
                            )
                        )
                    ),
                    'finally block': context.optional(
                        ($) => $.kind === "FinallyKeyword",
                        (context) => ({
                            'finally keyword': context.consume_keyword(
                                "TryStatement['finally block']['finally keyword']",
                                "FinallyKeyword"
                            ),
                            'block': context.consume_component(
                                "TryStatement['finally block']['block']",
                                Block
                            )
                        })
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "ThrowStatement": return ['throw', context.parse_children(
                "ThrowStatement",
                (context) => ({
                    'throw keyword': context.consume_keyword(
                        "ThrowStatement['throw keyword']",
                        "ThrowKeyword"
                    ),
                    'expression': context.consume_component(
                        "ThrowStatement['expression']",
                        Expression
                    ),
                    'semicolon': context.construct_component(
                        "ThrowStatement['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "TypeAliasDeclaration": return ['type alias', context.parse_children(
                "TypeAliasDeclaration",
                (context): d_out.Statement__Type_Alias_Declaration => ({
                    'jsdoc': context.construct_component(
                        "TypeAliasDeclaration['jsdoc']",
                        JSDoc
                    ),
                    'modifiers': context.construct_component(
                        "TypeAliasDeclaration['modifiers']",
                        Modifiers
                    ),
                    'type keyword': context.consume_keyword(
                        "TypeAliasDeclaration['type keyword']",
                        "TypeKeyword",
                    ),
                    'identifier': context.consume_literal(
                        "TypeAliasDeclaration['identifier']",
                        "Identifier",
                    ),
                    'type parameters': context.construct_component(
                        "TypeAliasDeclaration['type parameters']",
                        Type_Parameters
                    ),
                    'equals token': context.consume_keyword(
                        "TypeAliasDeclaration['equals token']",
                        "EqualsToken"
                    ),
                    'type': context.consume_component(
                        "TypeAliasDeclaration['type']",
                        Type
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            case "VariableStatement": return ['variable', context.parse_children(
                "VariableStatement",
                (context): d_out.Statement__Variable => ({
                    'jsdoc': context.construct_component(
                        "VariableStatement['jsdoc']",
                        JSDoc
                    ),
                    'modifiers': context.construct_component(
                        "VariableStatement['modifiers']",
                        Modifiers
                    ),
                    'variable declaration list': context.consume_component(
                        "VariableStatement['variable declaration list']",
                        Variable_Declaration_List
                    ),
                    'semicolon': context.construct_component(
                        "VariableStatement['semicolon']",
                        Semi_Colon
                    )
                })
            )]
            case "WhileStatement": return ['while', context.parse_children(
                "WhileStatement",
                (context) => ({
                    'while keyword': context.consume_keyword(
                        "WhileStatement['while keyword']",
                        "WhileKeyword",
                    ),
                    'open parenthesis token': context.consume_keyword(
                        "WhileStatement['open parenthesis token']",
                        "OpenParenToken",
                    ),
                    'expression': context.consume_component(
                        "WhileStatement['expression']",
                        Expression
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "WhileStatement['close parenthesis token']",
                        "CloseParenToken",
                    ),
                    'statement': context.consume_component(
                        "WhileStatement['statement']",
                        Statement
                    ),
                    'semicolon': context.construct_component(
                        "ExportDeclaration['semicolon token']",
                        Semi_Colon
                    ),
                })
            )]
            default: return abort({
                'parent': $,
                'external location description': $p['location description'],
                'module name': "Statement",
                'internal path description': "-",
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Statements: h.Refiner<d_out.Statements> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Statements",
    },
    (context) => context.assert_kind(
        "statements",
        "SyntaxList",
        ($) => context.process_children_as_list(
            "Statement",
            ($, context): d_out.Statement => context.call_with_this_node(
                "statement",
                Statement,
            )
        )
    )
)

export const Type: h.Refiner<d_out.Type> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Type",
    },
    (context): d_out.Type => {
        switch ($.kind) {
            case "AnyKeyword": return ['any', null]
            case "ArrayType": return ['array', context.parse_children(
                "ArrayType",
                (context): d_out.Type__Array => ({
                    'element type': context.consume_component(
                        "ArrayType['element type']",
                        Type
                    ),
                    'open bracket token': context.consume_keyword(
                        "ArrayType['open bracket token']",
                        "OpenBracketToken",
                    ),
                    'close bracket token': context.consume_keyword(
                        "ArrayType['close bracket token']",
                        "CloseBracketToken",
                    ),
                })
            )]
            case "BooleanKeyword": return ['boolean', null]
            case "IndexedAccessType": return ['indexed access', context.parse_children(
                "IndexedAccessType",
                (context): d_out.Type__Indexed_Access => ({
                    'object type': context.consume_component(
                        "IndexedAccessType['object type']",
                        Type
                    ),
                    'open bracket token': context.consume_keyword(
                        "IndexedAccessType['open bracket token']",
                        "OpenBracketToken",
                    ),
                    'index type': context.consume_component(
                        "IndexedAccessType['index type']",
                        Type
                    ),
                    'close bracket token': context.consume_keyword(
                        "IndexedAccessType['close bracket token']",
                        "CloseBracketToken",
                    ),
                })
            )]
            case "JSDocAllType": return ['jsdoc all', context.parse_children(
                "JSDocAllType",
                (context): d_out.Type__JSDoc_All => ({
                    'asterisk token': context.consume_keyword(
                        "JSDocAllType['asterisk token']",
                        "AsteriskToken",
                    ),
                })
            )]
            case "JSDocFunctionType": return ['jsdoc function', context.parse_children(
                "JSDocFunctionType",
                (context): d_out.Type__JSDoc_Function => ({
                    'function keyword': context.consume_keyword(
                        "JSDocFunctionType['function keyword']",
                        "FunctionKeyword",
                    ),
                    'parameters': context.construct_component(
                        "JSDocFunctionType['parameters']",
                        Parameters
                    ),
                    'type': context.construct_component(
                        "JSDocFunctionType['type']",
                        Optional_Type
                    )
                })
            )]
            case "JSDocNonNullableType": return ['jsdoc non nullable', context.parse_children(
                "JSDocNonNullableType",
                (context): d_out.Type__JSDoc_Non_Nullable => ({
                    'exclamation token before': context.optional(
                        ($) => $.kind === "ExclamationToken",
                        ($) => context.consume_keyword(
                            "JSDocNonNullableType['exclamation token before']",
                            "ExclamationToken"
                        )
                    ),
                    'type': context.consume_component(
                        "JSDocNonNullableType['type']",
                        Type
                    ),
                    'exclamation token after': context.optional(
                        ($) => $.kind === "ExclamationToken",
                        ($) => context.consume_keyword(
                            "JSDocNonNullableType['exclamation token after']",
                            "ExclamationToken"
                        )
                    )
                })
            )]
            case "JSDocNullableType": return ['jsdoc nullable', context.parse_children(
                "JSDocNullableType",
                (context): d_out.Type__JSDoc_Nullable => ({
                    'question token before': context.optional(
                        ($) => $.kind === "QuestionToken",
                        ($) => context.consume_keyword(
                            "JSDocNullableType['question token before']",
                            "QuestionToken"
                        )
                    ),
                    'type': context.consume_component(
                        "JSDocNullableType['type']",
                        Type
                    ),
                    'question token after': context.optional(
                        ($) => $.kind === "QuestionToken",
                        ($) => context.consume_keyword(
                            "JSDocNullableType['question token after']",
                            "QuestionToken"
                        )
                    )
                })
            )]
            case "JSDocUnknownType": return ['jsdoc unknown', context.parse_children(
                "JSDocUnknownType",
                (context): d_out.Type__JSDoc_Unknown => ({
                    'question token': context.consume_keyword(
                        "JSDocUnknownType['question token']",
                        "QuestionToken",
                    ),
                })
            )]
            case "FunctionType": return ['function', context.parse_children(
                "FunctionType",
                (context): d_out.Type__Function_Type => ({
                    'type parameters': context.construct_component(
                        "FunctionType['type parameters']",
                        Type_Parameters
                    ),
                    'parameters': context.construct_component(
                        "FunctionType['parameters']",
                        Parameters
                    ),
                    'equals greater than token': context.consume_keyword(
                        "FunctionType['equals greater than token']",
                        "EqualsGreaterThanToken",
                    ),
                    'return type': context.consume_component(
                        "FunctionType['return type']",
                        Type
                    ),
                    'type': context.construct_component(
                        "FunctionType['type']",
                        Optional_Type
                    )
                })
            )]
            case "LiteralType": return ['literal type', context.parse_children(
                "LiteralType",
                (context): d_out.Type__Literal => ({
                    'type': context.consume_state(
                        "LiteralType['type']",
                        ($, context) => {
                            switch ($.kind) {
                                case "FalseKeyword": return ['false keyword', null]
                                case "NullKeyword": return ['null', null]
                                case "NumericLiteral": return ['numeric literal', $]
                                case "StringLiteral": return ['string literal', $]
                                case "TrueKeyword": return ['true keyword', null]
                                default: return abort({
                                    'parent': $,
                                    'external location description': $p['location description'],
                                    'module name': "Type",
                                    'internal path description': "LiteralType['type']",
                                    'problem': ['unexpected node', $],
                                })
                            }
                        },
                    ),
                })
            )]
            case "NeverKeyword": return ['never', null]
            case "NumberKeyword": return ['number', null]
            case "ParenthesizedType": return ['parenthesized', context.parse_children(
                "ParenthesizedType",
                (context): d_out.Type__Parenthesized => ({
                    'open parenthesis token': context.consume_keyword(
                        "ParenthesizedType['open parenthesis token']",
                        "OpenParenToken"
                    ),
                    'type': context.consume_component(
                        "ParenthesizedType['type']",
                        Type
                    ),
                    'close parenthesis token': context.consume_keyword(
                        "ParenthesizedType['close parenthesis token']",
                        "CloseParenToken"
                    ),
                })
            )]
            case "StringKeyword": return ['string', null]
            case "SymbolKeyword": return ['symbol', null]
            case "TupleType": return ['tuple type', context.parse_children(
                "TupleType",
                (context): d_out.Type__Tuple => ({
                    'open bracket token': context.consume_keyword(
                        "TupleType['open bracket token']",
                        "OpenBracketToken"
                    ),
                    'elements': context.consume_syntax_list(
                        "TupleType['elements']",
                        ($, context) => {
                            switch ($.kind) {
                                case "CommaToken": return ['comma token', null]
                                default: return ['type', context.call_with_this_node(
                                    "TupleType['elements']",
                                    Type,
                                )]
                            }
                        }
                    ),
                    'close bracket token': context.consume_keyword(
                        "TupleType['close bracket token']",
                        "CloseBracketToken"
                    ),
                })
            )]
            case "TypeLiteral": return ['type literal', context.parse_children(
                "TypeLiteral",
                (context): d_out.Object_Type => context.construct_component(
                    "TypeLiteral",
                    Object_Type
                )
            )]
            case "TypeOperator": return ['type operator', context.parse_children(
                "TypeOperator",
                (context): d_out.Type__Type_Operator => ({
                    'readonly keyword': context.consume_keyword(
                        "TypeOperator['readonly keyword']",
                        "ReadonlyKeyword"
                    ),
                    'type': context.consume_component(
                        "TypeOperator['type']",
                        Type
                    )
                })
            )]
            case "TypeReference": return ['type reference', context.parse_children(
                "TypeReference",
                (context): d_out.Type__Type_Reference => ({
                    'entity name': context.consume_component(
                        "TypeReference['entity name']",
                        Entity_Name
                    ),
                    'dot token': context.optional(
                        ($) => $.kind === "DotToken",
                        ($) => context.consume_keyword(
                            "TypeReference['dot token']",
                            "DotToken"
                        )
                    ),
                    'type arguments': context.construct_component(
                        "TypeReference['type arguments']",
                        Type_Arguments
                    ),
                })
            )]
            case "UnionType": return ['union type', context.parse_children(
                "UnionType",
                (context): d_out.Type__Union => ({
                    'members': context.consume_syntax_list(
                        "UnionType['members']",
                        ($, context): d_out.Type__Union__Member => {
                            switch ($.kind) {
                                case "BarToken": return ['bar token', null]
                                default: return ['type', context.call_with_this_node(
                                    "UnionType['members']",
                                    Type,
                                )]
                            }
                        }
                    )
                })
            )]
            case "UndefinedKeyword": return ['undefined', null]
            case "UnknownKeyword": return ['unknown', null]
            case "VoidKeyword": return ['void', null]
            default: return abort({
                'external location description': $p['location description'],
                'module name': "Type",
                'internal path description': "-",
                'parent': $,
                'problem': ['unexpected node', $],
            })
        }
    }
)

export const Type_Arguments: h.Production<d_out.Type_Arguments> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Type_Arguments",
    },
    (context): d_out.Type_Arguments => context.optional(
        ($) => $.kind === "LessThanToken",
        (context) => ({

            'less than token': context.consume_keyword(
                "TypeArguments['less than token']",
                "LessThanToken"
            ),
            'entries': context.consume_syntax_list(
                "TypeArguments['entries']",
                ($, context): d_out.Type_Arguments_Entry => {
                    switch ($.kind) {
                        case "CommaToken": return ['comma token', null]
                        default: return ['type', context.call_with_this_node(
                            "TypeArguments['entries']",
                            Type,
                        )]
                    }
                }
            ),
            'greater than token': context.consume_keyword(
                "TypeArguments['greater than token']",
                "GreaterThanToken"
            ),
        })
    )
)

export const Type_Parameters: h.Production<d_out.Type_Parameters> = (iterator, abort, $p) => h.create_iterator_context(
    iterator,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Type_Parameters",
    },
    (context): d_out.Type_Parameters => context.optional(
        ($) => $.kind === "LessThanToken",
        (context) => ({
            'less than token': context.consume_keyword(
                "TypeParameters['less than token']",
                "LessThanToken",
            ),
            'entries': context.consume_syntax_list(
                "TypeParameters['entries']",
                ($, context): d_out.Type_Parameters_Entry => {
                    switch ($.kind) {
                        case "CommaToken": return ['comma token', null]
                        case "TypeParameter": return ['type parameter', context.parse_children(
                            "TypeParameter",
                            (context) => ({
                                'identifier': context.consume_literal(
                                    "TypeParameter['identifier']",
                                    "Identifier",
                                ),
                                'extends': context.optional(
                                    ($) => $.kind === "ExtendsKeyword",
                                    (context) => ({
                                        'extends keyword': context.consume_keyword(
                                            "TypeParameter['extends keyword']",
                                            "ExtendsKeyword"
                                        ),
                                        'type': context.consume_component(
                                            "TypeParameter['type']",
                                            Type
                                        )
                                    })
                                )
                            })
                        )]
                        default: return abort({
                            'parent': $p.parent,
                            'external location description': $p['location description'],
                            'module name': "Type_Parameters",
                            'internal path description': "'entries'",
                            'problem': ['unexpected node', $],
                        })
                    }
                }
            ),
            'greater than token': context.consume_keyword(
                "TypeParameters['greater than token']",
                "GreaterThanToken"
            ),
        })
    )

)

export const Variable_Declaration: h.Refiner<d_out.Variable_Declaration> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Variable_Declaration",
    },
    (context): d_out.Variable_Declaration => context.assert_kind(
        "VariableDeclaration",
        "VariableDeclaration",
        ($, context) => context.parse_children(
            "VariableDeclaration",
            (context): d_out.Variable_Declaration => ({
                'name': context.consume_component(
                    "VariableDeclaration['name']",
                    Binding_Pattern
                ),
                'exclamation token': context.optional(
                    ($) => $.kind === "ExclamationToken",
                    ($) => context.consume_keyword(
                        "VariableDeclaration['exclamation token']",
                        "ExclamationToken"
                    )
                ),
                'type': context.construct_component(
                    "VariableDeclaration['type']",
                    Optional_Type
                ),
                'assignment': context.optional(
                    ($) => $.kind === "EqualsToken",
                    (context) => ({
                        'initializer': context.construct_component(
                            "VariableDeclaration['assignment']['initializer']",
                            Initializer
                        )
                    })
                ),
            })
        )
    )
)

export const Variable_Declaration_List: h.Refiner<d_out.Variable_Declaration_List> = ($, abort, $p) => h.create_node_context(
    $,
    abort,
    {
        'location description': $p['location description'],
        'parent': $p.parent,
        'module name': "Variable_Declaration_List",
    },
    (context): d_out.Variable_Declaration_List => context.assert_kind(
        "VariableDeclarationList",
        "VariableDeclarationList",
        ($, context) => context.parse_children(
            "VariableDeclarationList",
            (context): d_out.Variable_Declaration_List => ({
                'mutability': context.peek_for_state(
                    "VariableDeclarationList['mutability']",
                    ($) => {
                        switch ($.kind) {
                            case "AwaitKeyword": return ['await using', {
                                'await keyword': context.consume_keyword(
                                    "VariableDeclarationList['mutability']['await keyword']",
                                    "AwaitKeyword"
                                ),
                                'using keyword': context.consume_keyword(
                                    "VariableDeclarationList['mutability']['using keyword']",
                                    "UsingKeyword"
                                )
                            }]
                            case "ConstKeyword": return ['const', context.consume_keyword(
                                "VariableDeclarationList['mutability']",
                                "ConstKeyword"
                            )]
                            case "LetKeyword": return ['let', context.consume_keyword(
                                "VariableDeclarationList['mutability']",
                                "LetKeyword"
                            )]
                            case "UsingKeyword": return ['using', context.consume_keyword(
                                "VariableDeclarationList['mutability']",
                                "UsingKeyword"
                            )]
                            case "VarKeyword": return ['var', context.consume_keyword(
                                "VariableDeclarationList['mutability']",
                                "VarKeyword"
                            )]
                            default: return abort({
                                'parent': $,
                                'external location description': $p['location description'],
                                'module name': "VariableDeclarationList",
                                'internal path description': "mutability",
                                'problem': ['unexpected node', $],
                            })
                        }
                    }
                ),
                'declarations': context.consume_syntax_list(
                    "VariableDeclarationList['declarations']",
                    ($, context): d_out.Variable_Declaration => {
                        switch ($.kind) {
                            case "VariableDeclaration": return context.call_with_this_node(
                                "VariableDeclarationList['declarations']",
                                Variable_Declaration,
                            )
                            default: return abort({
                                'parent': $,
                                'external location description': $p['location description'],
                                'module name': "VariableDeclarationList",
                                'internal path description': "declarations",
                                'problem': ['unexpected node', $],
                            })
                        }
                    }
                )
            })
        )
    )
)