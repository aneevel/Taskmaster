import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
let LoginComponent = class LoginComponent {
    constructor(formBuilder, userService, route, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
        this.loading = false;
        this.submitted = false;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get form() { return this.loginForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.loginForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.login(this.form['username'].value, this.form['password'].value)
            .pipe(first())
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            // Replace with some sort of alert/alarm system
            console.log(error);
            console.log("Error logging on!");
            this.loading = false;
        });
    }
};
LoginComponent = __decorate([
    Component({
        selector: 'app-login', standalone: true,
        imports: [CommonModule, FormsModule, ReactiveFormsModule],
        templateUrl: './login.component.html',
        styleUrls: ['./login.component.scss']
    })
], LoginComponent);
export { LoginComponent };
//# sourceMappingURL=login.component.js.map