import { defineStore } from "pinia";
import { doAction } from "@/models/doAction";
import { useDeveloperStore } from '@/stores/developerStore';


import type { Action } from "@/models/doAction";

import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";

let Data = IsledleData as { [key: string]: any}

export const useActionStore = defineStore({
  id: "log",
  state: () => ({
    master_action: useStorage('action_data', Data['action_data' as any]) as { [key: string]: Action }
  }),

  getters: {
    
  },
  
  actions: {
    getAction(id: string) {
      return this.master_action[id];
    },

    doActions(actions: Action['id'][]) {
      let doActions = actions.map(id => this.getAction(id));
      new doAction(doActions).do();
    }
  },
});
