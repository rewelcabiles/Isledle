<template>
    <div>
        <el-button type="primary" link  @click="startHarvest">
            {{ label }}
        </el-button>
        <el-progress v-if="state.is_harvesting" class="w-100 mt-2" :percentage="state.percentage" :show-text="false" />
    </div>

</template>
<script setup lang='ts'>
import { useResourceStore } from '@/stores/resourceStore';
import { useGameStore } from '@/stores/gameStore';
import { reactive } from 'vue';
import { ActionStore } from '@/stores/store';
import type { argModifyResourceInterface, argRollDropTableInterface } from '@/models/actionInterfaces';
import type { DropTableInterface } from '@/stores/dropTableStore';

const resourceStore = useResourceStore();
const gameStore = useGameStore();
const actionStore = ActionStore();

const step = 8;

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

const state = reactive({
    is_harvesting: false,
    percentage: 0,
});

const emit = defineEmits(['harvested'])

function endharvest() {
    actionStore.sendActionsToBus([{
        "type": "rollDropTable",
        "args": {
            "id": props.drop_table
        } as argRollDropTableInterface
    }]);
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
    state.percentage = state.percentage + step;
    if (state.percentage > 120) {
        endharvest();
    } else {
        setTimeout(harvestStep, 120);
    }
}

</script>
<style scoped>

</style>