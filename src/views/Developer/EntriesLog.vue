<template>
    <div class="h-full overflow-show">
        <el-input size="small" class="pb-5" suffix-icon="Search" v-model="searchFilter"></el-input>
        <div v-for="(log, id, index) in developerStore.log_data" :key="index">
            <transition name="el-fade-in-linear">
                <el-card v-if="log.id.includes(searchFilter)" class="w-full mb-2">
                    <template #header>
                        <div class="card-header flex flex-row">
                            <span class="mr-auto"> {{ id }} </span>
                            <el-button type="danger" link icon="minus" @click="deleteLog(id as string)" >Delete</el-button>
                        </div>
                    </template>
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
                </el-card>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDeveloperStore } from '@/stores/developerStore';
import { ref } from 'vue'

let developerStore = useDeveloperStore();
let searchFilter = ref('')

function deleteLog(id : string) {
    developerStore.removeLog(id);
}

</script>