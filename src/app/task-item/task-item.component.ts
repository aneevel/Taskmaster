import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { UserTasksService } from '../user-tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  dateString: string = "";

  @Input({ required: true }) id!: string;
  @Input({ required: true }) description!: string;
  @Input({ required: true }) priority!: string;
  @Input({ required: true }) dueDate!: Date;
  @Input({ required: true }) occurrence!: string;

  constructor(private taskService: UserTasksService) {

  }

  ngOnInit() {
    this.dateString = new Date(this.dueDate.toString().slice(1, -1)).toLocaleDateString();
  }

  deleteTask() {
    this.taskService.deleteTask(this.id).subscribe({
      next: () => console.log("deleted!"),
      error: (error) => console.error(error),
    });
  }
}
