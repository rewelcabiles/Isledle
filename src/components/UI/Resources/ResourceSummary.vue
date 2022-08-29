<template>
    <div id="ui_resource_summary" class="pointer-events-auto flex flex-col gap-2">
        <div v-for="(resource, label, index) in resourceStore.unlockedResources" class="px-2 mb-1 ">
            <transition name="el-fade-in-linear">
                <template v-if="resource.unlocked">
                    <el-row>
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
import { defineComponent } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';
import ResourceSummaryChange from './ResourceSummaryChange.vue';

const resourceStore = useResourceStore();


</script>