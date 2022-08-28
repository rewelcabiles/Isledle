import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { resourceInterface } from "./resourceStore";
import { MessageBus } from "@/models/MessageBus";
import { ActionStore } from "./store";
import type { argModifyResourceInterface, argRollDropTableInterface } from "@/models/actionInterfaces";


export interface DropTableEntryInterface{
  "name": resourceInterface['name'],
  "maxQuantity": number, 
  "chance": number 
}

export interface DropTableInterface{
    "id": string,
    "table": DropTableEntryInterface[]
}

export const useDropTableStore = defineStore('dropTable', () => {
  const dropTableData = useStorage('dropTableData', {} as { [key: DropTableInterface["id"]]: DropTableInterface })
  const messageBus = new MessageBus({
    'rollDropTable': rollDropTable
  });
  const actionStore = ActionStore()
  const mainMessageBus = actionStore.messageBus;
  mainMessageBus.attach(messageBus)
  
  function rollDropTable(args: argRollDropTableInterface){
    let droppedItems = {} as { [ key: resourceInterface['name'] ]: number };
    if (!Object.keys(dropTableData).includes(args.id)){
      console.error("DROP TABLE STORE: Does not exist in data id: ", args.id)
    }
    dropTableData.value[args.id].table.forEach( drop => {
      droppedItems[drop.name] = 0;
      for ( const value of Array(drop.maxQuantity).keys()){
        if( Math.random() * 100 <= drop.chance ){
          droppedItems[drop.name] += 1;
        }
      }
    });
    
    Object.keys(droppedItems).forEach( key => {
      mainMessageBus.notify({
        type: "modifyResource" ,
        args: {
          "name": key,
          "modify": "add",
          "value": droppedItems[key]
        } as argModifyResourceInterface
      })
    });
    return droppedItems;
  }

  function saveDropTable(args: DropTableInterface){
    dropTableData.value[args.id] = args
  }
  return { saveDropTable, rollDropTable , dropTableData}
});
