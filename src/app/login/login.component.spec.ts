import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { of } from 'rxjs';

import { UserService } from '../user.service';
import { LoginComponent } from './login.component';
import routes from "../routes";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  const userServiceStub: jasmine.SpyObj<UserService> = jasmine.createSpyObj(
      'userService',
      ['login']
  );

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes),
          LoginComponent,
        HttpClientTestingModule],
      providers: [
          {
              provide: UserService,
              useValue: userServiceStub 
          }
      ]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke user service when form is valid', () => {
        const email = component.form['username'];
        email.setValue('test@test.com');
        const password = component.form['password'];
        password.setValue('123456789');
        userServiceStub.login.and.returnValue(of());

        fixture.nativeElement.querySelector('button').click();
        expect(userServiceStub.login.calls.any()).toBeTruthy();
        expect(userServiceStub.login).toHaveBeenCalledWith(
            email.value,
            password.value 
        );
  });
});
