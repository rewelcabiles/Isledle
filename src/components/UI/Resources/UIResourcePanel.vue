<template>
<div class="flex flex-col pointer-events-auto">
        <Transition name="el-fade-in-linear">
            <div v-if="store.flags.data.intro_1" class="flex flex-col">
                <p class="mx-auto py-2 uppercase"> Your {{ store.gameStore.base_type }} </p>
                <hr>
                <div class="flex flex-row p-2">
                    Resources
                </div>
                <hr>
            </div>
        </Transition>
        <ResourceSummaryVue/>
    </div>
</template>
<script setup lang="ts">
import ResourceSummaryVue from './ResourceSummary.vue';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();
</script>