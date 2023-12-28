import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext'
import { InputTextareaModule } from 'primeng/inputtextarea'
import { DropdownModule } from 'primeng/dropdown';

@Component({
  standalone: true,
  selector: 'app-create-task',
  imports: [ DropdownModule],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss'],
})
export class CreateTaskComponent {

}
