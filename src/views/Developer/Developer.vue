<template>
    <div class="flex flex-row h-screen overflow-hidden mx-5">
        <!--------- ENTRIES ----------->
        <!------------------------------->
        <div class="w-full h-full flex flex-col grow pt-4">
            <p class="font-bold text-xl">
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
        <div class="w-full h-full flex flex-col pt-4 mx-5 border-x-2">
            <div class="flex flex-row top-0 px-5">
                <p class="font-bold text-xl mr-auto">
                    JSON
                </p>
                <el-switch
                class="mr-2"
                v-model="editableJson"
                active-text="Editable"
                />
            </div>
            <div class="w-full p-0 flex flex-col grow overflow-auto">
                <p class="font-bold mx-auto">Resources</p>
                <VueJsonPretty class="mb-10" :data="resourceStore.resource_data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
                <p class="font-bold mx-auto">Flags</p>
                <VueJsonPretty class="mb-10" :data="flagStore.flag_data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
                <p class="font-bold mx-auto">Logs</p>
                <VueJsonPretty class="mb-10" :data="logStore.log_data" :collapsedOnClickBrackets="true" :editable="editableJson"/>
            </div>
        </div>

        <!--------- EDITOR PANE ---------->
        <!------------------------------->
        <div class="w-full pt-4">
            <div class="flex flex-row">
                <p class="font-bold text-xl">
                    Editor
                </p>
                <div class="ml-auto">
                    <el-button type="primary" link icon="Delete" @click="clearLocalStorage()">Clear Cache</el-button>
                    <el-button type="primary" link icon="Bottom" @click="downloadFiles()">Download JSON</el-button>
                </div>
            </div>

            <el-tabs v-model="currentNew" class="flex flex-col h-full px-4">
                <el-tab-pane label="New Log" name="new_log" class="h-full">
                    <EditorLog />
                </el-tab-pane>

                <el-tab-pane label="New Resource" name="new_resource">
                    <EditResource/>
                </el-tab-pane>

                <el-tab-pane label="New Flag" name="new_flag">
                    <EditorFlag/>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>

<script setup lang='ts'>

import VueJsonPretty from 'vue-json-pretty';
import 'vue-json-pretty/lib/styles.css';


import EditResource from './EditorResource.vue';
import EditorFlag from './EditorFlag.vue';
import EditorLog from './EditorLog.vue';

import EntriesFlags from './EntriesFlags.vue';
import EntriesResources from './EntriesResources.vue';
import EntriesLog from './EntriesLog.vue';

import { ref, getCurrentInstance } from 'vue';

import {
    DeveloperStore,
    FlagStore,
    LogStore,
    ResourceStore
} from '@/stores/store';


const developerStore = DeveloperStore();
const resourceStore = ResourceStore();
const logStore = LogStore();
const flagStore = FlagStore();

let currentNew = 'new_log';
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