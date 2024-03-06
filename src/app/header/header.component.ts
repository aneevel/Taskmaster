import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ToolbarModule } from "primeng/toolbar";
import { ButtonModule } from "primeng/button";
import { LoginButtonComponent } from "../shared/buttons/login-button.component";
import { LogoutButtonComponent } from "../shared/buttons/logout-button.component";
import { SignupButtonComponent } from "../shared/buttons/signup-button.component";
import { AuthService } from "@auth0/auth0-angular";

@Component({
  selector: "app-header",
  standalone: true,
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  imports: [
    ToolbarModule, 
    ButtonModule, 
    RouterModule, 
    SignupButtonComponent, 
    LoginButtonComponent, 
    LogoutButtonComponent
  ],
})
export class HeaderComponent {
  isAuthenticated$ = this.authService.isAuthenticated$;

  constructor(private authService: AuthService) {}
}
