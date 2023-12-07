import { Component } from "@angular/core";
import { TasksComponent } from "../tasks/tasks.component";

@Component({
  standalone: true,
  imports: [ TasksComponent ],
  selector: "app-one-off",
  templateUrl: "./one-off.component.html",
  styleUrls: ["./one-off.component.scss"],
})
export class OneOffComponent {}
