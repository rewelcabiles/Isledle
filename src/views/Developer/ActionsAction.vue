<template>
    <div class="pb-4 flex flex-row">
        <el-icon color="gray" class="mt-1 mr-2"><Filter /></el-icon>
        <div class="mr-auto">
            <el-select v-model="type_filter" placeholder="Type Filter" size="small">
                <el-option value="All">All</el-option>
                <el-option v-for="(type, index) in Object.values(developerStore.actions_map_data)" :key="index" :value="type.type">
                    {{ type.type }}
                </el-option>
            </el-select>
        </div>
        <div>
            <el-input size="small" suffix-icon="Search" v-model="searchFilter"></el-input>
        </div>
    </div>
    <div v-for="(action, id, index) in developerStore.action_data" :key="index" class="py-2 text-sm">
        <transition name="el-fade-in-linear">
            <el-card v-if="(action.type == type_filter || type_filter === 'All') && action.id.includes(searchFilter)" class="box-card" >
                <template #header>
                    <div class="card-header flex flex-row">
                        <span class="mr-auto"> {{ action.id }} </span>
                        <el-button type="danger" link icon="minus" @click="removeAction(id as string)">Delete</el-button>
                    </div>
                </template>
                <el-row>
                    <el-col :span="6">
                        <div class="font-bold text-right pr-5">type: </div>
                    </el-col> 
                    <el-col :span="14">{{ action.type }}</el-col>
                </el-row>
                <el-row v-for="(value, key, index) in action.args" :key="index" class="">
                    <el-col :span="6">
                        <div class="font-bold text-right pr-5">{{ key }}: </div>
                    </el-col> 
                    <el-col :span="14">{{ value }}</el-col>
                </el-row>
            </el-card>
        </transition>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDeveloperStore } from '@/stores/developerStore';

let developerStore = useDeveloperStore();
let type_filter = ref('All');
let searchFilter = ref('');

function removeAction(id: string){
    developerStore.removeAction(id);
}


</script>