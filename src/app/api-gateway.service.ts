import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './models/task.model';
import { HealthStatus } from './models/health.model';

interface TaskResponse {
    success: boolean;
    tasks: Task[];
    message?: string;
}

interface TaskActionResponse {
    success: boolean;
    message: string;
    task?: Task;
}

@Injectable({
    providedIn: 'root'
})
export class ApiGatewayService implements OnDestroy {
    private currentStatus: HealthStatus | null = null;
    private statusSubject = new BehaviorSubject<HealthStatus | null>(null);
    private status$ = this.statusSubject.asObservable();
    private healthCheckInterval: any;

    public API_URL: string = environment.api.serverUrl;

    constructor(private http: HttpClient) {
        this.startHealthCheck();
    }

    private startHealthCheck(interval: number = 30000) {
        // Initial check
        this.getAPIStatus().subscribe();
        
        // Set up recurring checks
        this.healthCheckInterval = setInterval(() => {
            this.getAPIStatus().subscribe();
        }, interval);
    }

    ngOnDestroy() {
        if (this.healthCheckInterval) {
            clearInterval(this.healthCheckInterval);
        }
    }

    getAPIStatus(): Observable<HealthStatus> {
        return this.http.get<HealthStatus>(`${this.API_URL}/api/health`)
            .pipe(
                tap(status => {
                    this.currentStatus = status;
                    this.statusSubject.next(status);
                })
            );
    }

    public getStatus$(): Observable<HealthStatus | null> {
        return this.status$;
    }

    getUserTasks(userId: string): Observable<Task[]> {
        return this.http.get<TaskResponse>(`${this.API_URL}/tasks/${userId}`)
            .pipe(
                tap(response => {
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                }),
                map(response => response.tasks)
            );
    }

    createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>): Observable<Task> {
        return this.http.post<TaskActionResponse>(`${this.API_URL}/tasks`, task)
            .pipe(
                tap(response => {
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                }),
                map(response => response.task!)
            );
    }

    updateTask(taskId: string, updates: Partial<Task>): Observable<Task> {
        return this.http.put<TaskActionResponse>(`${this.API_URL}/tasks/${taskId}`, updates)
            .pipe(
                tap(response => {
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                }),
                map(response => response.task!)
            );
    }

    deleteTask(taskId: string): Observable<boolean> {
        return this.http.delete<TaskActionResponse>(`${this.API_URL}/tasks/${taskId}`)
            .pipe(
                tap(response => {
                    if (!response.success) {
                        throw new Error(response.message);
                    }
                }),
                map(response => response.success)
            );
    }
}
