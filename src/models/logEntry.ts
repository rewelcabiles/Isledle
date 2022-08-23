import moment from 'moment';
import type { doAction } from './doAction';

export interface LogOption {
    label: string;
    actions: doAction['id'][];
}

export class Log {
    message: string;
    datetime: string;
    options: Array<LogOption>;
    disabled: boolean = false;
    
    constructor(message:string, options?: Array<LogOption>) {
        this.message = message as string;
        this.datetime = moment().format('h:mm:ss');
        this.options = options || [];
    }
}