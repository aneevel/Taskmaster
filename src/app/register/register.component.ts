import { Component } from "@angular/core";
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent {

    authForm: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private formBuilder: FormBuilder 
    ) {
        this.authForm = this.formBuilder.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    ngOnInit() {
        this.route.url.subscribe(() => {
            this.authForm.addControl('username', new FormControl('', Validators.required));
        });
    }

    submitForm() {
        let credentials = this.authForm.value;
        console.log(credentials);
    }
}
