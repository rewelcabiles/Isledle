import { defineStore } from "pinia";
import { reactive } from 'vue';
import {
  LogStore,
  FlagStore,
  ResourceStore,
} from "./store";

import type {
  ActionInterface,
  argShowLogInterface,
  argSetFlagInterface,
  argSetLockResourceInterface,
  argModifyResourceInterface,
  argAll
} from '../models/actionInterfaces'

export const useActionStore = defineStore({
  id: "actions",

  state: () => ({
    logStore: LogStore(),
    flagStore: FlagStore(),
    resourceStore: ResourceStore()
  }),
  getters: {},
  
  actions: {
    do(action: ActionInterface[]) {
      if (!Array.isArray(action)){
        action = [action];
      }

      action.forEach( act =>{
        switch(act.type){
          case 'showLog':
            this.logStore.addLog(act.args as argShowLogInterface);
            break;

          case 'setFlag':
            this.flagStore.setFlag(act.args as argSetFlagInterface)
            break;

          case 'setLockResource':
            this.resourceStore.setResourceLock(act.args as argSetLockResourceInterface)
            break;
            
          case 'modifyResource':
            this.resourceStore.modifyResource(act.args as argModifyResourceInterface)
            break;
        }
      });
    },

    getActionTypes(){
      return JSON.parse(JSON.stringify({
        "Display Log" : {
          'type': 'showLog',
          'args': {
            "id" : ''
          } as argShowLogInterface
        } as ActionInterface,

        "Set Flag": {
          'type': 'setFlag',
          'args': {
            "id": "",
            "value": false
          } as argSetFlagInterface
        } as ActionInterface,
        "Modify Resource Stock" : {
          'type': 'modifyResource',
          'args': {
            "name": "",
            "modify": "add",
            "value": 1
          } as argModifyResourceInterface
        } as ActionInterface,
        "Set Resource Lock State": {
          'type': 'setLockResource',
          'args': {
            "name": "",
            "unlocked": true
          } as argSetLockResourceInterface
        } as ActionInterface
      }));
    }
  }
});
