<template>
    <!--<div :class="{'transition-all duration-500': true, 'night': gameStore.getDaySectionByTime == 'night', 'day': gameStore.getDaySectionByTime == 'day', 'dusk': gameStore.getDaySectionByTime == 'dusk'}">-->
    <div>
        <div id="home_settlement" class="w-screen h-screen transition[background-color] duration-1000">
            <UI ref="ui_ref" class="transition-all duration-200"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import UI from './UI.vue'
import { useGameStore } from '@/stores/gameStore';
import { useResourceStore } from '@/stores/resourceStore';
import { ActionStore, DropTableStore, FlagStore } from '@/stores/store';
import type { argRollDropTableInterface, argShowLogInterface } from '@/models/actionInterfaces';

let ui_ref = ref<InstanceType<typeof UI>>();

const flagStore = FlagStore();
const actionStore = ActionStore();


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
    actionStore.sendActionsToBus([{
        "type" : "rollDropTable",
        "args": {
            "id" : "test"
        }
    }])
})
console.log("WTF")


</script>
