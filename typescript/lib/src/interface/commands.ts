import * as p_ from 'pareto-core/interface/command_interface'

//schemas
import type * as s_main from "./schemas/main.js"


export type analyse_file = p_.Command_Interface<
    s_main.Error,
    s_main.Parameters
>
