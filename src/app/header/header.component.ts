import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    ToolbarModule,
    ButtonModule
  ]
})
export class HeaderComponent {

}
