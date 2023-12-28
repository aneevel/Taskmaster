import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { TasksComponent } from './tasks.component';
import { By } from '@angular/platform-browser';

describe('TasksComponent', () => {
  let component: TasksComponent;
  let fixture: ComponentFixture<TasksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TasksComponent]
    });
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

  it('should have a modal element when openCreateTask is called', fakeAsync(() => {
    const button = fixture.debugElement.query(By.css('p-button#create-task'));
    button.nativeElement.click();
    tick();

    const createTaskModal = fixture.debugElement.query(By.css('p-dynamicdialog'));
    expect(createTaskModal).toBeTruthy()
  }));
});
