import * as p_ from 'pareto-core/dist/implementation/refiner'
import * as p_i from 'pareto-core/dist/interface/refiner'
import p_assert from 'pareto-core/dist/implementation/refiner/specials/assert'
import p_iterate from 'pareto-core/dist/implementation/refiner/specials/iterate'

//data types
import * as d_in from "../../../../modules/typescript_parser/interface/data/ast"
import * as d_out from "../../../../interface/data/typed_ast"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_function from "../../../../interface/data/typed_ast_from_ast"

export const Source_File: p_i.Refiner_With_Parameter<
    d_out.Source_File,
    d_function.Error,
    d_in.Node,
    {
        'path': d_path.Node_Path
    }
> = ($, abort, $p) => Source_File_Inner(
    $,
    ($) => abort({
        'path': $p.path,
        'inner': $,
    })
)

export const Source_File_Inner: p_i.Refiner<
    d_out.Source_File,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => {
    const $v_node = $
    return p_assert(
        abort,
        () => $.kind === "SourceFile"
            ? p_.literal.not_set()
            : p_.literal.set({
                'location': $.location,
                'type': ['unexpected', {
                    'kind': p_.literal.set($.kind),
                    'expected': p_.literal.set(p_.literal.list(["Source File"]))
                }]
            }),
        () => p_iterate(
            $.children,
            null,
            ($) => p_.literal.set<d_function.Error_Inner>({
                'location': $.location,
                'type': ['unexpected', {
                    'kind': p_.literal.set($.kind),
                    'expected': p_.literal.not_set()
                }]
            }),
            abort,
            (iter) => {
                return {
                    'statements': iter.expect({
                        get_error: ($): d_function.Error_Inner => ({
                            'location': p_.from.optional($).decide(
                                ($) => $.location,
                                () => $v_node.location,
                            ),
                            'type': ['unexpected', {
                                'kind': p_.from.optional($).map(
                                    ($) => $.kind,
                                ),
                                'expected': p_.literal.set(p_.literal.list(["SyntaxList"]))
                            }]
                        }),
                        item: ($) => Statements($, abort),
                    })
                }
            }
        )
        // ({

        //     'statements': p_t.from.list($.children).on_has_single_item(
        //         ($) => p_assert(
        //             abort,
        //             (): p_di.Optional_Value<My_Error> => $.kind === "SyntaxList"
        //                 ? p_.literal.not_set()
        //                 : p_.literal.set({
        //                     'type': ['unexpected', {
        //                         'kind': $.kind,
        //                         'expected': p_.literal.list(["SyntaxList"]),
        //                     }]
        //                 }),
        //             () => Statements($, abort)
        //         ),
        //         () => abort({
        //             'type': ['expected single token', {
        //                 'kind': "SyntaxList"
        //             }]
        //         }),
        //         () => abort({
        //             'type': ['missing', {
        //                 'kind': "SyntaxList"
        //             }]
        //         })
        //     )
        // })
    )
}

// const temp_SyntaxList: p_i.Refiner<
//     d_in.Node,
//     My_Error_Inner,
//     d_in.Node
// > = ($, abort) => 

export const Statements: p_i.Refiner<
    d_out.Statements,
    d_function.Error_Inner,
    d_in.Node
> = ($, abort) => p_.from.list($.children).map(
    ($) => p_.from.text($.kind).to_state(
        $,
        ($, text): d_out.Statement => {
            switch (text) {
                case "ImportDeclaration": return ['import declaration', null]
                case "ModuleDeclaration": return ['module declaration', null]
                default:
                    return abort(
                        {
                            'location': $.location,
                            'type': ['unexpected', {
                                'kind': p_.literal.set(text),
                                'expected': p_.literal.set(p_.literal.list([
                                    "ImportDeclaration",
                                    "ModuleDeclaration"
                                ]))
                            }]
                        }
                    )
            }
        }
    )
)