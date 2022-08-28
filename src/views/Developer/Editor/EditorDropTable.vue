<template>
    <div class="flex flex-col h-100 w-100">
        <DynamicFormVue :formTemplate="idForm" :form="newForm"/>
        <div class="flex flex-row">
            <el-button  @click="saveDropTable()" type="success" class="w-full"> Save </el-button>
            <el-button  @click="createNewTableEntry()" type="primary" class="w-full"> Add a resource </el-button>
        </div>
        <div v-for="(form, index) in newForm.table" class="py-4 border-b-4">
            <DynamicFormVue
            :formTemplate="form"
            :form="form"/>
        </div>
        {{ newForm }}
    </div>
</template>

<script setup lang="ts">
import type { DropTableInterface, DropTableEntryInterface } from '@/stores/dropTableStore';
import DynamicFormVue from '@/components/Form/DynamicForm.vue';
import { reactive } from 'vue';
import { DropTableStore } from '@/stores/store';

const dropTableStore = DropTableStore();

let idForm = reactive({
    id: ''
})

let newForm = reactive({
    id: '',
    table: [] as DropTableEntryInterface[]
});

function createNewTableEntry(){
    newForm.table.push(JSON.parse(JSON.stringify({
        name: '',
        maxQuantity: 1,
        chance: 64
    })));
}

function saveDropTable(){
    dropTableStore.saveDropTable(newForm)
}

</script>
