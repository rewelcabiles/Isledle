<template>
    <div class="overflow-auto grid grid-cols-4">
        <div v-for="(location, label, index) in store.locations.data" :key="index" class="flex flex-col">
            <template v-if="location.unlocked">
                <p class="border-b-2 mb-2">{{ label }}</p>
                <GatherButton
                :drop_table="location.dropTable"
                label="Gather" />
                
                <GatherButton
                v-if="location.unlocked"
                :drop_table="location.specialDropTable"
                :label="location.specialInteractName" />
            </template>
        </div>
    </div>

</template>
<script setup lang='ts'>
import GatherButton from '@/components/UI/Actions/Locations/ActionsGatherButton.vue';
import { mainStore } from '@/stores/mainStore';
const store = mainStore();




</script>
