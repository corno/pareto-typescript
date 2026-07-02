
import * as p_i from "pareto-core/dist/interface/refiner"

//data types
import * as d_in from "../../../../modules/typescript_parser_api/interface/data/dynamic_ast"
import * as d_out from "../../../../interface/data/typed_ast"
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"
import * as d_function from "../../../../interface/data/typed_ast_from_ast"

//dependencies
import * as r_from_ast from "./ast"

export const Source_File: p_i.Refiner_With_Parameter<
    d_out.Source_File,
    d_function.Error,
    d_in.Node,
    {
        'path': d_path.Node_Path
    }
> = ($, abort, $p) => r_from_ast.Source_File(
    $,
    ($) => abort({
        'path': $p.path,
        'inner': $,
    }),
)