import { reactive } from 'vue';

export class Resource {
    name: string;
    stock: number;
    manual_harvest_speed: number;
    icon: string;
    unlocked: boolean;

    constructor(name:string) {
        this.name = name as string;
        this.stock = 0;
        this.manual_harvest_speed = 1;
        this.icon = `/game_assets/resource_icons/${name}.png`;
        this.unlocked = false;
    }

    incrementStock(amount:number):void {
        if (!this.unlocked){
            this.unlocked = true;
        }
        this.stock += amount;
    }
}