import { defineStore } from "pinia";
import IsledleData  from '@/config/IsledleData.json'

// ===== STORES ===== //
import {
    LogStore, 
    ResourceStore, 
    FlagStore, 
} from './store'


export const useDeveloperStore = defineStore({
  id: "developer",
  state: () => ({
    logStore: LogStore(),
    resourceStore: ResourceStore(),
    flagStore: FlagStore(),
    IsledleData: IsledleData

  }),
  getters: {
    log_data: (state) => state.logStore.log_data,
    resource_data: (state) => state.resourceStore.resource_data,
    flag_data: (state) => state.flagStore.flag_data
  },
  actions: {
    download(){
        let full_data = {
            resource_data: this.resource_data,
            flag_data: this.flag_data,
            log_data: this.log_data
        };

        let a = document.createElement("a");
        let data = JSON.stringify(full_data, null, '\t')
        const blob = new Blob([data], {type: "text/plain;charset=utf-8"});
        a.href = URL.createObjectURL(blob);
        a.download = "IsledleData.json";
        a.click();
    },

    setToDefault() {
        this.logStore.resetData();
        this.resourceStore.resetData();
        this.flagStore.resetData();
    }
  },
});
