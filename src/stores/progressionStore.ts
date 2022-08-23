import { defineStore } from "pinia";
import { Resource } from "@/models/resource";

import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";

export const useProgressionStore = defineStore({
  id: "progression",
  state: () => ({
      flags: useStorage('flag_data', IsledleData.flag_data as { [key: string]: any}),
  }),
  getters: {

  },
  actions: {
    setProgression(property:string, value:any) {
        this.flags[property] = value;
    }
  },
});
