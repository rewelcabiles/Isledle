import { defineStore } from "pinia";
import { Log, type LogOption } from "@/models/logEntry";

import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";


interface logDataInterface {
  "id": string;
  "text": string;
  "options": LogOption[];
}

export const useLogStore = defineStore({
  id: "logs",
  state: () => ({
    logs: [] as Log[],
    master_logs: useStorage('log_data', IsledleData.log_data as { [key: string]: any})
  }),

  getters: {
    
  },
  
  actions: {
    getLog(id:string) {
        return this.master_logs[id];
    },

    createLog(log_data: logDataInterface){
      return new Log(log_data.text, log_data.options)
    },

    addLog(id:string) {
        if (Object.keys(this.master_logs).includes(id)){
          this.logs.push(
            this.createLog(
              this.getLog(id)
            )
          );
        } 
    }
  },
});
