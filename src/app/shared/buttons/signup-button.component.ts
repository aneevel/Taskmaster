import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup-button',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <button>
        <a class="nav-link"
            [routerLink]="['/register']">
            Create Account
        </a>
    </button>
  `
})
export class SignupButtonComponent {

}
