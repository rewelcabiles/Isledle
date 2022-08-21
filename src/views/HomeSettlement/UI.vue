<template lang="" >
        <div v-if="is_visible" class="transition-all duration-700">
            <ResourceSummary
                class="fixed top-0 right-0 w-52"
            ></ResourceSummary>
        </div>
</template>
<script setup lang="ts">
import ResourceSummary from "@/components/UI/Resources/ResourceSummary.vue"
import { ref } from 'vue';


const is_visible = ref(false);


const show = () => {
    is_visible.value = true;
}

function hide() {
    is_visible.value = false;
}

defineExpose({
    show,
    hide,
    is_visible
});

</script>
<style lang="">
    
</style>