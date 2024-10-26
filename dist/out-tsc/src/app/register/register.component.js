import { __decorate } from "tslib";
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { first } from 'rxjs';
let RegisterComponent = class RegisterComponent {
    constructor(formBuilder, userService, route, router) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.registerForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            fname: ['', Validators.required],
            lname: ['', Validators.required],
        }, {
            validator: this.PasswordsMatchValidator('password', 'confirmPassword'),
        });
        this.loading = false;
        this.submitted = false;
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    get form() { return this.registerForm.controls; }
    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }
        this.loading = true;
        this.userService.register(this.form['username'].value, this.form['password'].value, this.form['fname'].value, this.form['lname'].value)
            .pipe(first())
            .subscribe(data => {
            this.router.navigate([this.returnUrl]);
        }, error => {
            //Replace with some sort of alert/alarm system
            console.log(error);
            console.log("Error creating account!");
            this.loading = false;
        });
    }
    PasswordsMatchValidator(controlName, matchingControlName) {
        return (formGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];
            if (matchingControl.errors &&
                !matchingControl.errors['passwordsMatchValidator']) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ passwordsMatchValidator: true });
            }
            else {
                matchingControl.setErrors(null);
            }
        };
    }
};
RegisterComponent = __decorate([
    Component({
        selector: 'app-register', standalone: true,
        imports: [CommonModule, FormsModule, ReactiveFormsModule],
        templateUrl: './register.component.html',
        styleUrls: ['./register.component.scss']
    })
], RegisterComponent);
export { RegisterComponent };
//# sourceMappingURL=register.component.js.map