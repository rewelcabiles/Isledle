<template>
    <div class="flex flex-row">
        <h1 class="font-bold mr-auto">ID</h1> 
    </div>
    <el-input class="mb-5" v-model="log_form.id" @input="checkIfIDExists()"></el-input>

    <h1 class="font-bold">Text</h1>
    <el-input type="textarea" v-model="log_form.text"></el-input>
    <el-switch
        v-model="createActionForLog"
        active-text="Generate Action For This Log?"
        inactive-text=""
        class="mt-5"
    />
    <el-button :disabled="log_form.id == ''" v-if="!isUpdateMode" type="primary" class="ml-auto w-full my-5" icon="check" @click="saveLog()">Save Log</el-button>
    <el-button :disabled="log_form.id == ''" v-else type="warning" class="ml-auto w-full my-5" icon="check" @click="saveLog()">Update Log</el-button>
    <br>
    <div class="flex flex-row">
        Replies (Optional)
        <el-button class="ml-auto" type="primary" link @click="addLogOption" icon="Plus">Add new option</el-button>
    </div>
    <el-card class="my-5 px-6" v-for="(option, index) in log_form.options">
        <div class="flex flex-row">
            <h1 class="font-bold mr-auto">Label</h1>
            <el-button class="ml-4" type="danger" link @click="removeLogOption(index)" icon="minus">Remove reply</el-button>
        </div>
        <el-input v-model="option.label"></el-input>
        <h1 class="font-bold mt-5">Actions</h1>
        <el-select v-model="option.actions" placeholder="Select" class="w-full" :multiple="true" :filterable="true">
            <el-option v-for="action in developerStore.action_data" :key="action.id" :label="action.id" :value="action.id" />
        </el-select>
    </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useDeveloperStore } from '@/stores/developerStore';
import type { Action } from '@/models/doAction';

let developerStore = useDeveloperStore();

let log_form = reactive({
    id: '',
    text: '',
    options: [] as any[]
});

let isUpdateMode = ref(false)
let createActionForLog = ref(true)

function addLogOption() {
    log_form.options.push({
        label: '' as string,
        actions: [] as Action["id"][]
    });
}

function removeLogOption(index:number) {
    log_form.options.splice(index, 1);
}

function saveLog(){
    developerStore.addLog(JSON.parse(JSON.stringify(log_form)))
    if (createActionForLog) {
        saveLogAsAction()
    }
    clearForm();
}

function saveLogAsAction() {
    developerStore.addAction({
        id: 'log_action_' + log_form.id,
        type: 'log',
        args: {
            id: log_form.id
        }
    })
}

function checkIfIDExists() {
    if (Object.keys(developerStore.log_data).includes(log_form.id)) {
        isUpdateMode.value = true;
        fetchData();
    } else {
        isUpdateMode.value = false;
    }
}

function fetchData() {
    let log = JSON.parse(JSON.stringify(developerStore.log_data[log_form.id]));
    log_form.id = log.id;
    log_form.text = log.text;
    log_form.options = log.options;
}

function clearForm() {
    log_form.id = "";
    log_form.text = "";
    log_form.options = [];

}

</script>