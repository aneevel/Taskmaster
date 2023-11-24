import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar'

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    ToolbarModule,
  ]
})
export class HeaderComponent {

}
