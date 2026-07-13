import * as p_di from 'pareto-core/interface/schema'


export type Separated_List<T extends p_di.Value> = p_di.List<
    | ['separator', null]
    | ['entry', T]
>