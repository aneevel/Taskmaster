export interface Task {
    id: string;
    userID: string;
    title: string;
    description?: string;
    completed: boolean;
    createdAt: Date;
    updatedAt?: Date;
    priority: string;
    dueDate?: Date | null;
    occurrence: string;
} 
