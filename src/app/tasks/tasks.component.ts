import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [ ButtonModule ]
})
export class TasksComponent {

  openCreateTask() {
    console.log("Create new task")
  }
}
