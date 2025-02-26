export interface Task {
  _id: string;
  userID: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: Date;
  updatedAt?: Date;
  priority: string;
  dueDate: Date;
  occurrence: string;
} 
