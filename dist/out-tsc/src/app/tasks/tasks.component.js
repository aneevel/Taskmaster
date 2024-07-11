import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService } from 'primeng/dynamicdialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { TaskItemComponent } from '../task-item/task-item.component';
let TasksComponent = class TasksComponent {
    constructor(dialogService, userTasksService) {
        this.dialogService = dialogService;
        this.userTasksService = userTasksService;
    }
    openCreateTask() {
        this.ref = this.dialogService.open(CreateTaskComponent, {
            data: {
                occurrence: this.occurrence,
            },
            header: 'Create A New Task',
            width: '70%',
            contentStyle: { overflow: 'auto' },
            baseZIndex: 10000,
            maximizable: false
        });
    }
};
__decorate([
    Input({ required: true })
], TasksComponent.prototype, "occurrence", void 0);
TasksComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-tasks',
        templateUrl: './tasks.component.html',
        styleUrls: ['./tasks.component.scss'],
        imports: [ButtonModule,
            CommonModule,
            TaskItemComponent],
        providers: [DialogService]
    })
], TasksComponent);
export { TasksComponent };
//# sourceMappingURL=tasks.component.js.map