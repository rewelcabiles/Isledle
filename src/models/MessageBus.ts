import type { ActionInterface, argAll } from "@/models/actionInterfaces";



export interface actionFunctionMapInterface { [key: string]: Function }

export class MessageBus {
    observers:  MessageBus[] = []
    allowedActions: string[] = [] 
    functionMap: actionFunctionMapInterface = {};
    
    constructor(functionMap?: actionFunctionMapInterface){
        if (functionMap){
            this.functionMap = functionMap;
        }
        this.allowedActions = Object.keys(this.functionMap);
    }
    attach(observer: MessageBus): void {
        this.observers.push(observer)
    }
    detach(observer: MessageBus): void {
        this.observers.splice(
            this.observers.indexOf(observer), 1
        );
    }
    notify(action: ActionInterface): void {
        this.observers.forEach( observer => {
            observer.update(action);
        });
    }
    update(action: ActionInterface): void {
        if (this.allowedActions.includes(action.type)){
            this.functionMap[action.type]();
        }
    }
}