<template>
    <div class="flex flex-col grow ">
        <div v-for="(resource, index) in store.resources.data" :key="index">
            <transition name="el-fade-in-linear">
                <div class="w-full mb-2 shadow-md p-3">
                    <div class="flex flex-row align-middle text-sm">
                        <div>
                            <p class="font-bold">{{ resource.name }}</p>
                            <p class="">unlocked: <span :class="{'text-green-600': resource.unlocked, 'text-red-600': !resource.unlocked}">{{ resource.unlocked }}</span></p>
                        </div>
                        <el-button class="ml-auto text-xs" type="danger" link icon="minus" @click="store.resources.store.deleteResource(resource.name)">Delete</el-button>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { mainStore } from '@/stores/mainStore';
const store = mainStore();

</script>