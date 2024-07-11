import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
let LogoutButtonComponent = class LogoutButtonComponent {
    constructor() { }
};
LogoutButtonComponent = __decorate([
    Component({
        selector: 'app-logout-button',
        standalone: true,
        imports: [CommonModule, RouterModule, ButtonModule],
        template: `<a id='nav-logout' [routerLink]="['/login']">
        <p-button label="Logout" class="mr-2"></p-button>
    </a>
  `
    })
], LogoutButtonComponent);
export { LogoutButtonComponent };
//# sourceMappingURL=logout-button.component.js.map