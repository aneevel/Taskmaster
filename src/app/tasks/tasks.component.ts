import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { UserTasksService } from '../user-tasks.service';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  standalone: true,
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  imports: [ ButtonModule, 
    CommonModule,
    TaskItemComponent],
  providers: [DialogService]
})
export class TasksComponent {

  ref: DynamicDialogRef | undefined;
  @Input({ required: true}) occurrence! : string;

  constructor(public dialogService: DialogService,
    public userTasksService: UserTasksService) {}

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
