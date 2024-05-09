import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidationErrors,  FormBuilder } from '@angular/forms';
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
                Validators.maxLength(64),
                lowercaseValidator,
                uppercaseValidator,
                numberValidator,
                specialCharacterValidator
            ]],
            'confirm-password': ['', Validators.required],
        }, { validators: passwordsMatchValidator });
    }

    ngOnInit() {
        this.route.url.subscribe(data => {

            // The last part of the route is always either 'login' or 'register'
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

export function lowercaseValidator(control: FormControl)
{
    const regex = /[a-z]/g
    const lowercase = regex.test(control.value);
    return lowercase ? null : { lowercase: { value: control.value } };
}

export function uppercaseValidator(control: FormControl)
{
    const regex = /[A-Z]/g
    const uppercase = regex.test(control.value)
    return uppercase ? null: { uppercase: { value: control.value } };
}

export function numberValidator(control: FormControl) {
    const regex = /\d/g
    const number = regex.test(control.value)
    return number ? null: { number: { value: control.value } }
}

export function specialCharacterValidator(control: FormControl) {
    const regex = /\W/g
    const special = regex.test(control.value)
    return special ? null: { special: { value: control.value } }
}

export function passwordsMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value 
    const confirmPassword = group.get('confirm-password')?.value 
    return password === confirmPassword ? null: { notMatching: true }
}
