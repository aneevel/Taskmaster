import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [ ButtonModule ]
})
export class TasksComponent {

  @ViewChild("createTaskContainer", { read: ViewContainerRef }) createTaskContainer: any;

  openCreateTask() {
    this.createTaskContainer.clear();
    const createTaskModal = this.createTaskContainer.createComponent(CreateTaskComponent)
  }
}
