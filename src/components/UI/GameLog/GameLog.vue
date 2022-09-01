<template>
    <div class="flex flex-col pointer-events-auto">
        <Transition name="el-fade-in-linear">
            <div v-show="store.flags.data.intro_1" class="flex flex-col">
                <p class="mx-auto py-2 uppercase"> {{ game_config.game_name }} </p>
                <hr/>
                <div class="flex flex-row p-2">
                    Day: {{ store.gameStore.raw_day }}
                    <div class="ml-auto">
                        Time: {{ store.gameStore.time }}
                    </div>
                </div>
                <hr/>
            </div>
        </Transition>
        <div class="flex flex-col-reverse overflow-auto">
            <div>
                <TransitionGroup name="el-fade-in-linear">
                    <div v-for="(log, index) in store.logs.store.logs" :key="index" class="py-1 px-3 rounded-md mb-2">
                        <p> {{ log.text }}</p>
                        <div v-if="log.options.length > 0 && !log.disabled" class="flex flex-row space-x-3 px-2">
                            <a
                            v-for="(option, index) in log.options"
                            :key="index"
                            class="text-zinc-500 hover:text-zinc-600 text-sm underline cursor-pointer"
                            @click="store.actionStore.sendActionsToBus(option.actions); log.disabled = true; store.gameStore.incrementTime()">
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
import game_config from '@/config/game_config.json'
import { mainStore } from '@/stores/mainStore';
const store = mainStore();

</script>
