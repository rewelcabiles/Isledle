export type argAll  = argShowLogInterface | argSetFlagInterface | argSetLockResourceInterface | argModifyResourceInterface | argRollDropTableInterface;
export interface ActionInterface {
    "type": 'showLog' | 'setFlag' | 'setLockResource' | 'modifyResource' | 'rollDropTable',
    "args": argAll;
}

export interface argShowLogInterface {
    "id" : string
}

export interface argSetFlagInterface {
    "id" : string,
    "value" : boolean
}

export interface argSetLockResourceInterface {
    "name" : string,
    "unlocked" : boolean
}

export interface argModifyResourceInterface {
    "name" : string,
    "modify" : 'add' | 'subtract',
    "value" : number
}

export interface argRollDropTableInterface{
    "id": string
}

