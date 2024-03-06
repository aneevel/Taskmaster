import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button class="button__login" (click)="handleLogin()">Log In</button>
  `
})
export class LoginButtonComponent {
  constructor(private auth: AuthService) {}

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        // Redirects users to home on login, but perhaps it should be an user setting?
        target: '/',
      },
      authorizationParams: {
        screen_hint: "signup",
      }
    });
  }
}
