import { defineStore } from "pinia";

import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";
import type {
  argShowLogInterface,
  argAll,
  ActionInterface
} from '@/models/actionInterfaces';


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

export const useLogStore = defineStore({
  id: "logs",
  state: () => ({
    logs: useStorage('logs', [] as logInterface[]),
    log_data: useStorage('log_data', IsledleData.log_data as logDataInterface)
  }),

  getters: {
    
  },
  
  actions: {
    getLog(id:string) {
        return this.log_data[id];
    },

    addLog(arg: argShowLogInterface) {
      if (Object.keys(this.log_data).includes(arg.id)){
        this.logs.push( this.getLog(arg.id) );
      } else {
        console.error(`LOG-STORE: Does not exist in log_data: ${arg.id}`);
      }
    },

    resetData() {
      this.log_data = IsledleData.log_data as logDataInterface;
      this.logs = []
    },

    createLog(new_log: logInterface){
      this.log_data[new_log.id] = new_log
    },

    removeLogFromData(id: keyof logDataInterface){
      delete this.log_data[id];
    }
  },
});
