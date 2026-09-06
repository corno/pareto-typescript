import * as p_ from 'pareto-core/serializer'

import type * as s_in from "./schema.js"

export const Location: p_.Serializer<
    s_in.Location
> = ($) => `${$.line}:${$.column}`