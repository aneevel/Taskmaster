import { Component, Input } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserTasksService } from '../user-tasks.service';
import { Task } from '../models/task.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-create-task',
  imports: [ DropdownModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm = new FormGroup({
    description : new FormControl<string>('', { nonNullable: true}),
    priority : new FormControl<string>('', { nonNullable: true}),
    dueDate: new FormControl<Date>(new Date(), { nonNullable: true}), 
  });

  @Input({ required: true }) occurrence!: string;

  // Eventually should be user-defined, with system fallback
  priorities = [ 
    'High',
    'Medium',
    'Low'
  ];

  constructor(
    private userTasks: UserTasksService,
    private readonly dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { }

  saveTask(): Observable<Task> {
    const newTask = { 
        title: this.taskForm.controls['description'].value,
        description: this.taskForm.controls['description'].value,
        occurrence: this.config.data.occurrence,
        priority: this.taskForm.controls['priority'].value,
        dueDate: this.taskForm.controls['dueDate'].value,
    };

    return this.userTasks.createTask('user1', newTask).pipe(
        tap(() => this.closeDialog())
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
