import { defineStore } from "pinia";
import { Resource } from "@/models/resource";
import resource_data from '@/config/resource_data.json';

interface resourceInterface {
    [key: string]: Resource;
}

export const useResourceStore = defineStore({
  id: "resource",
  state: () => ({
      resource : resource_data.reduce((acc, resource: string) => {
          acc[resource as keyof resourceInterface] = new Resource(resource);
          return acc;
      }, {} as resourceInterface ) as resourceInterface,
  }),
  getters: {
    unlockedResources: (state) => {
      return Object.values(state.resource).filter(resource => resource.unlocked).length > 0;
    }
  },
  actions: {

    incrementResource(resource:string, amount:number = 1) {
        console.log(this.resource)
        console.log(resource)
        this.resource[resource].incrementStock(amount);
    },

    unlockResource(resource:string) {
        this.resource[resource].unlocked = true;
    }
  },
});
