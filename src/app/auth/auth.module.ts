import { CommonModule } from '@angular/common'
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';

const authRouting: ModuleWithProviders<AuthModule> = RouterModule.forChild([
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

@NgModule({
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
export class AuthModule {}

