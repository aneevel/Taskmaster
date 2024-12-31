import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { CreateTaskComponent } from './create-task.component';
import { By } from '@angular/platform-browser';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CreateTaskComponent, HttpClientTestingModule],
      providers: [DynamicDialogRef, 
        DynamicDialogConfig,
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
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
