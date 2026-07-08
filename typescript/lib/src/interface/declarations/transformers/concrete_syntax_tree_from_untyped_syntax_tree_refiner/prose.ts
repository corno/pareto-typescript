
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_out from "pareto-fountain-pen/interface/generated/liana/schemas/prose/data"
import type * as d_in from "../../../data/concrete_syntax_tree_from_ast.js"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

