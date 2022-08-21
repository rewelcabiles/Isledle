import { defineStore } from "pinia";


export const useResourceStore = defineStore({
  id: "resource",
  state: () => ({
    resource : {
        "wood": 0,
    } as any,
    
  }),
  getters: {
    
  },
  actions: {
    incrementResource(resource:string) {
        this.resource[resource]++;
    },
  },
});
