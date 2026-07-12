
import * as p_i from "pareto-core/interface/refiner"

//schemas
import type * as s_in from "../../../interface/schemas/untyped_syntax_tree.js"
import type * as s_path from "../../../interface/schemas/fs_unrestricted_path.js"
import type * as s_function from "../../../interface/schemas/concrete_syntax_tree_from_ast.js"
import type * as s_out from "../../../interface/schemas/concrete_syntax_tree.js"

//dependencies
import * as r_from_ast from "./untyped_syntax_tree.js"

export const Source_File: p_i.Refiner_With_Parameter<
    s_out.Source_File,
    s_function.Error,
    s_in.Node,
    {
        'path': s_path.Node_Path
    }
> = ($, abort, $p) => r_from_ast.Source_File(
    $,
    ($) => abort({
        'path': $p.path,
        'inner': $,
    }),
)