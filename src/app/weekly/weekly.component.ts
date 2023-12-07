import { Component } from "@angular/core";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  standalone: true,
  imports: [ TasksComponent ],
  selector: "app-weekly",
  templateUrl: "./weekly.component.html",
  styleUrls: ["./weekly.component.scss"],
})
export class WeeklyComponent {}
