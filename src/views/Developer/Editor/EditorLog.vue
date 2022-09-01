<template>
    <div class="flex flex-col h-full text-sm">
        
        <el-row>
            <el-col :span="3">
                <div class="text-right mr-2">ID</div>
            </el-col>
            <el-col :span="21">
                <el-input size="small" v-model="log_form.id" @input="checkIfIDExists()"></el-input>
            </el-col>
        </el-row>

        <el-row class="mt-2">
            <el-col :span="3">
                <div class="text-right mr-2">Text</div>
            </el-col>
            <el-col :span="21">
                <el-input type="textarea" v-model="log_form.text"></el-input>
            </el-col>
        </el-row>

        <el-row class="mt-2">
            <el-col :span="3">
            </el-col>
            <el-col :span="21">
                <el-button :disabled="log_form.id == ''" v-if="!isUpdateMode" type="primary" class="ml-auto w-full" icon="check" @click="saveLog()">Save Log</el-button>
                <el-button :disabled="log_form.id == ''" v-else type="warning" class="ml-auto w-full" icon="check" @click="saveLog()">Update Log</el-button>
            </el-col>
        </el-row>

        
        <div class="flex flex-row my-4">
            
        </div>
        
        <el-row>
            <el-col :span="3">
            </el-col>
            <el-col :span="21">
                <div class=" flex flex-row">
                    Replies (Optional)
                    <el-button class="ml-auto" type="primary" link @click="addLogOption" icon="Plus">Add new choice</el-button>
                </div>
            </el-col>
        </el-row>

        <div class="b-5 grow overflow-auto">
            <div class="mb-5 border-b-4" v-for="(option, index) in log_form.options">
                <div class="flex flex-row py-2">
                    <el-button class="ml-auto" type="danger" link @click="removeLogOption(index)" icon="minus">Choice</el-button>
                </div>
                <el-row>
                    <el-col :span="3">
                        <div class="text-right mr-2">
                            Label
                        </div>
                    </el-col>
                    <el-col :span="21">
                        <el-input v-model="option.label"></el-input>
                    </el-col>
                </el-row>
                <el-row class="py-2">
                    <el-col :span="3">
                        
                    </el-col>
                    <el-col :span="21">
                        <el-button class="w-full" type="primary" @click="addChoiceAction(index)" icon="Plus">Action</el-button>
                    </el-col>
                </el-row>
                
                <div v-for="(action, idx) in option.actions" class="py-3 border-b-2">
                    <el-row class="flex flex-row">
                        <el-col :span="3">
                            <div class="flex flex-row">
                                <el-button class="ml-auto mr-2" @click="removeAction(option.actions, idx)" type="danger" link icon="minus" />
                            </div>
                        </el-col>
                        <el-col :span="21">
                            <el-select class="w-full" size="small" placeholder="Action Type" v-model="option.actions[idx]">
                                <el-option v-for="(value, key, index) in store.actionStore.getActionTypes()" :value="value" :key="index" :label="key" ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>

                    <el-row v-for="(args, key) in option.actions[idx].args" class="flex flex-row my-1">
                        <el-col :span="3">
                            <p class="mt-1 px-2 text-right">{{ key }}</p>
                        </el-col>
                        <el-col :span="21">
                            <el-input size="small" v-if="(typeof args === typeof 'string')" v-model="option.actions[idx].args[key]" ></el-input>
                            <el-switch v-if="(typeof args === typeof true)"  v-model="option.actions[idx].args[key]" active-text="true" inactive-text="false"/>
                            <el-input-number v-if="(typeof args === typeof 1)" v-model="option.actions[idx].args[key]" ></el-input-number>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import type { ActionInterface } from '@/models/actionInterfaces';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();


let log_form = reactive({
    id: '',
    text: '',
    options: [] as any,
});

let isUpdateMode = ref(false)

function addLogOption() {
    log_form.options.push({
        "label": "" as string,
        actions: [] as ActionInterface[]
    });
}

function addChoiceAction(index: number) {
    log_form.options[index].actions.push(reactive({}));
}

function removeLogOption(index:number) {
    log_form.options.splice(index, 1);
}

function removeAction(action: any[], index: number): void {
    action.splice(index, 1)
}

function saveLog(){
    mainStore().logs.addEntry({
        id: log_form.id,
        text: log_form.text,
        options: log_form.options,
        disabled: false
    })
    checkIfIDExists();
    clearForm();
}


function checkIfIDExists() {
    if (Object.keys(store.logs.data).includes(log_form.id)) {
        isUpdateMode.value = true;
        fetchData();
    } else {
        isUpdateMode.value = false;
    }
}

function fetchData() {
    let log = JSON.parse(JSON.stringify(store.logs.data[log_form.id]));
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