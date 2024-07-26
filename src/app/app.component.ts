import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { UsersComponent } from "./user/users/users.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HomeComponent, 
    RouterModule, 
    HeaderComponent, 
    FooterComponent,
    HttpClientModule,
    UsersComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "Taskmaster";
}
