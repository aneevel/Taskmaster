import { __decorate } from "tslib";
import { Component } from "@angular/core";
import { TasksComponent } from "../tasks/tasks.component";
let OneOffComponent = class OneOffComponent {
};
OneOffComponent = __decorate([
    Component({
        standalone: true,
        imports: [TasksComponent],
        selector: "app-one-off",
        templateUrl: "./one-off.component.html",
        styleUrls: ["./one-off.component.scss"],
    })
], OneOffComponent);
export { OneOffComponent };
//# sourceMappingURL=one-off.component.js.map