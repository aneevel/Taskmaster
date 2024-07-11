import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let UserTasksService = class UserTasksService {
    constructor() {
        this.tasks = [];
    }
    addTask(task) {
        this.tasks.push(task);
    }
    getTasks() {
        return [...this.tasks];
    }
    getTasksOfOccurrence(occurrence) {
        return [...this.tasks].filter(task => task.occurrence === occurrence);
    }
};
UserTasksService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserTasksService);
export { UserTasksService };
//# sourceMappingURL=user-tasks.service.js.map