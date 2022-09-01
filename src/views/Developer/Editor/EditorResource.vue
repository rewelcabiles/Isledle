<template >
    <div class="text-sm">
        <h1 class="font-bold">Resource Name</h1>
        <el-input class="mb-5 " v-model="resource_form.name" @input="checkIfExists"></el-input>
        <h1 class="font-bold">Default Stock</h1>
        <el-input-number class="mb-5" v-model="resource_form.stock" @input="checkIfExists"></el-input-number>
        <h1 class="font-bold">Unlocked</h1>
        <el-switch
        v-model="resource_form.unlocked"
        active-text="True"
        inactive-text="False"
        />

        <el-button :disabled="resource_form.name == ''" v-if="!resourceExists"  class="mt-5 w-full" type="primary" @click="addResource" icon="Plus">Add new resource</el-button>
        <el-button v-else class="mt-5 w-full" type="warning" @click="addResource" icon="Plus">Update resource</el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();

let resource_form = reactive({
    name: '',
    stock: 0,
    unlocked: false
});

function addResource() {
    store.resources.addEntry({
        name: resource_form.name,
        stock: resource_form.stock,
        unlocked: resource_form.unlocked
    });
    resource_form.name = '';
    resource_form.stock = 0;
    resource_form.unlocked = false;
    checkIfExists();
}

let resourceExists = ref(false);

function checkIfExists(){
    if(Object.keys(store.resources.data).includes(resource_form.name)){
        resourceExists.value = true;
        let existing_resource = store.resources.data[resource_form.name];
        resource_form.name = existing_resource.name;
        resource_form.stock = existing_resource.stock;
        resource_form.unlocked = existing_resource.unlocked;
    } else {
        resourceExists.value = false;
    }
}

</script>