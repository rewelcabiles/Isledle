import { defineStore } from "pinia";

import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";
import type {
  argShowLogInterface,
  argAll,
  ActionInterface
} from '@/models/actionInterfaces';
import { computed, ref } from "vue";
import { MessageBus } from "@/models/MessageBus";
import { ActionStore } from "./store";


export interface choiceInterface{
  "label": string,
  "actions": ActionInterface[]
}

export interface logInterface {
  "id": string,
  "text": string,
  "options": choiceInterface[],
  "disabled": boolean
}

interface logDataInterface{
  [key: string] : any
}

export const useLogStore = defineStore( 'logs', () => {
  const dataName = "logs"
  const logs = ref(useStorage('logs', [] as logInterface[]))
  const data = ref(useStorage('log_data', IsledleData[dataName] as logDataInterface))
  
  
  const messageBus = ref(new MessageBus({
    'showLog' : addLog
  }));
  const actionStore = ActionStore();
  actionStore.messageBus.attach(messageBus.value)



  function getLog(id:string) {
      return data.value[id];
  }

  function addLog(arg: argShowLogInterface) {
    if (Object.keys(data.value).includes(arg.id)){
      logs.value.push( getLog(arg.id) );
    } else {
      console.error(`LOG-STORE: Does not exist in log_data: ${arg.id}`);
    }
  }

  function resetData() {
    data.value = IsledleData[dataName] as logDataInterface;
    logs.value = []
  }

  function createLog(new_log: logInterface){
    data.value[new_log.id] = new_log
  }

  function removeLogFromData(id: keyof logDataInterface){
    delete data.value[id];
  }

  return {
    resetData,
    createLog,
    removeLogFromData,
    data,
    logs,
    dataName
  }
});
