import { defineStore } from "pinia";

import { useStorage } from "@vueuse/core";
import IsledleData from "@/config/IsledleData.json";
import type { DropTableInterface } from "./dropTableStore";
import { MessageBus } from "@/models/MessageBus";
import { ref } from "vue";


export interface LocationInterface{
    "name": string,
    "unlocked": boolean,
    "specialInteractName": string,
    "dropTable": DropTableInterface['id']
    "specialDropTable": DropTableInterface['id'],
}



export const useLocationStore = defineStore('location', () => {
  const dataName = "locations"
  const data = ref(useStorage("locationData", IsledleData[dataName] as { [key: string]: LocationInterface }));
  const messageBus = new MessageBus({

  });


  

  function resetData(){
    data.value = IsledleData[dataName] as { [key: string]: LocationInterface }
  }

  return {
    resetData,
    messageBus,
    data,
    dataName,
  }
});
