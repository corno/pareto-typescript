import * as p_di from 'pareto-core/schema'

import type * as s_primitives from "../primitives/schema.js"

export type Separated_List<T extends p_di.Value> = {
    'separator before': p_di.Optional_Value<s_primitives.Keyword>
    'entries': p_di.List<Entry<T>>
}

export type Entry<T extends p_di.Value> = {
    'data': T
    'separator': p_di.Optional_Value<s_primitives.Keyword>
}