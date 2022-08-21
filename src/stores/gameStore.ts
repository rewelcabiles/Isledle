import { defineStore } from "pinia";

export const useGameStore = defineStore({
  id: "game",
  state: () => ({
    raw_day: 0,
    time: 12,
  }),
  getters: {
    // Convert time of range 0-24 to range 0-1
    timeToAlpha: (state) => {
        if (state.time > 12){
            return 12 / state.time;
        } else {
            return state.time / 12;
        }
    },
  },
  actions: {
    incrementTime() {
      if (this.time < 24) {
        this.time++;
      } else {
        this.time = 0;
        this.raw_day++;
      }
    },
  },
});
