import { defineStore } from "pinia";
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
    const actionStore = useActionStore()
    const flags = ref(new Store(useProgressionStore(), 'flags'))
    const dropTables = new Store(useDropTableStore(), 'dropTables')
    const locations = new Store(useLocationStore(), 'locations')
    const logs = new Store(useLogStore(), 'logs')
    const resources = ref(new Store(useResourceStore(), 'resources'))
    const gameStore = useGameStore();
    
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
    data: any = {}
    dataName: string = ''
    defaultData: any ={}
    store: any
    actionStore: any
    globalMessageBus: MessageBus

    constructor(store: any, dataName: any) {
        this.store = store
        this.data = store.data;
        this.dataName = dataName;
        this.actionStore = useActionStore()
        this.globalMessageBus = this.actionStore.messageBus
        this.globalMessageBus.attach(this.store.messageBus)
    }

    addEntry(args: any) {
        this.data[args.id] = args.value;
    }

    deleteEntry(entry_id: string) {
        delete this.data[entry_id];
    }

    resetData(){
        this.data = IsledleData[this.dataName as keyof typeof IsledleData] as dataInterface
    }

    query(query: string, cb: Function){
        const keys = Object.keys(this.data).filter( entry => entry.toLowerCase().includes(query.toLowerCase()))
        let result = [] as {}[]
        keys.forEach(entry => {
          result.push({
            value:entry
          })
        })
        cb(result)
    }
}