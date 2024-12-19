export interface actionModel {
    payload: Array<any> | object | string | any,
    type: string;
}


export interface updatedCreatedModel {
    createdBy:string;
    updatedBy:string;
    createdDate:string;
    updatedDate:string;
    isNewAdded?:boolean;
    isModified?:boolean;
}

export interface autoAppendFor {
    id:number | string,
    appendFor:string
}