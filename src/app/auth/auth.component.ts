import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

    authType: String = '';
    title: String = '';
    authForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
    ) {
        this.authForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', [
                Validators.required,
                Validators.minLength(13),
                Validators.maxLength(64)
            ]],
            'confirm-password': ['', Validators.required],
        });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {

            // The last part of the route is always either 'login', or 'register'
            this.authType = data[data.length - 1].path;
            this.title = (this.authType === 'login') ? 'Log In' : 'Create An Account';
        });
    }

    submitForm() {
        let credentials = this.authForm.value;
        console.log(credentials);
    }

    get password() {
        return this.authForm.get('password');
    }
}

