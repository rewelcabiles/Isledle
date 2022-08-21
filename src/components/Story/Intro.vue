<script setup lang="ts">
import { useGameStore } from "@/stores/gameStore";
import { useResourceStore } from "@/stores/resourceStore";

import HarvestButton from "@/components/UI/Resources/HarvestButton.vue"
import { ref } from "vue";

const emit = defineEmits(['first-chop'])
const gameStore = useGameStore();
const resourceStore = useResourceStore();

let stage = ref(0);
const dialog = {
  0 : "You step outside your tent...",
  1 : "Light starts leaking into the sky...",
  2 : "Your stock of firewood is running low...",
  3 : "You are surrounded by trees...",
} as {[key: number]: string}



function handleClick(){
  gameStore.incrementTime();
  stage.value = stage.value + 1;
}

function colorTime() {
  return Math.floor(255 * fast_sigmoid(gameStore.timeToAlpha))
}

function fast_sigmoid(value: number) {
  return value / (1 + Math.abs(value))
}

function woodClick() {
  if (stage.value > 3) {
    emit('first-chop');
  }
}
</script>

<template>
  <div class="transition-all duration-700 cursor-pointer flex flex-col h-screen" :style="`background-color: rgba(0, 0, 0, ${gameStore.timeToAlpha});`" @click="handleClick">
    <div class="m-auto">
      <h1 v-if="stage < 4" class="flex m-auto transition-all" :style="`color: rgba(${colorTime()}, ${colorTime()}, ${colorTime()});`">
        {{ dialog[stage] }}
      </h1>
      <div v-else>
        <el-row>
          <HarvestButton class="transition-all duration-200" resource_name="wood" label="Chop wood" @harvested="woodClick"/>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>

