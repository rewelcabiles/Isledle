import { useGameStore } from "@/stores/gameStore";
import { useResourceStore } from "@/stores/resourceStore";
import { useProgressionStore } from "@/stores/progressionStore";
import { useLogStore } from "@/stores/logStore";
import { Log } from "@/models/logEntry";

export interface Action {
    id: string;
    type: string,
    args: any,
}

export class doAction {
    id: string;
    actions: Action[] = [];
    gameStore = useGameStore();
    resourceStore = useResourceStore();
    progressionStore = useProgressionStore();
    logStore = useLogStore();

    constructor(actions:Action[]) {
        this.actions = actions;
        this.id = this.actions.map(action => action.id).join("-");
    }

    do():void {
        
        this.actions.forEach(action => {
            switch (action.type) {
                case "incrementResource":
                    this.resourceStore.incrementResource(action.args.resource, action.args.amount);
                    break;
                case "setProgressFlag":
                    action.args.forEach((arg: { property: string; value: any; }) => {
                        this.progressionStore.setProgression(arg.property, arg.value);
                    });
                    break;
                case "log":
                    this.logStore.addLog(action.args.id)
                    break;
                case "incrementTime":
                    this.gameStore.incrementTime();
                    break;
                case "unlockResource":
                    this.resourceStore.unlockResource(action.args);
                    break;
                default:
                    console.log("Unknown action type: " + action.type);
                    break;
            }
        });
    }
}