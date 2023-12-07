import { Component } from "@angular/core";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  standalone: true,
  imports: [ TasksComponent ],
  selector: "app-daily",
  templateUrl: "./daily.component.html",
  styleUrls: ["./daily.component.scss"],
})
export class DailyComponent {}
