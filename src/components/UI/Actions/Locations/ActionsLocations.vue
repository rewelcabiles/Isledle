<template>
    <div class="overflow-auto flex flex-wrap">
        <div v-for="(location, label, index) in locationStore.data" :key="index" class="flex flex-col">
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
import type { argShowLogInterface } from '@/models/actionInterfaces';
import { useLocationStore } from '@/stores/locationStore';
import { ActionStore, LogStore } from '@/stores/store';
const locationStore = useLocationStore();



</script>
