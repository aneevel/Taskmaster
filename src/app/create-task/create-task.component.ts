import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserTasksService } from '../user-tasks.service';
import { Task } from '../task';

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

  // Eventually should be user-defined, with system fallback
  priorities = [ 
    'High',
    'Medium',
    'Low'
  ];

  constructor(
    private userTasks: UserTasksService
  ) { }

  saveTask() : Task {

    // Add validation so we don't add empty tasks
    const newTask: Task = { 
      id: 'null',
      description: this.taskForm.controls['description'].value,
      priority: this.taskForm.controls['priority'].value,
      dueDate: this.taskForm.controls['dueDate'].value,
      occurrence: 'Daily'
    }
    this.userTasks.addTask(newTask)
    return newTask 
  }

}
