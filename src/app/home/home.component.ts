import { Component } from "@angular/core";
import { CommonModule } from '@angular/common';
import { TasksComponent } from "../tasks/tasks.component";
import { AboutComponent } from "../about/about.component";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [ TasksComponent, CommonModule, AboutComponent ]
})
export class HomeComponent {}
