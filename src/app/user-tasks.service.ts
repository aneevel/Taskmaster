import { Injectable } from '@angular/core';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class UserTasksService {
  private tasks: Task[] = [];

  constructor() { }

  addTask(task: Task) {
    this.tasks.push(task);
  }

  getTasks(): Task[] {
    return [...this.tasks];
  }
}
