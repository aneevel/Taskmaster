import { Component } from "@angular/core";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  selector: "app-home",
  standalone: true,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  imports: [ TasksComponent ]
})
export class HomeComponent {}
