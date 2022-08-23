<template>
    <div class="h-full overflow-show">
        <div v-for="(value, key, index) in developerStore.flag_data" :key="index">
            <el-card class="w-full mb-2">
                <div class="flex flex-row align-middle text-sm">
                    <el-row class="w-full">
                        <el-col :span="15">
                            {{ key }}
                        </el-col>
                        <el-col :span="9">
                            <p :class="{ 'text-green-600': value, 'text-red-600': !value }">
                                {{ value }}
                            </p>
                        </el-col>
                    </el-row>
                    <el-button class="ml-auto" type="primary" link icon="minus" @click="removeFlag(key as string)">Delete</el-button>
                </div>
            </el-card>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useDeveloperStore, type FlagEntry } from '@/stores/developerStore';

let developerStore = useDeveloperStore();

function removeFlag(key: any) {
    developerStore.removeFlag(key);
}

</script>