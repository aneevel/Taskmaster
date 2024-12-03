import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";

import { of } from 'rxjs';

import { LoginComponent } from './login.component';
import routes from "../routes";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes),
          LoginComponent,
        HttpClientTestingModule]
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
  });
});
