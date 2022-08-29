<template>
<div class="flex flex-col pointer-events-auto">
        <Transition name="el-fade-in-linear">
            <div v-if="flagStore.data.intro_1" class="flex flex-col">
                <p class="mx-auto py-2 uppercase"> Your {{ gameStore.base_type }} </p>
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
import { FlagStore, GameStore, LogStore } from '@/stores/store';
import ResourceSummaryVue from './ResourceSummary.vue';

const gameStore = GameStore();
const flagStore = FlagStore();

</script>