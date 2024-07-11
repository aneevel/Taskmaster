import { Task } from '../task'

interface IUser {
    id: number,
    lname: string,
    fname: string,
    email: string,
    confirmed: boolean,
    admin: boolean,
    tasks: Task[]
}

export class User implements IUser {
    id: number;
    lname: string;
    fname: string;
    email: string;
    confirmed: boolean;
    admin: boolean;
    tasks: Task[];

    constructor(id: number, lname: string, fname: string, email: string, confirmed: boolean, admin: boolean, tasks: Task[]) {
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.email = email;
        this.confirmed = confirmed;
        this.admin = admin;
        this.tasks = tasks;
    }
}    
