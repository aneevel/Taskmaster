import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <a id='nav-register' [routerLink]="['/register']">
        <p-button label="Create Account" class="mr-2"></p-button>
    </a>
  `
})
export class SignupButtonComponent {

}
