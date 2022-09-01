<template>
    <div class="flex flex-col flex-grow h-100 w-100">
        <DynamicFormVue
        class="mb-5"
        :formTemplate="idForm"
        :form="newForm"
        :existingList="Object.keys(store.dropTables.data)"
        
        existingKey="id"
        @save-clicked="store.dropTables.store.saveDropTable(JSON.parse(JSON.stringify(newForm)))"
        @is-updatable="updateForm()"
        >

            <template v-slot:buttons>
                <div class="flex flex-row mt-5">
                    <el-button  @click="createNewTableEntry()" type="primary" class="w-full" icon="Plus"> Add a resource </el-button>
                </div>
            </template>

        </DynamicFormVue>
        <div class="h-100 pt-2 pb-20">
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
    </div>
</template>

<script setup lang="ts">
import type { DropTableEntryInterface } from '@/stores/dropTableStore';
import DynamicFormVue from '@/components/Developer/DynamicForm.vue';
import { reactive } from 'vue';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();


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
    let existing = JSON.parse(JSON.stringify(store.dropTables.data[newForm.id]));
    newForm.id = existing.id
    newForm.table = existing.table
}

</script>
