import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTaskComponent } from './create-task.component';
import { By } from '@angular/platform-browser';
import { UserTasksService } from '../user-tasks.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicdialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiGatewayService } from '../api-gateway.service';
import { HttpClient } from '@angular/common/http';
import { AUTO_START_HEALTH_CHECK } from '../api-gateway.service';

describe('CreateTaskComponent', () => {
  let component: CreateTaskComponent;
  let fixture: ComponentFixture<CreateTaskComponent>;
  let userTasksService: jasmine.SpyObj<UserTasksService>;
  let dialogRef: jasmine.SpyObj<DynamicDialogRef>;

  beforeEach(() => {
    const userTasksSpy = jasmine.createSpyObj('UserTasksService', ['createTask']);
    const dialogRefSpy = jasmine.createSpyObj('DynamicDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [
        CreateTaskComponent,
        ReactiveFormsModule,
        CalendarModule,
        DropdownModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserTasksService, useValue: userTasksSpy },
        { provide: DynamicDialogRef, useValue: dialogRefSpy },
        { provide: DynamicDialogConfig, useValue: { data: { occurrence: 'daily' } } },
        { provide: AUTO_START_HEALTH_CHECK, useValue: false },
        ApiGatewayService
      ]
    });

    fixture = TestBed.createComponent(CreateTaskComponent);
    component = fixture.componentInstance;
    userTasksService = TestBed.inject(UserTasksService) as jasmine.SpyObj<UserTasksService>;
    dialogRef = TestBed.inject(DynamicDialogRef) as jasmine.SpyObj<DynamicDialogRef>;
    
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
