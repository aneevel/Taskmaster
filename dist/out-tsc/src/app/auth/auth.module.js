import { __decorate } from "tslib";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
const authRouting = RouterModule.forChild([
    {
        path: 'login',
        component: AuthComponent
    },
    {
        path: 'register',
        component: AuthComponent
    },
    {
        path: 'logout',
        component: AuthComponent
    }
]);
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    NgModule({
        imports: [
            authRouting,
            FormsModule,
            ReactiveFormsModule,
            CommonModule
        ],
        declarations: [
            AuthComponent
        ],
        providers: []
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map