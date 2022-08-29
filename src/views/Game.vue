<template >
    <div class="overflow-hidden">
        <HomeSettlement />
    </div>
</template>

<script setup lang="ts">
import HomeSettlement from "./HomeSettlement/HomeSettlement.vue"
import { DropTableStore } from "@/stores/store";

const dropTableStore = DropTableStore();


</script>
