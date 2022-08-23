<template>
    <div v-for="(resource, index) in developerStore.resource_data" :key="index" class="flex flex-row align-middle">
        
    </div>
    <div class="h-full overflow-show">
        
        <div v-for="(resource, index) in developerStore.resource_data" :key="index">
            <transition name="el-fade-in-linear">
                <el-card class="w-full mb-2">
                    <div class="flex flex-row align-middle text-sm">
                        <p class="pt-1 pl-2">{{ resource }}</p>
                        <el-button class="ml-auto" type="primary" link icon="minus" @click="removeResource(index)">Delete</el-button>
                    </div>
                </el-card>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useDeveloperStore } from '@/stores/developerStore';

let developerStore = useDeveloperStore();

function removeResource(index: number) {
    developerStore.removeResource(index);
}

</script>