<template>
    <div class="max-w-md p-2">
        <div v-for="(value, label, index) in resourceStore.resource" :key="index" class="bg-slate-50 opacity-80 p-2 rounded-md">
            <p class="text-slate-800">
                {{ label }}: {{ value }}
            </p>
        </div>
    </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
import { useResourceStore } from '@/stores/resourceStore';

export default defineComponent({ 
    data() {
        return {
            resourceStore: useResourceStore(),
        };
    },
});

</script>
<style scoped>

</style>