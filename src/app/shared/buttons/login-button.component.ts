import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button>
        <a class='nav-link'
            [routerLink]="['/login']">
            Log In
        </a>
    </button>
  `
})
export class LoginButtonComponent {

}
