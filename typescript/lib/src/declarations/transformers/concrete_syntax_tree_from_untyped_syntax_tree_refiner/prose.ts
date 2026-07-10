
import type * as p_ from 'pareto-core/interface/transformer'

//data types
import type * as d_out from "pareto-fountain-pen/interface/data/prose"
import type * as d_in from "../../../interface/data/concrete_syntax_tree_from_ast.js"


export type Error = p_.Transformer<
    d_in.Error,
    d_out.Phrase
>

