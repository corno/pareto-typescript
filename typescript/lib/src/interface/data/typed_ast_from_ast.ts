
import * as p_ from 'pareto-core/dist/interface/data'

//data types
import * as d_path from "pareto-resources/dist/interface/generated/liana/schemas/fs_unrestricted_path/data"

export type Error = {
    'path': d_path.Node_Path
    'inner': Error_Inner
}

export type Error_Inner = {
    'location': {
        'line': number
        'column': number
    }
    'type':
    | ['unexpected', {
        'kind': p_.Optional_Value<string>
        'expected': p_.Optional_Value<p_.List<string>>
    }]
    | ['missing', {
        'kind': string
    }]
    | ['expected single token', {
        'kind': string
    }]
}
