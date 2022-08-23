<template>
    <div id="ui_resource_summary" class="pointer-events-auto py-2">
        <div v-for="(resource, label, index) in resourceStore.resource">
            <transition name="el-fade-in-linear">
                <div 
                v-if="resource.unlocked"
                :key="index"
                class="bg-slate-50 opacity-80 p-3 rounded-l-md mb-1 w-full">
                    <el-popover
                    placement="left-start"
                    :title="resource.name"
                    :width="240"
                    trigger="hover">
                        <template #reference>
                            <p class="text-slate-800 flex flex-row">
                                {{ resource.name[0].toUpperCase() + resource.name.substring(1) }} {{ resource.stock }}
                            </p>
                        </template>
                        <div>
                            Manual Harvest Speed: {{ resource.manual_harvest_speed }}
                        </div>
                    </el-popover>
                </div>
            </transition>
        </div>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';

export default defineComponent({ 
    data() {
        return {
            resourceStore: useResourceStore(),
        };
    },
});

</script>