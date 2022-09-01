
<template>
    {{ store.locations.store.data }}
    <DynamicFormVue
    :form-template="locationForm"
    :form="form"
    :existingList="Object.keys(locationStore.data)"
    @is-updatable="updateForm"
    @save-clicked="store.locations.addEntry(JSON.parse(JSON.stringify(form)), 'name')"
    existingKey="name"/>
</template>
<script setup lang="ts">
import DynamicFormVue from '@/components/Developer/DynamicForm.vue';
import { useLocationStore } from '@/stores/locationStore';
import { reactive, ref } from 'vue';
import { mainStore } from '@/stores/mainStore';


import {
    locationForm,
    buildForm
} from '@/helper/formTemplates'
const store = mainStore();
const locationStore = useLocationStore()


const form = reactive(buildForm(locationForm));

function updateForm(){
    let existing = JSON.parse(JSON.stringify(store.locations.data[form.name]));
    form.name = existing.name
    form.specialInteractName = existing.specialInteractName
    form.specialDropTable = existing.specialDropTable
    form.dropTable = existing.dropTable
    form.unlocked = existing.unlocked
}


</script>
