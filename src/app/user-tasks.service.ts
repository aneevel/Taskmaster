import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Task } from './task';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserTasksService {
    private tasksSubject: BehaviorSubject<Task[]>;
    public tasks: Observable<Task[]>;

    public API_URL: string = environment.api.serverUrl;

    constructor(
        private http: HttpClient) { 
            this.tasksSubject = new BehaviorSubject<Task[]>(JSON.parse(localStorage.getItem('tasks') || '[]'));
            this.tasks = this.tasksSubject.asObservable();
    }

    getTasks(userID: string) {
        return this.http.get<{ tasks: Task[] }>(`${environment.api.serverUrl}/tasks/${userID}`, {})
            .pipe(
                tap(res => this.setTasks(res.tasks)));
    }

    setTasks(result: Task[]) {
        localStorage.setItem('tasks', JSON.stringify(result)); 
    }

    addTask(task: Task) {
        let currentTasks = [];

        // TS is kinda dumb sometimes lol
        if (!localStorage.getItem('tasks'))
            currentTasks = JSON.parse(localStorage.getItem('tasks')!);
        currentTasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(currentTasks));
    }
}
