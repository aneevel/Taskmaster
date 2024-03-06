import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/header/header.component';

@Component({
  selector: 'app-callback',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './callback.component.html'
})
export class CallbackComponent {

}
