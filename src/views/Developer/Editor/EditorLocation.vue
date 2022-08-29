
<template>
    <DynamicFormVue
    :form-template="templateForm"
    :form="form"
    :existingList="Object.keys(locationStore.data)"
    formKey="name"/>
</template>
<script setup lang="ts">
import DynamicFormVue from '@/components/Developer/DynamicForm.vue';
import { useLocationStore } from '@/stores/locationStore';
import { reactive } from 'vue';

const locationStore = useLocationStore()


let templateForm = reactive({
    "name": "",
    "specialInteractName": "",
    "dropTable": "",
    "specialDropTable": ""
});

let form = reactive({

});

</script>
