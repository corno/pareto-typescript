import * as p_ from 'pareto-core/interface/command_interface'

//data types
import type * as s_main from "pareto-application-api/interface/data/main"


export type analyse_file = p_.Command_Interface<
    s_main.Error,
    s_main.Parameters
>
