export interface ActionInterface {
    "type": 'showLog' | 'setFlag' | 'setLockResource' | 'modifyResource',
    "args": ActionInterface | argSetFlagInterface | argSetLockResourceInterface | argModifyResourceInterface;
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

export type argAll  = argShowLogInterface | argSetFlagInterface | argSetLockResourceInterface | argModifyResourceInterface;