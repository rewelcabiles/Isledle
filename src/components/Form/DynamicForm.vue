<template>
    <div>

        <template v-for="input, key in formTemplate">
            <el-row class="mb-5">
                <el-col class="pr-2 pt-1" :span="labelWidth">
                    <p class="text-sm">{{ key }}</p>
                </el-col>
                <el-col :span="24 - labelWidth">
                    <el-input v-model="form[key]" v-if="(typeof input === typeof 'string')"></el-input>
                    <el-input-number v-model="form[key]" v-else-if="(typeof input === typeof 1)"></el-input-number>
                    <el-select v-model="form[key].value" v-else-if="(typeof input === typeof {})">
                        <el-option v-for="(val, key, index) in input.options" :value="val"> {{ key }} </el-option>
                    </el-select>
                    <el-switch v-if="(typeof input === typeof true)" v-model="form[key]" active-text="True" inactive-text="False" />
                </el-col>
            </el-row>
        </template>
    </div>
</template>

<script setup lang="ts">

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
        default: 5
    }
});

</script>