import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import type { argSetFlagInterface } from "@/models/actionInterfaces";
import IsledleData from "@/config/IsledleData.json";
import { ref } from "vue";
import { MessageBus } from "@/models/MessageBus";
import { ActionStore } from "./store";

interface FlagInterface {
  [key: string] : boolean
}

export const useProgressionStore = defineStore('flags', () => {
  const flag_data = ref(useStorage('flag_data', IsledleData.flag_data as FlagInterface))
  const messageBus = ref(new MessageBus({
    'setFlag': setFlag
  }));

  const actionStore = ActionStore();
  actionStore.messageBus.attach(messageBus.value)

  function setFlag(args: argSetFlagInterface) {
    flag_data.value[args.id] = args.value;
  }
  function deleteFlag(flag_id: argSetFlagInterface['id']) {
    delete flag_data.value[flag_id];
  }
  function resetData(){
    flag_data.value = IsledleData.flag_data as FlagInterface
  }
  return {
    flag_data,
    setFlag,
    deleteFlag,
    resetData
  }
});
