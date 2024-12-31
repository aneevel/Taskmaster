import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Router } from '@angular/router';

import { TasksComponent } from './tasks.component';
import { By } from '@angular/platform-browser';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let httpMock: HttpTestingController;
  let router: Router;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TasksComponent, HttpClientTestingModule],
      providers: [
          { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ]
    });

    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(TasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a create task button', () => {
    const createTaskButton = fixture.debugElement.query(By.css('p-button#create-task'));
    expect(createTaskButton).toBeTruthy();
  });

  it('should call openCreateTask on click', fakeAsync(() => {
    spyOn(component, 'openCreateTask');

    const button = fixture.debugElement.query(By.css('p-button#create-task'));
    button.nativeElement.click();
    tick();
    expect(component.openCreateTask).toHaveBeenCalled();
  }));
});
