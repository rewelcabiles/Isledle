<template>
    <div
    :class="{'transition-all duration-500': true, 'night': gameStore.getDaySectionByTime == 'night', 'day': gameStore.getDaySectionByTime == 'day', 'dusk': gameStore.getDaySectionByTime == 'dusk'}">
        <div id="home_settlement" class="w-screen h-screen transition[background-color] duration-1000">
            <UI ref="ui_ref" class="transition-all duration-200"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import UI from './UI.vue'
import { doAction } from '@/models/doAction';
import { useGameStore } from '@/stores/gameStore';
import { useResourceStore } from '@/stores/resourceStore';

let gameStore = useGameStore();
let resourceStore = useResourceStore();

let ui_ref = ref<InstanceType<typeof UI>>();



function test(){
    
}

</script>
