import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button>
        <a class="nav-link"
            routerLink="/register"
            routerLinkActive="active">
            Create Account
        </a>
    </button>
  `
})
export class SignupButtonComponent {

}
