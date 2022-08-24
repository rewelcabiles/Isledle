<template>
    <div id="ui_resource_summary" class="pointer-events-auto grid grid-cols-2">
        <div v-for="(resource, label, index) in resourceStore.resource_data">
            <transition name="el-fade-in-linear">
                <div v-if="resource.unlocked" class="p-2 rounded-l-md mb-1 ">
                    <el-row>
                        <el-col :span="12">
                            {{ resource.name }} 
                        </el-col>
                        <el-col :span="12">
                            {{ resource.stock }} / 5000
                        </el-col>
                    </el-row>
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