<template>
    <div>
        <DynamicFormVue :formTemplate="form" :form="newForm"></DynamicFormVue>
        {{ newForm }}
    </div>  
</template>

<script setup lang="ts">
import type { DropTableInterface } from '@/stores/dropTableStore';
import DynamicFormVue from '@/components/Form/DynamicForm.vue';
import { reactive } from 'vue';

let form = reactive({
    stringVar: 'test',
    intVar: 123,
    selectVar: {
        'value': '',
        'options': {
            'One': 1,
            'Two': 2,
            'three': 3
        }
    },
    boolVar: true
})

let newForm = reactive({
    ...form
});

</script>
