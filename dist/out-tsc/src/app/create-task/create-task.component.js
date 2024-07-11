import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
let CreateTaskComponent = class CreateTaskComponent {
    constructor(userTasks, dialogRef, config) {
        this.userTasks = userTasks;
        this.dialogRef = dialogRef;
        this.config = config;
        this.taskForm = new FormGroup({
            description: new FormControl('', { nonNullable: true }),
            priority: new FormControl('', { nonNullable: true }),
            dueDate: new FormControl(new Date(), { nonNullable: true }),
        });
        // Eventually should be user-defined, with system fallback
        this.priorities = [
            'High',
            'Medium',
            'Low'
        ];
    }
    saveTask() {
        // TODO: Add validation so we don't add empty tasks
        const newTask = {
            id: 'null',
            description: this.taskForm.controls['description'].value,
            priority: this.taskForm.controls['priority'].value,
            dueDate: this.taskForm.controls['dueDate'].value,
            occurrence: this.config.data.occurrence,
        };
        this.userTasks.addTask(newTask);
        this.closeDialog();
        return newTask;
    }
    closeDialog() {
        this.dialogRef.close();
    }
};
__decorate([
    Input({ required: true })
], CreateTaskComponent.prototype, "occurrence", void 0);
CreateTaskComponent = __decorate([
    Component({
        standalone: true,
        selector: 'app-create-task',
        imports: [DropdownModule, CalendarModule, ReactiveFormsModule],
        templateUrl: './create-task.component.html',
        styleUrls: ['./create-task.component.scss'],
    })
], CreateTaskComponent);
export { CreateTaskComponent };
//# sourceMappingURL=create-task.component.js.map