import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import type { argSetFlagInterface } from "@/models/actionInterfaces";
import IsledleData from "@/config/IsledleData.json";
import { ref } from "vue";
import { MessageBus } from "@/models/MessageBus";

import { mainStore } from '@/stores/mainStore';



interface FlagInterface {
  [key: string] : boolean
}

export const useProgressionStore = defineStore('Flag', () => {
  const dataName = "flags"
  const data = ref(useStorage('flag_data', IsledleData[dataName] as FlagInterface))
  const messageBus = ref(new MessageBus({
    'setFlag': setFlag
  }));
  const store = mainStore()

  function setFlag(args: argSetFlagInterface) {
    data.value[args.id] = args.value;
  }
  function deleteEntry(flag_id: argSetFlagInterface['id']) {
    delete data.value[flag_id];
  }
  function resetData(){
    data.value = IsledleData[dataName] as FlagInterface
  }
  return {
    data,
    setFlag,
    deleteEntry,
    messageBus,
    resetData,
    dataName
  }
});
