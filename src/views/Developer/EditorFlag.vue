<template>
    <h1 class="font-bold">Flag Name</h1>
    <el-input placeholder="flag_here" v-model="flag_form.name" @input="checkIfFlagExists()" class="mb-2"></el-input>
    <h1 class="font-bold mt-5">Default State</h1>
    <el-switch
        v-model="flag_form.value"
        active-text="True"
        inactive-text="False"
    />
    <br>
    <el-button v-if="!flag_exists" class="mt-5 w-full" type="primary"  @click="addFlag()" icon="Plus">Add new Flag</el-button>
    <el-button v-else class="mt-5 w-full" type="warning"  @click="addFlag()" icon="Edit">Update Flag</el-button>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';

import { useDeveloperStore, type FlagEntry } from '@/stores/developerStore';


let developerStore = useDeveloperStore();

let flag_form = reactive({
    name: '',
    value: false,
});

function addFlag() {
    developerStore.addToFlagData({
        name: flag_form.name,
        value: flag_form.value,
    });

    flag_form.name = "";
    flag_form.value = false;
}

let flag_exists = ref(false);

function checkIfFlagExists(){
    
    if (Object.keys(developerStore.flag_data).includes(flag_form.name)){
        flag_exists.value = true;
    } else {
        flag_exists.value = false;
    }
}

</script>