import { Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  imports: [CommonModule],
  template: `
  `
})
export class LogoutButtonComponent {
  constructor(
    @Inject(DOCUMENT) private doc: Document,
  ) {}

}
