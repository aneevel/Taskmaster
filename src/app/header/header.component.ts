import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToolbarModule } from "primeng/toolbar";
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
    RouterModule
  ],
})
export class HeaderComponent {

  constructor() {}
}
