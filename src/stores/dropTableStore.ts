import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";
import type { resourceInterface } from "./resourceStore";

export interface DroppableInterface {
    "name": resourceInterface['name'],
    "quantity": number, 
    "weight": number
}

export interface DropTableInterface{
    "id": string,
    "table": DroppableInterface[]
}

export const useLocationStore = defineStore({
  id: "location",
  state: () => ({
    dropTableData: useStorage('dropTableData', {} as { [key: DropTableInterface["id"]]: DropTableInterface })
  }),

  getters: {

  },
  
  actions: {
    rollDropTable(id: DropTableInterface['id']){

    }

  },
});
