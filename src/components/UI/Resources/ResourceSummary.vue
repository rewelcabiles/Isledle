<template>
    <div id="ui_resource_summary" class="pointer-events-auto flex flex-col">
        <div v-for="(resource, label, index) in store.resources.store.unlockedResources" class="px-2">
            <transition name="el-fade-in-linear">
                <template v-if="resource.unlocked">
                    <el-row class="">
                        <el-col :span="12">
                            {{ resource.name }} 
                        </el-col>
                        <el-col :span="12" class="flex flex-row">
                            <resource-summary-change :resource="resource.name" />
                            <div class="ml-auto">
                                {{ resource.stock }} / 5000
                            </div>
                        </el-col>
                    </el-row>
                </template>
            </transition>
        </div>
    </div>
</template>

<script setup lang='ts'>
import ResourceSummaryChange from './ResourceSummaryChange.vue';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();




</script>