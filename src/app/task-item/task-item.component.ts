import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent implements OnInit {

  dateString: string = "";

  @Input({ required: true }) description!: string;
  @Input({ required: true }) priority!: string;
  @Input({ required: true }) dueDate!: Date;
  @Input({ required: true }) occurrence!: string;

  ngOnInit() {
    this.dateString = new Date(this.dueDate.toString().slice(1, -1)).toLocaleDateString();
  }
}
