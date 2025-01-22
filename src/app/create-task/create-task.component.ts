import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  imports: [ DropdownModule, CalendarModule, ReactiveFormsModule, CommonModule ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm = new FormGroup({
    description: new FormControl<string>('', { nonNullable: true }),
    priority: new FormControl<string>('', { nonNullable: true }),
    dueDate: new FormControl<Date>(new Date(), { nonNullable: true }),
    occurrence: new FormControl<string>('Once', { nonNullable: true }),
    weeklyDay: new FormControl<Date | null>(null),
    monthlyDay: new FormControl<Date | null>(null)
  });

  priorities = ['High', 'Medium', 'Low'];
  occurrences = ['Once', 'Daily', 'Weekly', 'Monthly'];

  constructor(
    private userTasks: UserTasksService,
    private readonly dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
  ) { }

  get showWeeklyPicker(): boolean {
    return this.taskForm.get('occurrence')?.value === 'Weekly';
  }

  get showMonthlyPicker(): boolean {
    return this.taskForm.get('occurrence')?.value === 'Monthly';
  }

  adjustMonthlyDate(date: Date): Date {
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    if (date.getDate() > lastDayOfMonth) {
      return new Date(date.getFullYear(), date.getMonth(), lastDayOfMonth);
    }
    return date;
  }

  saveTask(): Observable<Task> {
    const occurrenceValue = this.taskForm.get('occurrence')?.value ?? 'Once';
    let selectedDate: Date | null | undefined = null;

    if (occurrenceValue === 'Weekly') {
      selectedDate = this.taskForm.get('weeklyDay')?.value;
    } else if (occurrenceValue === 'Monthly') {
      selectedDate = this.taskForm.get('monthlyDay')?.value;
      if (selectedDate) {
        selectedDate = this.adjustMonthlyDate(selectedDate);
      }
    }

    const newTask = {
      title: this.taskForm.controls['description'].value,
      description: this.taskForm.controls['description'].value,
      occurrence: occurrenceValue,
      priority: this.taskForm.controls['priority'].value,
      dueDate: this.taskForm.controls['dueDate'].value,
      recurringDate: selectedDate
    };

    return this.userTasks.createTask('user1', newTask).pipe(
      tap(() => this.closeDialog())
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
