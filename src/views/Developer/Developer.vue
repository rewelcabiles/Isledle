<template>
    <div class="flex flex-row h-screen mx-5 overflow-hidden">
        <!--------- ACTIONS ----------->
        <!------------------------------->
        <div class="w-1/3 h-full flex flex-col pt-4">
            <div class="flex flex-row ">
                <p class="font-bold text-lg mr-auto">
                    JSON
                </p>
                <el-switch class="mr-2" v-model="editableJson" active-text="Editable" />
            </div>
            <div class="w-full p-0 flex flex-col grow overflow-auto">
                <template v-for="store in stores">
                    <p class="font-bold mx-auto"> {{ store.store.$id }}</p>
                    <VueJsonPretty class="mb-10" :data="store.data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
                </template>
                
                
            </div>
        </div>

        <!--------- EDITOR PANE ---------->
        <!------------------------------->
        <div class="w-full h-full py-4">
            <div class="flex flex-row border-b-2">
                <p class="text-xl pl-4">
                    <b>{{ game_config.game_name }}</b> - Content Management Page
                </p>
                <div class="ml-auto">
                    <el-button type="success" link icon="Back" @click="$router.push('/')">Back to game</el-button>
                    <el-button type="primary" link icon="Delete" @click="clearLocalStorage()">Clear Cache</el-button>
                    <el-button type="primary" link icon="Bottom" @click="downloadFiles()">Download JSON</el-button>
                </div>
            </div>

            <el-tabs v-model="currentNew" class="h-full px-4 developer" tab-position="right">
                <el-tab-pane v-for="(v, k, i) in editorPanes" :label="k" :name="k" class="h-full">
                    <div class="flex flex-row h-full">
                        <div class="w-full h-full flex flex-col px-5 overflow-auto pt-5">
                            <component :is="v.view" :data="v.data" :deleteFunction="v.deleteFunction"></component>
                        </div>
                        <div class="w-full h-full flex flex-col px-5 overflow-auto pt-5">
                            <component :is="v.edit"></component>
                        </div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script setup lang='ts'>
import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';


import EditResource from './Editor/EditorResource.vue';
import EditorFlag from './Editor/EditorFlag.vue';
import EditorLog from './Editor/EditorLog.vue';
import EditorDropTable from './Editor/EditorDropTable.vue'
import EditorLocation from './Editor/EditorLocation.vue';

import EntriesLog from './Entries/EntriesLog.vue';

import DataDisplayVue from '@/components/Developer/DataDisplay.vue';
import { ref, watch, getCurrentInstance } from 'vue';
import game_config from '@/config/game_config.json'
import EditorResourceVue from './Editor/EditorResource.vue';
import { useRouter, useRoute } from 'vue-router'

import { mainStore } from '@/stores/mainStore';
const store = mainStore();
const router = useRouter()
const route = useRoute();
let currentNew = ref(route.query.tab ? route.query.tab : 'Log');

watch(currentNew, (newVal, oldVal) => {
    currentNew.value = newVal
    router.push({query: {tab: currentNew.value}})
});

const stores = {
    resources: store.resources,
    logs: store.logs,
    flags: store.flags,
    dropTables: store.dropTables,
    locations: store.locations
};


const editorPanes = {
    "Log": {
        edit: EditorLog,
        view: EntriesLog,
        deleteFunction: null,
        data: {}
    },
    "Resource": {
        edit: EditorResourceVue,
        view: DataDisplayVue,
        data: store.resources.data,
        deleteFunction: store.resources.deleteEntry,
        deleteKey: "name"
    },
    "Flag": {
        edit: EditorFlag,
        view: DataDisplayVue,
        data: store.flags.data,
        deleteFunction: store.flags.deleteEntry,
        deleteKey: "id"
    },
    "Drop Table": {
        edit: EditorDropTable,
        view: DataDisplayVue,
        data: store.dropTables.data,
        deleteFunction: store.dropTables.deleteEntry,
        deleteKey: "id"
    },
    "Location": {
        edit: EditorLocation,
        view: DataDisplayVue,
        data: store.locations.data,
        deleteFunction: store.locations.deleteEntry,
        deleteKey: "name"
    }
}

let editableJson = ref(false);

function clearLocalStorage() {
    Object.values(stores).forEach( s => {
        s.resetData()
    });
    const instance = getCurrentInstance();
    instance?.proxy?.$forceUpdate();
}

function downloadFiles(){
    let a = document.createElement("a");
    let toOutput = {} as { [key: string]: any}
    Object.values(stores).forEach( store => {
        toOutput[store.dataName as string] = store.data
    });
    const blob = new Blob([JSON.stringify(toOutput, null, '\t')], {type: "text/plain;charset=utf-8"});
    a.href = URL.createObjectURL(blob);
    a.download = "IsledleData.json";
    a.click();
}




</script>
<style>
    .developer > .el-tabs__content {
        height: 100% !important
    }
</style>