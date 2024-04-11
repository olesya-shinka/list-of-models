export interface Param {
    id: number;
    name: string;
    type: string;
}
export interface ParamValue {
    paramId: number;
    value: string;
}

interface Color {
    name: string;
}
export interface Model {

    paramValues: ParamValue[];
    colors: Color[];
    id: number;
    name: string
}
export interface Props {
    params: Param[];
    model: Model;
}