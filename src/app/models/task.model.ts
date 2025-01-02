export interface Task {
    id: string;
    userId: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
    priority: string;
    dueDate: Date;
    occurrence: string;
} 