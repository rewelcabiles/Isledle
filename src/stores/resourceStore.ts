import { defineStore } from "pinia";
import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";
import type { ActionInterface, argModifyResourceInterface, argSetLockResourceInterface } from "@/models/actionInterfaces";
import { MessageBus, type actionFunctionMapInterface } from "@/models/MessageBus";
import { computed, ref } from "vue";
import { ActionStore } from "./store";


export interface resourceInterface {
  name: string,
  stock: number,
  unlocked: boolean
}

export const useResourceStore = defineStore('resource', () => {

  // === STATE === ///
  const resource_data = ref(useStorage('resource_data', IsledleData.resource_data as { [key: string]: resourceInterface }))
  const messageBus = ref(new MessageBus({
    'modifyResource': modifyResource,
    'setLockResource': setResourceLock
  }))

  const actionStore = ActionStore();
  actionStore.messageBus.attach(messageBus.value)

  // === COMPUTED === ///
  const unlockedResources = computed(() => Object.values(resource_data.value).filter(resource => resource.unlocked).length > 0)

  

  // === FUNCTIONS === ///
  function getResource(resource_name: resourceInterface['name']) {
    return resource_data.value[resource_name];
  }
 
  function setResourceLock(args: argSetLockResourceInterface) {
    resource_data.value[args.name].unlocked = args.unlocked;
  }

  function resetData() {
    resource_data.value = IsledleData.resource_data as { [key: string]: resourceInterface }
  }
  
  function modifyResource(args: argModifyResourceInterface){
    let resource = getResource(args.name);
    switch(args.modify){
      case 'add':
        resource.stock += args.value
        break;
      case 'subtract':
        resource.stock -= args.value
        break;
    }
  }

  function deleteResource(resource_name: resourceInterface['name']){
    delete resource_data.value[resource_name];
  }
  function createResource(resource: resourceInterface){
    resource_data.value[resource.name] = resource;
  }

  return {
    resetData,
    messageBus,
    getResource,
    resource_data,
    createResource,
    deleteResource,
    unlockedResources,
  }
});
