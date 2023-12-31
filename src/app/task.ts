export interface Task {
    id: string;
    description: string;
    priority: string | undefined | null;
    dueDate: Date;
    occurrence: string;

}
