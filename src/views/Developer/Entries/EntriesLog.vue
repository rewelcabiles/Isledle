<template>
    <div>
        <el-input placeholder="Search" class="pb-5" suffix-icon="Search" v-model="searchFilter"></el-input>
        <div v-for="(log, id, index) in developerStore.log_data" :key="index">
            <transition name="el-fade-in-linear">
                <div v-if="log.id.includes(searchFilter)" class="w-full mb-2 shadow-md p-3 rounded-md text-sm">
                    <div class="card-header flex flex-row">
                        <span class="mr-auto font-bold">{{ id }} </span>
                        <el-button type="danger" link icon="minus" @click="deleteLog(id as string)" >Delete</el-button>
                    </div>
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
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDeveloperStore } from '@/stores/developerStore';
import { LogStore, ResourceStore } from '@/stores/store';
import { ref } from 'vue'

let developerStore = useDeveloperStore();
let logStore = LogStore();
let searchFilter = ref('')

function deleteLog(id : string) {
    logStore.removeLogFromData(id);
}

</script>