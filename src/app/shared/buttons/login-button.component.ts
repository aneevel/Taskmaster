import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <a id='nav-login' [routerLink]="['/login']">
        <p-button label="Login" class="mr-2"></p-button>
    </a>
  `
})
export class LoginButtonComponent {

}
