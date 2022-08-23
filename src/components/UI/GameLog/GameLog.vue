<template>
    <div class="flex flex-col pointer-events-auto">
        <Transition name="el-fade-in-linear">
            <div v-show="progressStore.flags.intro_1" class="flex flex-col">
                <p class="mx-auto py-2"> Your {{ gameStore.base_type }}</p>
                <hr class="border-zinc-500">
                <div class="flex flex-row p-2">
                    Day: {{ gameStore.raw_day }}
                    <div class="ml-auto">
                        Time: {{ gameStore.time }}
                    </div>
                </div>
                <hr class="border-zinc-500 mb-2">
            </div>
        </Transition>
        <div class="flex flex-col-reverse overflow-auto">
            <div>
                <TransitionGroup name="el-fade-in-linear">
                    <div v-for="(log, index) in logStore.logs" :key="index" class="py-1 px-3 rounded-md mb-2">
                        <p> {{ log.message }}</p>
                        <div v-if="log.options.length > 0 && !log.disabled" class="flex flex-row space-x-3 px-2">
                            <a
                            v-for="(option, index) in log.options"
                            :key="index"
                            href="#"
                            class="text-zinc-500 hover:text-zinc-600 text-sm underline"
                            @click="actionStore.doActions(option.actions); log.disabled = true; gameStore.incrementTime()">
                                {{ option.label }}
                            </a>
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </div>
    </div>
</template>
<script setup lang='ts'>
import { useGameStore } from '@/stores/gameStore';

import { useProgressionStore } from '@/stores/progressionStore';
import { useActionStore } from '@/stores/actionStore';
import { useLogStore } from '@/stores/logStore';

let actionStore = useActionStore();
let progressStore = useProgressionStore();
let gameStore = useGameStore();
let logStore = useLogStore();


logStore.addLog('intro_1')

</script>
