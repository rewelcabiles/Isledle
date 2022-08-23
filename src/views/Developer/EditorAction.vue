<template>
    <div>
        <div class="flex flex-row pb-3">
            <h1 class="font-bold text-lg">Action Details</h1>
            <p class="ml-auto pr-3 pt-1 text-sm">Action Type: </p>
            <el-select v-model="selected_action" placeholder="Select" @change="setActionOption()" class="w-1/3">
                <el-option v-for="(action_template, value, index) in developerStore.actions_map_data"
                    :key="index"
                    :label="value"
                    :value="value"
                />
            </el-select>
        </div>
        <div v-if="selected_action" class="text-sm">
            <div class="flex flex-row space-x-5">
                <div>
                    <h1 class="font-bold text-sm">ID</h1>
                    <el-input v-model="action_form.id" class="w-full" @input="checkForUpdate()"></el-input>
                </div>
                <div>
                    <h1 class="font-bold text-sm">Type</h1>
                    <el-input v-model="action_form.type" class="w-full" disabled></el-input>
                </div>
            </div>

            <el-card class="mt-5">
                <h1 class="font-bold text-lg pb-5">Args</h1>
                <div v-for="(data_type, arg_name, index) in developerStore.actions_map_data[selected_action].args" :key="index" class="pb-5">
                    <h1 class="font-bold text-sm"> {{ arg_name }} </h1>
                    <el-input v-if="data_type == 'string'" v-model="action_form.args[arg_name] as string" class="pb-2"></el-input>
                    <el-input v-if="data_type == 'number'" v-model="action_form.args[arg_name] as string" class="pb-2"></el-input>
                    <el-switch
                        v-if="data_type == 'boolean'"
                        v-model="action_form.args[arg_name]"
                        active-text="True"
                        inactive-text="False"
                    />
                </div>
            </el-card>
            <el-button v-if="!isUpdateMode" class="w-full mt-4" type="primary" icon="Plus" @click="addAction()">Create</el-button>
            <el-button v-else class="w-full mt-4" type="warning" icon="Edit" @click="addAction()">Update</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, type Ref } from 'vue';
import { useDeveloperStore } from '@/stores/developerStore';

let developerStore = useDeveloperStore();
let selected_action = ref('' as keyof typeof developerStore.actions_map_data);
let action_form = reactive({
    id: '',
    type: '',
    args: {} as { [key: string]: string | number | boolean },
});

function setActionOption(){
    action_form.type = developerStore.actions_map_data[selected_action.value].type;
    action_form.args = {};
    Object.keys(developerStore.actions_map_data[selected_action.value].args).forEach(element => {
        action_form.args[element] = ref('').value;
    });
    clearForm();
}

function addAction(){
    developerStore.addAction(JSON.parse(JSON.stringify(action_form)));
    clearForm();
}

function clearForm() {
    action_form.id = '';
    action_form.args = {};
}

let isUpdateMode = ref(false);

function checkForUpdate() {
    if(Object.keys(developerStore.action_data).includes(action_form.id)){
        isUpdateMode.value = true;
    } else {
        isUpdateMode.value = false;
    }
}

</script>