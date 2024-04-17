import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button>
        <a class='nav-link'
            routerLink='/login'
            routerLinkActive='active'>
            Log In
        </a>
    </button>
  `
})
export class LoginButtonComponent {

}
