<template>
    <div class="h-full overflow-show">
        <div v-for="(value, key, index) in flagStore.flag_data" :key="index">
            <div class="w-full mb-2 flex flex-row shadow-md p-3 text-sm ">
                <div>
                    <b>{{ key }}</b>
                    <p>
                        value: <span :class="{ 'text-green-600': value, 'text-red-600': !value }">{{ value }}</span>
                    </p>
                </div>
                <el-button class="ml-auto" type="primary" link icon="minus" @click="flagStore.deleteFlag(key as string)">Delete</el-button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useDeveloperStore, type FlagEntry } from '@/stores/developerStore';
import { FlagStore } from '@/stores/store'

const flagStore = FlagStore();

let developerStore = useDeveloperStore();

function removeFlag(key: any) {
    developerStore.removeFlag(key);
}

</script>