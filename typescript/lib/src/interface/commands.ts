import * as p_ from 'pareto-core/interface/command_interface'

//data types
import type * as d_main from "pareto-application-api/interface/data/main"


export type analyse_file = p_.Command_Interface<
    d_main.Error,
    d_main.Parameters
>
