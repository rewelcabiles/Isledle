<template>
    <UI ref="ui_ref" class="transition-all duration-200"/>
    <Intro @first-chop="handleFirstChop"/>
</template>

<script setup lang="ts">
import Intro from '@/components/Story/Intro.vue'
import UI from './UI.vue'
import { ref } from 'vue';

let ui_ref = ref<InstanceType<typeof UI>>();

function handleFirstChop() {
    ui_ref.value?.show();
}

</script>
