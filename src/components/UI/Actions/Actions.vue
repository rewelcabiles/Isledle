<template>
    <transition name="el-fade-in-linear">
        <div class="pointer-events-auto" v-if="hasVisibleTabs.value">
            <el-tabs tab-position="left" class="w-full" >
                <template v-for="(tab, label, index) in tabs" :key="index">
                    <transition name="el-fade-in-linear">
                        <el-tab-pane :key="index" class="transition-all duration-200 px-10" v-if="tab.visible" :label="label">
                            <component :is="tab.component" />
                        </el-tab-pane>
                    </transition>
                </template>
            </el-tabs>
        </div>
    </transition>
</template>
<script setup lang='ts'>
import { reactive, computed } from 'vue';

import ActionsHarvestResources from './Locations/ActionsLocations.vue';
import { useResourceStore } from '@/stores/resourceStore';

let resourceStore = useResourceStore();


const tabs = {
    "Locations": {
        label: 'Locations',
        component: ActionsHarvestResources,
        visible: computed(() => resourceStore.isUnlocked),
    },
};

let hasVisibleTabs = reactive({
    value: computed(() => Object.values(tabs).filter(tab => tab.visible).length > 0),
});






</script>
