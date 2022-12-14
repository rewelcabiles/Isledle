import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";
import type { ActionInterface, argModifyResourceInterface, argSetLockResourceInterface } from "@/models/actionInterfaces";
import { MessageBus, type actionFunctionMapInterface } from "@/models/MessageBus";
import { computed, ref } from "vue";
import { mainStore } from '@/stores/mainStore';




export interface resourceInterface {
  name: string,
  stock: number,
  unlocked: boolean
}

interface dataInterface {
  [ key:string ]: resourceInterface
}

export const useResourceStore = defineStore('Resource', () => {
  const dataName = "resources"
  // === STATE === ///
  const data = ref(useStorage('resource_data', IsledleData[dataName] as dataInterface))
  const messageBus = ref(new MessageBus({
    'modifyResource': modifyResource,
    'setLockResource': setResourceLock
  }))
  const store = mainStore();

  // === COMPUTED === ///
  const isUnlocked = computed(() => Object.values(data.value).filter(resource => resource.unlocked).length > 0)
  const unlockedResources = computed(() => Object.values(data.value).filter(resource => resource.unlocked))
  

  // === FUNCTIONS === ///
  function getResource(resource_name: resourceInterface['name']) {
    return data.value[resource_name];
  }
 
  function setResourceLock(args: argSetLockResourceInterface) {
    data.value[args.name].unlocked = args.unlocked;
  }

  function resetData() {
    data.value = IsledleData[dataName] as dataInterface
  }
  
  function modifyResource(args: argModifyResourceInterface){
    switch(args.modify){
      case 'add':
        data.value[args.name].stock += args.value
        break;
      case 'subtract':
        data.value[args.name].stock -= args.value
        break;
    }
    if (!data.value[args.name].unlocked){
      data.value[args.name].unlocked = true
    }
  }

  return {
    resetData,
    dataName,
    data,
    messageBus,
    getResource,
    unlockedResources,
    isUnlocked
  }
});
