import { Task } from '../task'

interface User {
    id: number,
    lname: string,
    fname: string,
    email: string,
    confirmed: boolean,
    admin: boolean,
    tasks: Task[]
}
