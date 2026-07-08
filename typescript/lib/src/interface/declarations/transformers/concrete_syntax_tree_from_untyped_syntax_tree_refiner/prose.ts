import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'

//data types
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_in from "../../../../interface/data/concrete_syntax_tree_from_ast.js"

export namespace interface_ {
    export type Error = p_i.Transformer<
        d_in.Error,
        d_out.Phrase
    >
}
