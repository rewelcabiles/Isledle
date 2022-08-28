import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";
import type { resourceInterface } from "./resourceStore";


export interface DropTableEntryInterface{
  "name": resourceInterface['name'],
  "maxQuantity": number, 
  "chance": number 
}

export interface DropTableInterface{
    "id": string,
    "table": DropTableEntryInterface[]
}

export const useDropTableStore = defineStore({
  id: "location",
  state: () => ({
    dropTableData: useStorage('dropTableData', {} as { [key: DropTableInterface["id"]]: DropTableInterface })
  }),
  getters: {

  },
  
  actions: {
    rollDropTable(id: DropTableInterface['id']){
      let droppedItems = {} as { [ key: resourceInterface['name'] ]: number };
      this.dropTableData[id].table.forEach( drop => {
        droppedItems[drop.name] = 0;
        for ( const value of Array(drop.maxQuantity).keys()){
          if( Math.random() <= drop.chance ){
            droppedItems[drop.name] += 0;
          }
        }
      });
      return droppedItems;
    },

    saveDropTable(args: DropTableInterface){
      this.dropTableData[args.id] = args
    }
  },
});
