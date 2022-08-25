<template>
    <div class="text-sm">
        <h1 class="font-bold">Flag Name</h1>
        <el-input placeholder="flag_here" v-model="flag_form.id" @input="checkIfFlagExists()" class="mb-2"></el-input>
        <h1 class="font-bold mt-5">Default State</h1>
        <el-switch
            v-model="flag_form.value"
            active-text="True"
            inactive-text="False"
        />
        <br>
        <el-button :disabled="flag_form.id == ''" v-if="!flag_exists" class="mt-5 w-full" type="primary"  @click="addFlag()" icon="Plus">Add new Flag</el-button>
        <el-button v-else class="mt-5 w-full" type="warning"  @click="addFlag()" icon="Edit">Update Flag</el-button>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue';
import { FlagStore } from '@/stores/store';

const flagStore = FlagStore();

let flag_exists = ref(false);
let flag_form = reactive({
    id: '',
    value: false,
});

function addFlag() {
    flagStore.setFlag({
        id: flag_form.id,
        value: flag_form.value,
    });

    flag_form.id = "";
    flag_form.value = false;
    checkIfFlagExists();
}

function checkIfFlagExists(){
    if (Object.keys(flagStore.flag_data).includes(flag_form.id)){
        flag_exists.value = true;
    } else {
        flag_exists.value = false;
    }
}

</script>