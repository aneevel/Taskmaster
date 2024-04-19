import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule],
  template: `
    <p-button>
        <a class='nav-link'
            [routerLink]="['/login']">
            Log In
        </a>
    </p-button>
  `
})
export class LoginButtonComponent {

}
