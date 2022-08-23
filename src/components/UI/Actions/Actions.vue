<template>
    <transition name="el-fade-in-linear">
        <div class="pointer-events-auto" v-if="hasVisibleTabs.value">
            <el-tabs tab-position="left" class="w-full">
                <template v-for="(tab, label, index) in tabs" :key="index">
                    <transition name="el-fade-in-linear">
                        <el-tab-pane class="transition-all duration-200" v-if="tab.visible" :label="label">
                            <component :is="tab.component" />
                        </el-tab-pane>
                    </transition>
                </template>
            </el-tabs>
        </div>
    </transition>
</template>
<script setup lang='ts'>
import { ref, reactive, computed } from 'vue';

import ActionsHarvestResources from './ActionsHarvestResources.vue';
import { useResourceStore } from '@/stores/resourceStore';

let resourceStore = useResourceStore();
let harvest_tab_visible = computed(() => resourceStore.unlockedResources)

const tabs = reactive({
    "Harvest Resources": {
        label: 'Harvest Resources',
        component: ActionsHarvestResources,
        visible: harvest_tab_visible,
    },
});

let hasVisibleTabs = reactive({
    value: computed(() => Object.values(tabs).filter(tab => tab.visible).length > 0),
});






</script>
