import { __decorate } from "tslib";
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
let TaskItemComponent = class TaskItemComponent {
};
__decorate([
    Input({ required: true })
], TaskItemComponent.prototype, "description", void 0);
__decorate([
    Input({ required: true })
], TaskItemComponent.prototype, "priority", void 0);
__decorate([
    Input({ required: true })
], TaskItemComponent.prototype, "dueDate", void 0);
__decorate([
    Input({ required: true })
], TaskItemComponent.prototype, "occurrence", void 0);
TaskItemComponent = __decorate([
    Component({
        selector: 'app-task-item',
        standalone: true,
        imports: [CommonModule],
        templateUrl: './task-item.component.html',
        styleUrls: ['./task-item.component.scss']
    })
], TaskItemComponent);
export { TaskItemComponent };
//# sourceMappingURL=task-item.component.js.map