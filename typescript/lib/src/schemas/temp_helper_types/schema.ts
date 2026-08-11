import * as p_di from 'pareto-core/interface/schema'

import type * as s_primitives from "../primitives/schema.js"

export type Separated_List<T extends p_di.Value> = p_di.List<
    | ['separator', s_primitives.Keyword]
    | ['entry', T]
>