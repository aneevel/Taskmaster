import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
let SignupButtonComponent = class SignupButtonComponent {
};
SignupButtonComponent = __decorate([
    Component({
        selector: 'app-signup-button',
        standalone: true,
        imports: [CommonModule, RouterModule, ButtonModule],
        template: `
    <a id='nav-register' [routerLink]="['/register']">
        <p-button label="Create Account" class="mr-2"></p-button>
    </a>
  `
    })
], SignupButtonComponent);
export { SignupButtonComponent };
//# sourceMappingURL=signup-button.component.js.map