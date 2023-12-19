import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateTaskComponent } from '../create-task/create-task.component';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [ ButtonModule],
  providers: [DialogService]
})
export class TasksComponent {

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  openCreateTask() {
    this.ref = this.dialogService.open(CreateTaskComponent, {
      header: 'Create A New Task',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }
}
