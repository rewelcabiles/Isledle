<template lang="">
    <div v-if="is_visible" class="transition-all duration-700 flex flex-row h-screen w-screen fixed">
        <div class="w-1/3 relative h-100 overflow-auto">
            <pre>{{ JSON.stringify(store.actionStore.messageBus.eventList, null, '\t') }}</pre>
            
        </div>
        <div class="w-1/2 relative flex flex-col border-l-2">
            <GameLog class="h-1/2" />
            <Actions class="h-1/2" />
        </div>
        <div class="w-1/3 relative ">
            <UIResourcePanel />
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';

import UIResourcePanel from '@/components/UI/Resources/UIResourcePanel.vue';
import ResourceSummary from "@/components/UI/Resources/ResourceSummary.vue"
import Actions from "@/components/UI/Actions/Actions.vue"
import GameLog from "@/components/UI/GameLog/GameLog.vue"

import { mainStore } from '@/stores/mainStore';
const store = mainStore();




const is_visible = ref(true);


const show = () => {
    is_visible.value = true;
}

function hide() {
    is_visible.value = false;
}

defineExpose({
    show,
    hide,
    is_visible
});

</script>
<style>


</style>