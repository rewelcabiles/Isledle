import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";
import type { resourceInterface } from "./resourceStore";

export interface LocationInterface{
    "specialInteractName": string,
    "gatherDropTable": resourceInterface["name"][],
    "specialInteractDropTable": resourceInterface["name"][],
}

export const useLocationStore = defineStore({
  id: "location",
  state: () => ({

  }),

  getters: {

  },
  
  actions: {

  },
});
