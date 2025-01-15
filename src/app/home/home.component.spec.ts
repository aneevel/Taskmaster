import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { TasksComponent } from '../tasks/tasks.component';
import { AboutComponent } from '../about/about.component';
import { CommonModule } from '@angular/common';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;
  let userMock: jasmine.SpyObj<UserService>;

  beforeEach(() => {
    userMock = jasmine.createSpyObj('UserService', ['isLoggedIn'], {
      isAuthenticated$: of(false)  // Default to unauthenticated
    });

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        CommonModule,
        HomeComponent,
        TasksComponent,
        AboutComponent
      ],
      providers: [
        { provide: UserService, useValue: userMock }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain a div container at the top level', () => {
    const topLevel = debugElement.query(
        By.css('[data-testid="top-level"]')
    );
    expect(topLevel).toBeTruthy();
  });

  it('should contain an about component if unauthenticated', () => {
    const aboutComponent = debugElement.query(
        By.css('app-about')
    );
    expect(aboutComponent).toBeTruthy();
  });

  it('should contain a tasks component if authenticated', () => {
    const tasksComponent = debugElement.query(
        By.css('app-tasks')
    );
    expect(tasksComponent).toBeTruthy();
  });

});
