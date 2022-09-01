<template>
    <transition name="el-fade-in-linear">
        <div
        v-if="visible"
        :class="{
            'text-green-600': value > 0,
            'text-red-600': value < 0
        }"
        >
            {{ value > 0 ? '+' : '-' }}{{ value }}
        </div>
    </transition>
</template>
<script setup lang="ts">
import type { argModifyResourceInterface } from '@/models/actionInterfaces';
import { MessageBus } from '@/models/MessageBus';
import { ref } from 'vue';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();

const props = defineProps({
    resource: {
        type: String,
        default: ''
    }
})

const value = ref(0);
const visible = ref(false);
const durationInSeconds = 3;

const messageBus = new MessageBus({
    "modifyResource": Check
});
store.actionStore.messageBus.attach(messageBus)

let timer: any;
function Check(arg: argModifyResourceInterface){
    if( arg.name == props.resource){
        if (timer){
            clearTimeout(timer)
        }
        value.value = arg.value
        visible.value = true
        timer = setTimeout(() => {
            visible.value = false
        }, durationInSeconds * 1000);
    }
}

</script>
