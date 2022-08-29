<template>
<div class="flex flex-col pointer-events-auto">
        <Transition name="el-fade-in-linear">
            <div v-show="flagStore.data.intro_1" class="flex flex-col">
                <p class="mx-auto py-2 uppercase"> Your {{ gameStore.base_type }} </p>
                <hr class="border-zinc-500">
                <div class="flex flex-row p-2 bg_1 border-l-2 border-black">
                    Resources
                </div>
                <hr class="border-zinc-500 mb-2">
            </div>
        </Transition>
        <div class="flex flex-col-reverse overflow-auto">
            <div>
                <TransitionGroup name="el-fade-in-linear">
                    <ResourceSummaryVue class="" />
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { FlagStore, GameStore, LogStore } from '@/stores/store';
import ResourceSummaryVue from './ResourceSummary.vue';

const gameStore = GameStore();
const flagStore = FlagStore();

</script>