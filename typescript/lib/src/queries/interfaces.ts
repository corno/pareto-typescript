import * as p_ from 'pareto-core/query_interface'

//schemas
import type * as s_parse_file from "../schemas/parse_file/schema.js"


export type parse_file = p_.Query_Interface<
    s_parse_file.Result,
    s_parse_file.Error,
    s_parse_file.Parameters
>
