import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TasksComponent } from "../tasks/tasks.component";
import { AboutComponent } from "../about/about.component";
import { UserService } from "../user.service";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [ TasksComponent, CommonModule, AboutComponent ]
})
export class HomeComponent {
  isAuthenticated$ = this.userService.isAuthenticated$;
  
  constructor(private userService: UserService) {}
}
