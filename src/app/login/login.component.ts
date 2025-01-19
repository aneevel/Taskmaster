import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router'
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { first } from 'rxjs';
import { User } from '../models/user.model';

@Component({
  selector: 'app-login', standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm: FormGroup = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    loading = false;
    submitted = false;
    returnUrl: string;
    errorMessage: string = '';

    constructor(
        private formBuilder: FormBuilder,
        private userService: UserService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    get form() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        this.errorMessage = '';

        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.userService.login(this.form['username'].value, this.form['password'].value)
            .pipe(first())
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.errorMessage = 'Login failed. Please check your credentials and try again.';
                    this.loading = false;
                });
    } 
}
