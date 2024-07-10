import { Task } from '../task'

export interface User {
    id: number,
    lname: string,
    fname: string,
    email: string,
    confirmed: boolean,
    admin: boolean,
    tasks: Task[]
}
