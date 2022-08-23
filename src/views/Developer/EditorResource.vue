<template>
    <h1 class="font-bold">Resource Name</h1>
    <el-input v-model="resource_form" @input="checkIfExists"></el-input>
    <el-button :disabled="resourceExists"  class="mt-5 w-full" type="primary" @click="addResource" icon="Plus">Add new resource</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useDeveloperStore } from '@/stores/developerStore';

let developerStore = useDeveloperStore();
let resource_form = ref('');

function addResource() {
    developerStore.addToResource(resource_form.value);
}

let resourceExists = ref(false);

function checkIfExists(){
    if(developerStore.resource_data.includes(resource_form.value)){
        resourceExists.value = true;
    } else {
        resourceExists.value = false;
    }
}

</script>