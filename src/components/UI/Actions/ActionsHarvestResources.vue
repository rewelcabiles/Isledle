<template>
    <div class="overflow-show flex flex-wrap space-x-4 p-1">
        <div v-for="(resource, label, index) in resourceStore.resource" :key="index">
            <HarvestButton v-if="resource.unlocked" :resource_name="resource.name" :label="`Harvest ${resource.name}`" />
        </div>
    </div>
</template>
<script setup lang='ts'>
import { reactive } from 'vue';
import HarvestButton from '@/components/UI/Resources/HarvestButton.vue';
import { useResourceStore } from '@/stores/resourceStore';

const resourceStore = useResourceStore();

</script>
