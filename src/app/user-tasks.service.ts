import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { ApiGatewayService } from './api-gateway.service';
import { Task } from './models/task.model';

@Injectable({
    providedIn: 'root'
})
export class UserTasksService {
    protected tasksSubject = new BehaviorSubject<Task[]>([]);
    public tasks$ = this.tasksSubject.asObservable();

    constructor(private apiGateway: ApiGatewayService) {}

    loadUserTasks(userId: string): Observable<Task[]> {
        return this.apiGateway.getUserTasks(userId).pipe(
            tap(tasks => this.tasksSubject.next(tasks))
        );
    }

    createTask(userId: string, taskData: { 
        title: string; 
        description?: string;
        priority: string;
        dueDate: Date;
        occurrence: string;
    }): Observable<Task> {
        return this.apiGateway.createTask({
            userId,
            title: taskData.title,
            description: taskData.description,
            completed: false,
            priority: taskData.priority,
            dueDate: taskData.dueDate,
            occurrence: taskData.occurrence
        }).pipe(
            tap(newTask => {
                const currentTasks = this.tasksSubject.value;
                this.tasksSubject.next([...currentTasks, newTask]);
            })
        );
    }

    updateTask(taskId: string, updates: Partial<Task>): Observable<Task> {
        return this.apiGateway.updateTask(taskId, updates).pipe(
            tap(updatedTask => {
                const currentTasks = this.tasksSubject.value;
                const index = currentTasks.findIndex(t => t.id === taskId);
                if (index !== -1) {
                    currentTasks[index] = updatedTask;
                    this.tasksSubject.next([...currentTasks]);
                }
            })
        );
    }

    deleteTask(taskId: string): Observable<boolean> {
        return this.apiGateway.deleteTask(taskId).pipe(
            tap(() => {
                const currentTasks = this.tasksSubject.value;
                this.tasksSubject.next(currentTasks.filter(t => t.id !== taskId));
            })
        );
    }

    getTasks$(): Observable<Task[]> {
        return this.tasks$;
    }
}
