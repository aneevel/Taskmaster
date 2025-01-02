import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToolbarModule } from "primeng/toolbar";
import { LogoutButtonComponent } from '../shared/buttons/logout-button.component'
import { LoginButtonComponent } from '../shared/buttons/login-button.component'
import { SignupButtonComponent } from '../shared/buttons/signup-button.component'
import { ButtonModule } from "primeng/button";
import { UserService } from "../user.service";

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
    LoginButtonComponent,
    SignupButtonComponent,
  ],
})
export class HeaderComponent {
  isAuthenticated$ = this.userService.isAuthenticated$;

  constructor(private userService: UserService) {

  }

  logout() {
      this.userService.logout();
  }

  isLoggedIn() {
      return this.userService.isLoggedIn();
  }
}
