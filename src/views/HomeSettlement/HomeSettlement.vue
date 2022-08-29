<template>
    <div class="transition-[background-color] duration-1000">
        <div id="home_settlement" class="w-screen h-screen transition[background-color] duration-200">
            <UI ref="ui_ref" class="transition-all duration-200"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import UI from './UI.vue'
import { useGameStore } from '@/stores/gameStore';
import { useResourceStore } from '@/stores/resourceStore';
import { ActionStore, DropTableStore, FlagStore, GameStore } from '@/stores/store';
import type { argRollDropTableInterface, argShowLogInterface } from '@/models/actionInterfaces';

let ui_ref = ref<InstanceType<typeof UI>>();

const flagStore = FlagStore();
const actionStore = ActionStore();
const gameStore = GameStore()

onMounted(() => {
    if (!flagStore.data['intro_started']){
        actionStore.sendActionsToBus([{
            "type": "showLog",
            "args": {
                "id": "lg_intro_1"
            } as argShowLogInterface
        }])
        flagStore.data['intro_started'] = true;
    }
})
console.log("WTF")

function pulse(max:number){
    let val = flat_sine_wave(gameStore.time)
    console.log(normalize(val, -1, 1))
    return max * normalize(val, -1, 1)
}

function normalize(x: number, min: number, max: number) {
    return (x - min) / (max - min)
}

function magic(){
    return normalize(flat_sine_wave(gameStore.time), -1, 1)
}

function flat_sine_wave(x : number){
    return Math.sin((Math.PI / 2) * Math.cos(x / 3))
}

</script>
