import { defineStore, storeToRefs } from "pinia";
import IsledleData from '@/config/IsledleData.json'
import { useActionStore } from '@/stores/actionStore'
import { useResourceStore } from '@/stores/resourceStore'
import { useDropTableStore } from '@/stores/dropTableStore'
import { useLocationStore } from '@/stores/locationStore'
import { useLogStore } from '@/stores/logStore'
import { useGameStore } from './gameStore'
import { useProgressionStore } from "./flagStore";
import { ref } from "vue";
import type { MessageBus } from "@/models/MessageBus";

interface FlagInterface {
    [key: string] : boolean
}

export const mainStore = defineStore('main', () => {
    const actionStore = ref(useActionStore())
    const flags = ref(new Store(useProgressionStore(), 'flags'))
    const dropTables = ref(new Store(useDropTableStore(), 'dropTables'))
    const locations = ref(new Store(useLocationStore(), 'locations'))
    const logs = ref(new Store(useLogStore(), 'logs'))
    const resources = ref(new Store(useResourceStore(), 'resources'))
    const gameStore = ref(useGameStore())
    
    return {
        gameStore,
        actionStore,
        flags,
        resources,
        dropTables,
        locations,
        logs,
    }
});


interface dataInterface {
    [key: string] : boolean
  }

export class Store{
    
    dataName: string = ''
    defaultData: any ={}
    store: any
    actionStore: any
    globalMessageBus: MessageBus
    data: any

    constructor(store: any, dataName: any) {
        this.store = store
        this.dataName = dataName;
        const { data } = storeToRefs(store)
        this.data = data
        this.actionStore = useActionStore()
        this.globalMessageBus = this.actionStore.messageBus
        this.globalMessageBus.attach(this.store.messageBus)
    }

    addEntry(args: any, ident_property:string="id") {
        this.data[args[ident_property]] = args; 
    }

    deleteEntry(entry_id: string) {
        delete this.data[entry_id];
    }

    resetData(){
        this.data = IsledleData[this.dataName as keyof typeof IsledleData] as dataInterface
    }

    query(query: string, cb: Function){
        const keys = Object.keys(this.store.data).filter( entry => entry.toLowerCase().includes(query.toLowerCase()))
        let result = [] as {}[]
        keys.forEach(entry => {
            result.push({
                value:entry
            })
        })
        cb(result)
    }
}