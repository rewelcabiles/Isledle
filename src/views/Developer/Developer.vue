<template>
    <div class="flex flex-row h-screen overflow-hidden mx-5">
        <!--------- ENTRIES ----------->
        <!------------------------------->
        <div class="w-full h-full flex flex-col grow pt-4">
            <p class="font-bold text-xl border-b-2">
                Entries
            </p>

            <el-tabs v-model="currentLeftPaneTab" class="h-full grow">
                <el-tab-pane label="Logs" name="log" class="h-full flex flex-col grow">
                    <EntriesLog />
                </el-tab-pane>
                <el-tab-pane label="Resources" name="resources" class="h-full">
                    <EntriesResources />
                </el-tab-pane>
                <el-tab-pane label="Progress Flags" name="progress_flags" class="h-full">
                    <EntriesFlags/>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--------- ACTIONS ----------->
        <!------------------------------->
        <div class="w-full h-full flex flex-col pt-4 border-x-2">
            <div class="flex flex-row ">
                <p class="font-bold text-lg mr-auto">
                    JSON
                </p>
                <el-switch class="mr-2" v-model="editableJson" active-text="Editable" />
            </div>
            <div class="w-full p-0 flex flex-col grow overflow-auto">
                <p class="font-bold mx-auto">Resources</p>
                <VueJsonPretty class="mb-10" :data="resourceStore.resource_data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
                <p class="font-bold mx-auto">Flags</p>
                <VueJsonPretty class="mb-10" :data="flagStore.flag_data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
                <p class="font-bold mx-auto">Logs</p>
                <VueJsonPretty class="mb-10" :data="logStore.log_data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
                <p class="font-bold mx-auto">Drop Table</p>
                <VueJsonPretty class="mb-10" :data="dropTableStore.dropTableData" :collapsedOnClickBrackets="true" :editable="editableJson"/>
            </div>
        </div>

        <!--------- EDITOR PANE ---------->
        <!------------------------------->
        <div class="w-full pt-4">
            <div class="flex flex-row border-b-2">
                <p class="font-bold text-xl pl-4">
                    Editor
                </p>
                <div class="ml-auto">
                    <el-button type="primary" link icon="Delete" @click="clearLocalStorage()">Clear Cache</el-button>
                    <el-button type="primary" link icon="Bottom" @click="downloadFiles()">Download JSON</el-button>
                </div>
            </div>

            <el-tabs v-model="currentNew" class="h-full px-4" tab-position="right">
                <el-tab-pane label="Log" name="newLog" class="h-full pt-4">
                    <EditorLog />
                </el-tab-pane>

                <el-tab-pane label="Resource" name="newResource" class="pt-4">
                    <EditResource/>
                </el-tab-pane>

                <el-tab-pane label="Flag" name="newFlag" class="pt-4">
                    <EditorFlag/>
                </el-tab-pane>

                <el-tab-pane label="Drop Table" name="newDropTable" class="pt-4">
                    <EditorDropTable />
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

import EntriesFlags from './Entries/EntriesFlags.vue';
import EntriesResources from './Entries/EntriesResources.vue';
import EntriesLog from './Entries/EntriesLog.vue';

import { ref, getCurrentInstance } from 'vue';

import {
    DeveloperStore,
    DropTableStore,
    FlagStore,
    LogStore,
    ResourceStore
} from '@/stores/store';


const developerStore = DeveloperStore();
const resourceStore = ResourceStore();
const logStore = LogStore();
const flagStore = FlagStore();
const dropTableStore = DropTableStore();

let currentNew = 'newLog';
let currentLeftPaneTab = 'log';
let currentMiddlePaneTab = 'actions';
let editableJson = ref(false);

function clearLocalStorage() {
    developerStore.setToDefault();
    const instance = getCurrentInstance();
    instance?.proxy?.$forceUpdate();
}

function downloadFiles(){
    developerStore.download();
}


</script>
<style scoped>

</style>