<template>
    <el-collapse v-model="activeItems">
      <el-collapse-item v-for="(object, key, i) in data" :title="key" :name="key">
        <template #title class="card-header flex flex-row">
            <el-button type="danger" link icon="minus" @click="deleteFunction(key)"/>
            <span class="ml-2 font-bold">{{ key }} </span>
        </template >
        <template v-if="(typeof object != typeof {} || typeof object != typeof [])">
            {{ object }}
        </template>
        <el-descriptions v-else direction="vertical" :column="3" border>
            <el-descriptions-item v-for="(v, k) in object" :label="(k as any)">
                <template v-if="(typeof v == typeof [])">
                    <div v-for="(v2, k2) in v" class="mb-5">
                        <el-descriptions direction="vertical" :column="2" border v-for="(v3, k3) in v2" >
                            <el-descriptions-item :label="(k3 as any)">
                                {{ v3 }}
                            </el-descriptions-item>
                        </el-descriptions>
                        <el-divider/>
                    </div>
                </template>
                <template v-else>
                    {{ v }}
                </template>
            </el-descriptions-item>
        </el-descriptions>
      </el-collapse-item>
    </el-collapse>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
    data: {
        type: Object,
        default: {}
    },
    deleteFunction: {
        type: Function,
        default: () => {}
    },
    deleteKey: {
        type: String,
        default: ""
    }
})




const activeItems = ref([])

</script>
