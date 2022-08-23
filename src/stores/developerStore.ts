import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'

// ===== JSON FILES ====== //
import resource_data from '@/config/resource_data.json';
import action_data from '@/config/action_data.json';
import flag_data from '@/config/flag_data.json';
import log_data from '@/config/log_data.json';

import actions_map_data from '@/config/action_map_data.json';
import IsledleData from '@/config/IsledleData.json';

// ==== INTERFACES  ====== //

export interface FlagEntry {
    name: string;
    value: boolean;
}


export const useDeveloperStore = defineStore({
  id: "developer",
  state: () => ({
    log_data: useStorage('log_data', IsledleData.log_data as { [key: string]: any}),
    action_data: useStorage('action_data', IsledleData.action_data as { [key: string]: any }),
    flag_data: useStorage('flag_data', IsledleData.flag_data as { [key: string]: boolean }),
    resource_data: useStorage('resource_data', IsledleData.resource_data),
    actions_map_data: useStorage('actions_map_data', actions_map_data as { [key: string]: any }),
  }),
  getters: {
    
  },
  actions: {

    // ====== OTHERS ==== //
    download(){
      let full_data = {
          resource_data: this.resource_data,
          flag_data: this.flag_data,
          log_data: this.log_data,
          action_data: this.action_data
      };

      let a = document.createElement("a");
      let data = JSON.stringify(full_data, null, '\t')
      const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
      a.href = URL.createObjectURL(blob);
      a.download = "IsledleData.json";
      a.click();
    },

    // ====== ADD ====== //
    addToResource(resource:string) {
        this.resource_data.push(resource);
    },

    addToFlagData(flag:FlagEntry) {
        this.flag_data[flag.name] = flag.value;
    },

    addAction(action:any) {
        this.action_data[action.id] = action;
    },

    addLog(log: any){
        this.log_data[log.id] = log;
        console.log(this.log_data)
    },

    // ====== REMOVE ====== //
    removeFlag(key: string) {
        delete this.flag_data[key]
    },

    removeResource(index: number) {
        this.resource_data.splice(index, 1);
    },

    removeAction(id : string) {
        delete this.action_data[id];
    },

    removeLog(id: string){
        delete this.log_data[id]
    },

    setToDefault() {
        this.action_data = log_data as { [key: string]: any};
        this.log_data = log_data as { [key: string]: any};
        this.action_data = action_data as { [key: string]: any };
        this.flag_data = flag_data as { [key: string]: boolean };
        this.resource_data = resource_data;
        this.actions_map_data = actions_map_data as { [key: string]: any };
    }
  },
});
