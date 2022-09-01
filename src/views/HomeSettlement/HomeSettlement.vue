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
import type { argShowLogInterface } from '@/models/actionInterfaces';

import { mainStore } from '@/stores/mainStore'
const store = mainStore()


let ui_ref = ref<InstanceType<typeof UI>>();



onMounted(() => {
    if (!store.flags.data['intro_started']){
        store.actionStore.sendActionsToBus([{
            "type": "showLog",
            "args": {
                "id": "lg_intro_1"
            } as argShowLogInterface
        }])
        store.flags.data['intro_started'] = true;
    }
})

</script>
