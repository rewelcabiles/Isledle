<template>
    <div>
        <el-button type="primary" link  @click="startHarvest">
            {{ label }}
        </el-button>
        <el-progress v-visible="state.is_harvesting" class="mt-2 w-2/3" :percentage="percentage" :show-text="false" />
    </div>

</template>
<script setup lang='ts'>
import { reactive, ref } from 'vue';
import type { argRollDropTableInterface } from '@/models/actionInterfaces';

import { mainStore } from '@/stores/mainStore';
const store = mainStore();


const step = 8;

const vVisible = {
    updated: (el: any, binding: any) => el.style.visibility = !!binding.value ? 'visible' : 'hidden',
    mounted: (el: any, binding: any) => el.style.visibility = !!binding.value ? 'visible' : 'hidden',
}

const props = defineProps({
    label: {
        type: String,
        default: '',
    },

    resource_name: {
        type: String,
        default: '',
    },

    drop_table: {
        type: String,
        default: ''
    }
})

const percentage = ref(0);

const state = reactive({
    is_harvesting: false
});

const emit = defineEmits(['harvested'])

function endharvest() {
    store.actionStore.sendActionsToBus([{
        "type": "rollDropTable",
        "args": {
            "id": props.drop_table
        } as argRollDropTableInterface
    }]);
    setTimeout(() => {
        state.is_harvesting = false;
        percentage.value = 0;
    }, 500)
    emit('harvested');
}

function startHarvest() {
    if (state.is_harvesting) {
        return;
    }
    store.gameStore.incrementTime();
    state.is_harvesting = true;
    setTimeout(harvestStep, 120);
}

function harvestStep() {
    percentage.value += step;
    if (percentage.value >= 100) {
        percentage.value = 100
        endharvest();
    } else {
        setTimeout(harvestStep, 120);
    }
}

</script>
<style scoped>
</style>