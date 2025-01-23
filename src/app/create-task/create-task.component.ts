import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { UserTasksService } from '../user-tasks.service';
import { Task } from '../models/task.model';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user.service';

@Component({
  standalone: true,
  selector: 'app-create-task',
  imports: [ 
    DropdownModule, 
    CalendarModule, 
    ReactiveFormsModule, 
    CommonModule,
    InputTextModule
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm = new FormGroup({
    description: new FormControl<string>('', { nonNullable: true }),
    priority: new FormControl<string>('', { nonNullable: true }),
    dueDate: new FormControl<Date | null>(null),
    occurrence: new FormControl<string>('Once', { nonNullable: true }),
    weeklyDay: new FormControl<string>('Sunday', { nonNullable: true }),
    monthlyDay: new FormControl<Date | null>(null)
  });

  priorities = ['High', 'Medium', 'Low'];
  occurrences = ['Once', 'Daily', 'Weekly', 'Monthly'];
  weekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor(
    private userTasks: UserTasksService,
    private readonly dialogRef: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private userService: UserService
  ) { }

  get showWeeklyPicker(): boolean {
    return this.taskForm.get('occurrence')?.value === 'Weekly';
  }

  get showMonthlyPicker(): boolean {
    return this.taskForm.get('occurrence')?.value === 'Monthly';
  }

  get showDueDate(): boolean {
    return this.taskForm.get('occurrence')?.value === 'Once';
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
    let dueDate: Date | null | undefined = null;
    const currentUser = this.userService.userValue;

    if (!currentUser) {
      throw new Error('No authenticated user found');
    }

    if (occurrenceValue === 'Weekly') {
        const weekDay = this.taskForm.get('weeklyDay')?.value;
        selectedDate = weekDay ? new Date(weekDay) : null;
    } else if (occurrenceValue === 'Monthly') {
        selectedDate = this.taskForm.get('monthlyDay')?.value;
        if (selectedDate) {
            selectedDate = this.adjustMonthlyDate(selectedDate);
        }
    } else if (occurrenceValue === 'Once') {
        dueDate = this.taskForm.get('dueDate')?.value;
    }

    const newTask = {
        title: this.taskForm.controls['description'].value,
        description: this.taskForm.controls['description'].value,
        occurrence: occurrenceValue,
        priority: this.taskForm.controls['priority'].value,
        dueDate: dueDate,
        recurringDate: selectedDate
    };

    return this.userTasks.createTask(currentUser.id, newTask).pipe(
      tap(() => this.closeDialog())
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
