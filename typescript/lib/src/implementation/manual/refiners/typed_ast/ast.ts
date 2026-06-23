import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_t from 'pareto-core/dist/implementation/transformer'
import * as p_i from 'pareto-core/dist/interface/refiner'
import * as p_di from 'pareto-core/dist/interface/data'
import p_assert from 'pareto-core/dist/implementation/refiner/specials/assert'

//data types
import * as d_in from "../../../../modules/typescript_parser/interface/data/ast"
import * as d_out from "../../../../interface/data/typed_ast"

type My_Error = {
    'type':
    | ['unexpected', {
        'kind': string
        'expected': p_di.List<string>
    }]
    | ['missing', {
        'kind': string
    }]
    | ['expected single token', {
        'kind': string
    }]
}

export const Source_File: p_i.Refiner<
    d_out.Source_File,
    My_Error,
    d_in.Node
> = ($, abort) => p_assert(
    abort,
    () => $.kind === "SourceFile"
        ? p_.literal.not_set()
        : p_.literal.set({
            'type': ['unexpected', {
                'kind': $.kind,
                'expected': p_.literal.list(["Source File"])
            }]
        }),
    () => ({
        'statements': p_t.from.list($.children).on_has_single_item(
            ($) => p_assert(
                abort,
                (): p_di.Optional_Value<My_Error> => $.kind === "SyntaxList"
                    ? p_.literal.not_set()
                    : p_.literal.set({
                        'type': ['unexpected', {
                            'kind': $.kind,
                            'expected': p_.literal.list(["SyntaxList"]),
                        }]
                    }),
                () => Statements($, abort)
            ),
            () => abort({
                'type': ['expected single token', {
                    'kind': "SourceFile"
                }]
            }),
            () => abort({
                'type': ['missing', {
                    'kind': "SourceFile"
                }]
            })
        )
    })
)

export const Statements: p_i.Refiner<
    d_out.Statements,
    My_Error,
    d_in.Node
> = ($, abort) => p_.from.list($.children).map(
    ($) => p_.from.text($.kind).to_state(
        $,
        ($, text): d_out.Statement => {
            switch (text) {
                case "ImportDeclaration": return ['import declaration', null]
                default:
                    return abort(
                        {
                            'type': ['unexpected', {
                                'kind': text,
                                'expected': p_.literal.list(["ImportDeclaration"])
                            }]
                        }
                    )
            }
        }
    )
)