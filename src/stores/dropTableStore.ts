import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";
import type { resourceInterface } from "./resourceStore";
import { MessageBus } from "@/models/MessageBus";
import { ActionStore, DropTableStore } from "./store";
import IsledleData from '@/config/IsledleData.json'
import type { argModifyResourceInterface, argRollDropTableInterface } from "@/models/actionInterfaces";
import { ref } from "vue";


export interface DropTableEntryInterface{
  "name": string,
  "maxQuantity": number, 
  "chance": number 
}

export interface DropTableInterface{
    id: string,
    table: DropTableEntryInterface[]
}

interface dataInterface {
  [key: string] : DropTableInterface
}

export const useDropTableStore = defineStore('Drop Table', () => {
  const dataName = "dropTables"
  const data = ref(useStorage('dropTableData', IsledleData[dataName] as dataInterface));
  const messageBus = new MessageBus({
    'rollDropTable': rollDropTable
  });
  const actionStore = ActionStore()
  const mainMessageBus = actionStore.messageBus;
  mainMessageBus.attach(messageBus)
  
  function rollDropTable(args: argRollDropTableInterface){
    let droppedItems = {} as { [ key: resourceInterface['name'] ]: number };
    if (!Object.keys(data.value).includes(args.id)){
      console.error("DROP TABLE STORE: Does not exist in data id: ", args.id)
      return
    }
    data.value[args.id].table.forEach( drop => {
      droppedItems[drop.name] = 0;
      for ( const value of Array(drop.maxQuantity).keys()){
        if( Math.random() * 100 <= drop.chance ){
          droppedItems[drop.name] += 1;
        }
      }
    });
    
    Object.keys(droppedItems).forEach( key => {
      if (droppedItems[key] == 0){
        return;
      }
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
    data.value[args.id] = args
  }

  function deleteEntry(id: string){
    delete data.value[id]
  }

  function resetData(){
    data.value = IsledleData[dataName] as dataInterface
  }
  return {
    saveDropTable,
    deleteEntry,
    rollDropTable,
    data,
    resetData,
    dataName,
  }
});
