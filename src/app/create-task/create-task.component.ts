import { Component } from '@angular/core';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-create-task',
  imports: [ DropdownModule, CalendarModule, ReactiveFormsModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {
  taskForm = new FormGroup({
    description : new FormControl(''),
    priority : new FormControl(''),
    dueDate: new FormControl(''), 
  });

  // Eventually should be user-defined, with system fallback
  priorities = [ 
    'High',
    'Medium',
    'Low'
  ];

}
