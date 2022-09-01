<template>
    <div class="flex flex-col flex-grow h-100 w-100">
        <DynamicFormVue
        class="mb-5"
        :formTemplate="dropTableIdForm"
        :form="form"
        :existingList="Object.keys(store.dropTables.data)"
        
        existingKey="id"
        @save-clicked="store.dropTables.addEntry(JSON.parse(JSON.stringify(form)))"
        @is-updatable="updateForm()"
        >

            <template v-slot:buttons>
                <div class="flex flex-row mt-5">
                    <el-button  @click="createNewTableEntry()" type="primary" class="w-full" icon="Plus"> Add a resource </el-button>
                </div>
            </template>

        </DynamicFormVue>
        <div class="h-100 pt-2 pb-20">
            <div v-for="(dtResource, index) in form.table" class="py-4 border-y-2">
                <DynamicFormVue
                :form-template="dropTableTableForm"
                :form="dtResource"
                :showSave="false"
                formKey="name">

                <template v-slot:buttons>
                    <div class="flex flex-row mt-5">
                        <el-button  @click="form.table.splice(index, 1)" type="danger" class="w-full" icon="Minus"> Remove Resource </el-button>
                    </div>
                </template>

                </DynamicFormVue>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { DropTableEntryInterface } from '@/stores/dropTableStore';
import DynamicFormVue from '@/components/Developer/DynamicForm.vue';
import { reactive, ref } from 'vue';
import { mainStore } from '@/stores/mainStore';
import {
    dropTableIdForm,
    dropTableTableForm,
    buildForm
} from '@/helper/formTemplates'
import { storeToRefs } from 'pinia';


const store = mainStore();


dropTableTableForm.name.autocomplete = (query: string, cb: Function) => { store.resources.query(query, cb)}

let form = reactive({
    id: '',
    table: [] as DropTableEntryInterface[]
});

function createNewTableEntry(){
    form.table.push(buildForm(dropTableTableForm));
}

function updateForm(){
    let existing = JSON.parse(JSON.stringify(store.dropTables.data[form.id]));
    form.id = existing.id
    form.table = existing.table
}

</script>
