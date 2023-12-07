import { Component } from "@angular/core";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  standalone: true,
  imports: [ TasksComponent ],
  selector: "app-monthly",
  templateUrl: "./monthly.component.html",
  styleUrls: ["./monthly.component.scss"],
})
export class MonthlyComponent {}
