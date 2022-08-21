<template >
    <div>
        <HomeSettlement />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import Intro from "@/components/Story/Intro.vue"
import HomeSettlement from "./HomeSettlement/HomeSettlement.vue"

export default defineComponent({
    components: {
        HomeSettlement
    },

    mounted() {
        
    },
});
</script>
