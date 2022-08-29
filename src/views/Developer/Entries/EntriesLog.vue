<template>
    <div>
        <el-input placeholder="Search" class="pb-5" suffix-icon="Search" v-model="searchFilter"></el-input>
        <el-collapse v-for="(log, id, index) in logStore.data" :key="index">
            <transition name="el-fade-in-linear">
                <el-collapse-item v-if="log.id.includes(searchFilter)" :name="id" class="mb-2">
                    <template #title class="card-header flex flex-row">
                        <el-button type="danger" link icon="minus" @click="deleteLog(id as string)"/>
                        <span class="ml-2 font-bold">{{ id }} </span>
                    </template >
                    <p class="mb-2">{{ log.text }}</p>
                    <div class="flex flex-row space-x-3">
                        <div v-for="(option, index) in log.options" :key="index">
                            <el-popover
                                placement="top-start"
                                title="Actions"
                                :width="400"
                                trigger="hover"
                            >
                                <template #reference>
                                    <p class="text-sm cursor-pointer underline">
                                        {{ option.label }}
                                    </p>
                                </template>
                                <div class="flex flex-row space-x-2">
                                    <div v-for="action in option.actions">
                                        {{ action }}
                                    </div>
                                </div>
                            </el-popover>
                        </div>
                    </div>
                </el-collapse-item>
            </transition>
        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { LogStore } from '@/stores/store';
import { ref } from 'vue'

let logStore = LogStore();
let searchFilter = ref('')

function deleteLog(id : string) {
    logStore.removeLogFromData(id);
}

</script>