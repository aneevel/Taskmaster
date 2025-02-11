import { Injectable, OnDestroy, Inject, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Task } from './models/task.model';
import { HealthStatus } from './models/health.model';
import { InjectionToken } from '@angular/core';
import { User } from './models/user.model';

export const AUTO_START_HEALTH_CHECK = new InjectionToken<boolean>('AUTO_START_HEALTH_CHECK');

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

    constructor(
        private http: HttpClient,
        @Optional() @Inject(AUTO_START_HEALTH_CHECK) private autoStartHealthCheck: boolean = true
    ) {
        if (autoStartHealthCheck) {
            this.startHealthCheck();
        }
    }

    private startHealthCheck(interval: number = 30000) {
        this.getAPIStatus().subscribe();
        
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

    getUser(userId: string): Observable<User> {
        return this.http.get<User>(`${this.API_URL}/users/${userId}`)
            .pipe(
                tap(response => {
                    if (!response) {
                        console.log("there was no response :(");
                        throw new Error();
                    }
                }),
            );
    }

    public startMonitoring(interval?: number) {
        this.startHealthCheck(interval);
    }
}
