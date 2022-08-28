import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
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
  argAll,
  argRollDropTableInterface
} from '../models/actionInterfaces'
import { MessageBus } from "@/models/MessageBus";

export const useActionStore = defineStore('action', () => {


  const logStore = LogStore()
  const flagStore = FlagStore()
  const resourceStore = ResourceStore()

  const messageBus = ref(new MessageBus())

  function sendActionsToBus(actions: ActionInterface[]){
    actions.forEach( action => {
      messageBus.value.notify(action)
    });
  }

  function getActionTypes(){
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
      } as ActionInterface,
      "Roll Drop Table": {
        'type': 'rollDropTable',
        'args': {
          "id": "",
        } as argRollDropTableInterface
      } as ActionInterface
    }));
  }

  return { messageBus, getActionTypes, sendActionsToBus}
});
