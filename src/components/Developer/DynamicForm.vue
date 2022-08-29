<template>
    <div>
        <template v-for="input, key in formTemplate">
            <el-row class="mb-5">
                <el-col class="pr-2 pt-1" :span="labelWidth">
                    <p class="text-sm text-right">{{ key }}</p>
                </el-col>
                <el-col :span="24 - labelWidth">
                    <el-input @input="checkIfExists(key)" v-model="form[key]" v-if="(typeof input === typeof 'string')"></el-input>
                    <el-input-number @input="checkIfExists(key)" v-model="form[key]" v-else-if="(typeof input === typeof 1)"></el-input-number>
                    <el-select @input="checkIfExists(key)" v-model="form[key].value" v-else-if="(typeof input === typeof {})">
                        <el-option v-for="(val, key, index) in input.options" :value="val"> {{ key }} </el-option>
                    </el-select>
                    <el-switch @input="checkIfExists(key)" v-if="(typeof input === typeof true)" v-model="form[key]" active-text="True" inactive-text="False" />
                </el-col>
            </el-row>
        </template>
        <el-row>
            <el-col :span="labelWidth" />
            <el-col :span="24 - labelWidth">
                <div class="flex flex-row mb-2" v-if="showSave == true">
                    <el-button
                    class="mx-auto w-full"
                    :type="inExistingList ? 'warning' : 'success'"
                    :icon="inExistingList ? 'Edit' : 'Plus'"
                    @click="$emit('saveClicked')"
                    >
                        {{ inExistingList ? "Update" : "Save" }}
                    </el-button>
                </div>
                <slot name="buttons"></slot>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref, type PropType } from 'vue';

const emit = defineEmits(['saveClicked', 'isUpdatable'])

const props = defineProps({
    form: {
        type: Object,
        default: {}
    },

    formTemplate: {
        type: Object,
        default: {}
    },

    labelWidth: {
        type: Number,
        default: 9
    },

    existingList: {
        type: Array as PropType<Array<String>>,
        default: []
    },

    existingKey: {
        type: String,
        default: ""
    },

    showSave: {
        type: Boolean,
        default: true
    }
});



let inExistingList = ref(false)
function checkIfExists(key: string){
    if (key != props.existingKey){
        return false;
    }
    if (props.existingList.includes(props.form[props.existingKey]) ){
        inExistingList.value = true;
        emit('isUpdatable')
    } else {
        inExistingList.value = false;
    }
}

</script>