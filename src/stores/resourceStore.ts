import { defineStore } from "pinia";
import { Resource } from "@/models/resource";
import { useStorage } from '@vueuse/core'
import IsledleData from "@/config/IsledleData.json";
import type { argModifyResourceInterface, argSetLockResourceInterface } from "@/models/actionInterfaces";


export interface resourceInterface {
  name: string,
  stock: number,
  unlocked: boolean
}

export const useResourceStore = defineStore({
  id: "resource",
  state: () => ({
      resource_data : useStorage('resource_data', IsledleData.resource_data as { [key: string]: resourceInterface })
  }),

  getters: {
    unlockedResources: (state) => {
      return Object.values(state.resource_data).filter(resource => resource.unlocked).length > 0;
    }
  },
  actions: {
    getResource(resource_name: resourceInterface['name']) {
      return this.resource_data[resource_name];
    },
    setResourceLock(args: argSetLockResourceInterface) {
      this.resource_data[args.name].unlocked = args.unlocked;
    },
    resetData() {
      this.resource_data = IsledleData.resource_data as { [key: string]: resourceInterface }
    },
    modifyResource(args: argModifyResourceInterface){
      let resource = this.getResource(args.name);
      switch(args.modify){
        case 'add':
          resource.stock += args.value
          break;
        case 'subtract':
          resource.stock -= args.value
          break;
      }
    },
    deleteResource(resource_name: resourceInterface['name']){
      delete this.resource_data[resource_name];
    },
    createResource(resource: resourceInterface){
      this.resource_data[resource.name] = resource;
    }
  },
});
