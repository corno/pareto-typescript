
import type * as p_ from 'pareto-core/interface/transformer'

//schemas
import type * as s_out from "pareto-fountain-pen/interface/data/prose"
import type * as s_in from "../../../interface/schemas/concrete_syntax_tree_from_ast.js"


export type Error = p_.Transformer<
    s_in.Error,
    s_out.Phrase
>

