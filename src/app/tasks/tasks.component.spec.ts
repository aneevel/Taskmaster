import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksComponent } from './tasks.component';
import { DialogService } from 'primeng/dynamicdialog';
import { UserTasksService } from '../user-tasks.service';
import { ApiGatewayService } from '../api-gateway.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;
  let userTasksService: jasmine.SpyObj<UserTasksService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    const userTasksSpy = jasmine.createSpyObj('UserTasksService', ['loadUserTasks', 'getTasks$']);
    const dialogSpy = jasmine.createSpyObj('DialogService', ['open']);

    TestBed.configureTestingModule({
      imports: [
        TasksComponent,
        ButtonModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: UserTasksService, useValue: userTasksSpy },
        { provide: DialogService, useValue: dialogSpy },
        {
          provide: ApiGatewayService,
          useFactory: (http: HttpClient) => new ApiGatewayService(http, false),
          deps: [HttpClient]
        }
      ]
    });

    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    userTasksService = TestBed.inject(UserTasksService) as jasmine.SpyObj<UserTasksService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more tests as needed
});
