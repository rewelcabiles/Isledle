<template>
    <div>
        <el-button type="primary"  @click="startHarvest" plain>
            {{ label }}
        </el-button>
        <el-progress v-if="state.is_harvesting" class="w-100 mt-2" :percentage="state.percentage" :show-text="false" />
    </div>

</template>
<script setup lang='ts'>
import { useResourceStore } from '@/stores/resourceStore';
import { useGameStore } from '@/stores/gameStore';
import { reactive, ref } from 'vue';

const resourceStore = useResourceStore();
const gameStore = useGameStore();

const step = 4;

const props = defineProps({
    label: {
        type: String,
        default: '',
    },

    resource_name: {
        type: String,
        default: '',
    }
})

const state = reactive({
    is_harvesting: false,
    percentage: 0,
});

const emit = defineEmits(['harvested'])

function endharvest() {
    resourceStore.modifyResource({
        name: props.resource_name,
        modify: 'add',
        value: 1
    });
    state.is_harvesting = false;
    state.percentage = 0;
    emit('harvested');
}

function startHarvest() {
    if (state.is_harvesting) {
        return;
    }
    gameStore.incrementTime();
    state.is_harvesting = true;
    setTimeout(harvestStep, 120);
}

function harvestStep() {
    state.percentage = state.percentage + 4;
    if (state.percentage > 120) {
        endharvest();
    } else {
        setTimeout(harvestStep, 120);
    }
}

</script>
<style scoped>

</style>