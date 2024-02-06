import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaskComponent } from './create-task.component';
import { By } from '@angular/platform-browser';
import { DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateTaskComponent],
      providers: [DynamicDialogRef, 
        DynamicDialogConfig]
    });
    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have task description, priority, due date, cancel, and save elements', () => {
    const descriptionElement = fixture.debugElement.query(By.css('form input#task-description'))
    expect(descriptionElement).toBeTruthy();

    const priorityElement = fixture.debugElement.query(By.css('form p-dropdown#task-priority'));
    expect(priorityElement).toBeTruthy();

    const dueDateElement = fixture.debugElement.query(By.css('form p-calendar#task-due-date'));
    expect(dueDateElement).toBeTruthy();

    const cancelButton = fixture.debugElement.query(By.css('form p-button#task-cancel'));
    expect(cancelButton).toBeTruthy(); 

    const saveButton = fixture.debugElement.query(By.css('form p-button#task-save'));
    expect(saveButton).toBeTruthy();
  });
});
