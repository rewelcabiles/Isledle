import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import type { argSetFlagInterface } from "@/models/actionInterfaces";
import IsledleData from "@/config/IsledleData.json";

interface FlagInterface {
  [key: string] : boolean
}

export const useProgressionStore = defineStore({
  id: "progression",
  state: () => ({
      flag_data: useStorage('flag_data', IsledleData.flag_data as FlagInterface),
  }),
  getters: {

  },
  actions: {
    setFlag(args: argSetFlagInterface) {
      this.flag_data[args.id] = args.value;
    },
    deleteFlag(flag_id: argSetFlagInterface['id']) {
      delete this.flag_data[flag_id];
    },
    resetData(){
      this.flag_data = IsledleData.flag_data as FlagInterface
    },
  },
});
