import { Task } from '../task'

export class User {
    id: string;
    lname: string;
    fname: string;
    email: string;
    confirmed: boolean;
    admin: boolean;
    tasks: Task[];

    constructor(id: string, lname: string, fname: string, email: string, confirmed: boolean, admin: boolean, tasks: Task[]) {
        this.id = id;
        this.lname = lname;
        this.fname = fname;
        this.email = email;
        this.confirmed = confirmed;
        this.admin = admin;
        this.tasks = tasks;
    }
}    
