import { Component } from "@angular/core";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { AuthModule } from "./auth/auth.module";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HomeComponent, 
    RouterModule, 
    HeaderComponent, 
    FooterComponent,
    AuthModule,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Taskmaster";
}
