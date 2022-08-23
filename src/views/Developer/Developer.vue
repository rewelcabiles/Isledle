<template>
    <div class="flex flex-row h-screen overflow-hidden mx-5">
        <!--------- ENTRIES ----------->
        <!------------------------------->
        <div class="w-full h-full flex flex-col pt-4">
            <p class="font-bold text-xl">
                Entries
            </p>

            <el-tabs v-model="currentLeftPaneTab">
                <el-tab-pane label="Logs" name="log" class="h-full px-10">
                    <EntriesLog />
                </el-tab-pane>
                <el-tab-pane label="Resources" name="resources" class="px-10 pt-4">
                    <EntriesResources />
                </el-tab-pane>
                <el-tab-pane label="Progress Flags" name="progress_flags" class="px-10 pt-4">
                    <EntriesFlags/>
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--------- ACTIONS ----------->
        <!------------------------------->
        <div class="w-full h-full flex flex-col pt-4 px-5 mx-5 border-x-2">
            <p class="font-bold text-xl">
                Actions
            </p>
            <el-tabs v-model="currentMiddlePaneTab" class="h-full flex flex-col">
                <el-tab-pane label="Action" name="actions" class="h-full overflow-auto flex flex-col">
                    <ActionsAction />
                </el-tab-pane>
            </el-tabs>
        </div>

        <!--------- EDITOR PANE ---------->
        <!------------------------------->
        <div class="w-full h-full flex flex-col pt-4">
            <div class="flex flex-row">
                <p class="font-bold text-xl">
                    Editor
                </p>
                <div class="ml-auto">
                    <el-button type="primary" link icon="Delete" @click="clearLocalStorage()">Clear Cache</el-button>
                    <el-button type="primary" link icon="Bottom" @click="downloadFiles()">Download JSON</el-button>
                </div>
            </div>

            <el-tabs v-model="currentNew" class="demo-tabs">
                <el-tab-pane label="New Log" name="new_log" class="px-10 pt-4">
                    <EditorLog />
                </el-tab-pane>

                <el-tab-pane label="New Action" name="new_action" class="px-10 pt-4">
                    <EditorAction />
                </el-tab-pane>

                <el-tab-pane label="New Resource" name="new_resource" class="px-10 pt-4">
                    <EditResource/>
                </el-tab-pane>

                <el-tab-pane label="New Flag" name="new_flag" class="px-10 pt-4">
                    <EditorFlag/>
                </el-tab-pane>
            </el-tabs>

        </div>
    </div>
</template>
<script setup lang='ts'>

import EditResource from './EditorResource.vue';
import EditorFlag from './EditorFlag.vue';
import EditorAction from './EditorAction.vue';
import EditorLog from './EditorLog.vue';

import EntriesFlags from './EntriesFlags.vue';
import EntriesResources from './EntriesResources.vue';
import EntriesLog from './EntriesLog.vue';

import ActionsAction from './ActionsAction.vue';

import { useDeveloperStore } from '@/stores/developerStore';

import { getCurrentInstance } from 'vue';

let developerStore = useDeveloperStore();

let currentNew = 'new_log';
let currentLeftPaneTab = 'log';
let currentMiddlePaneTab = 'actions';


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