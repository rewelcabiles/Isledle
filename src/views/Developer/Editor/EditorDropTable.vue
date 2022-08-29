<template>
    <div class="flex flex-col h-100 w-100">
        <DynamicFormVue
        class="mb-5"
        :formTemplate="idForm"
        :form="newForm"
        :existingList="Object.keys(dropTableStore.data)"
        
        existingKey="id"
        @save-clicked="dropTableStore.saveDropTable(JSON.parse(JSON.stringify(newForm)))"
        @is-updatable="updateForm()"
        >

            <template v-slot:buttons>
                <div class="flex flex-row mt-5">
                    <el-button  @click="createNewTableEntry()" type="primary" class="w-full" icon="Plus"> Add a resource </el-button>
                </div>
            </template>

        </DynamicFormVue>
        <div v-for="(form, index) in newForm.table" class="py-4 border-y-2">
            <DynamicFormVue
            :form-template="form"
            :form="form"
            :showSave="false"
            formKey="name">

            <template v-slot:buttons>
                <div class="flex flex-row mt-5">
                    <el-button  @click="newForm.table.splice(index, 1)" type="danger" class="w-full" icon="Minus"> Remove Resource </el-button>
                </div>
            </template>

            </DynamicFormVue>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropTableInterface, DropTableEntryInterface } from '@/stores/dropTableStore';
import DynamicFormVue from '@/components/Developer/DynamicForm.vue';
import { onMounted, reactive, ref } from 'vue';
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


function updateForm(){
    let existing = JSON.parse(JSON.stringify(dropTableStore.data[newForm.id]));
    newForm.id = existing.id
    newForm.table = existing.table
}

</script>
