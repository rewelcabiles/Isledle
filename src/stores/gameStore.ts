import { defineStore } from "pinia";
import { useStorage } from "@vueuse/core";

export const useGameStore = defineStore({
  id: "game",
  state: () => ({
    raw_day: useStorage('raw_day', 0),
    time: useStorage('time', 3),
    max_steps_per_day: 46,
    base_type: "Tent",

    daySections: {
      "day": [9, 10, 11, 12, 13, 14, 15, 16, 17],
      "dusk": [5, 6, 7, 18, 19, 20],
      "night": [21, 22, 23, 0, 1, 2, 3, 4]
    } as { [key: string]: number[] },



  }),

  getters: {
    getDaySectionByTime: (state) => {
      const { daySections } = state;
      const { time } = state;
      const daySection = Object.keys(daySections).find(daySection => daySections[daySection].includes(time));
      return daySection;
    }
  },
  
  actions: {
    incrementTime() {
      if (this.time < (Math.floor(this.max_steps_per_day / 2))) {
        this.time++;
      } else {
        this.time = 0;
        this.raw_day++;
      }
    },
  },
});
