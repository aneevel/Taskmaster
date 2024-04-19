import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <p-button>
        <a class="nav-link"
            [routerLink]="['/register']">
            Create Account
        </a>
    </p-button>
  `
})
export class SignupButtonComponent {

}
