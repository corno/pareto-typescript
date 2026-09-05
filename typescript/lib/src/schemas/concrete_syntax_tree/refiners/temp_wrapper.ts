
import * as p_i from "pareto-core/refiner"

//schemas
import type * as s_in from "pareto-untyped-syntax-tree-api/schemas/untyped_syntax_tree/schema"
import type * as s_path from "pareto-filesystem-unrestricted-api/modules/unrestricted/schemas/path/schema"
import type * as s_function from "../../concrete_syntax_tree_from_untyped_syntax_tree/schema.js"
import type * as s_out from "../schema.js"

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