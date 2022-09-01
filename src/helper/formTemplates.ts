interface lazyObject { [key: string]: any}

export const locationForm = {
    "name": {
        "initialData": ""
    },
    "specialInteractName": {
        "initialData": ""
    },
    "dropTable": {
        "initialData": ""
    },
    "specialDropTable": {
        "initialData": ""
    },
    "unlocked": {
        "initialData": false
    }
} as lazyObject


export const dropTableIdForm = {
    id: {
        initialData: "",
        autocomplete: null
    } ,
    table: {
        initialData: [],
        show: false,
        autocomplete: null
    }


} as lazyObject

export const dropTableTableForm = {
    name: {
        initialData: "",
    },
    maxQuantity: {
        initialData: 1,
    },
    chance: {
        initialData: 50,
    }
} as lazyObject


export const eventFormId = {
    id: {
        initialData: "",
    },
    actions: {
        show: false,
        initialData: [],
    },
    requirements: {
        show: false,
        initialData: [],
    }
} as lazyObject


export function buildForm(form: {[key: string]: any}){
    let newForm = {} as any
    Object.keys(form).forEach(key => {
        newForm[key] = form[key].initialData
    })
    return JSON.parse(JSON.stringify(newForm))
}