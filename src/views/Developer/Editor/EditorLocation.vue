
<template>
    <DynamicFormVue
    :form-template="templateForm"
    :form="form"
    :existingList="Object.keys(locationStore.data)"
    @is-updatable="updateForm"
    @save-clicked="locationStore.addLocation(JSON.parse(JSON.stringify(form)))"
    existingKey="name"/>
</template>
<script setup lang="ts">
import DynamicFormVue from '@/components/Developer/DynamicForm.vue';
import { useLocationStore } from '@/stores/locationStore';
import { reactive, ref } from 'vue';

const locationStore = useLocationStore()


let templateForm = reactive({
    "name": "",
    "specialInteractName": "",
    "dropTable": "",
    "specialDropTable": "",
    "unlocked": false,
});

const form = reactive({
    name: "",
    unlocked: false,
    specialInteractName: "",
    dropTable: "",
    specialDropTable: ""
});

function updateForm(){
    let existing = JSON.parse(JSON.stringify(locationStore.data[form.name]));
    form.name = existing.name
    form.specialInteractName = existing.specialInteractName
    form.specialDropTable = existing.specialDropTable
    form.dropTable = existing.dropTable
    form.unlocked = existing.unlocked
}


</script>
