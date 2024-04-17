import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToolbarModule } from "primeng/toolbar";
import { LogoutButtonComponent } from '../shared/buttons/logout-button.component'
import { ButtonModule } from "primeng/button";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [
    CommonModule,
    ToolbarModule, 
    ButtonModule, 
    RouterModule,
    LogoutButtonComponent,
  ],
})
export class HeaderComponent {

  constructor() {}
}
