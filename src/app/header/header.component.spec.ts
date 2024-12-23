import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  getTestBed,
} from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { Router } from "@angular/router";
import { Location } from "@angular/common";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from "./header.component";
import { By } from "@angular/platform-browser";
import routes from "../routes";

describe("HeaderComponent", () => {
  let location: Location;
  let router: Router;
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes), 
          HeaderComponent,
      HttpClientTestingModule],
    });

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    router.initialNavigation();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  /**it("should have login and create account buttons if user is unauthenticated", () => {

    const loginElement = fixture.debugElement.query(By.css("#nav-login"));
    expect(loginElement).toBeTruthy();

    const createAccountElement = fixture.debugElement.query(By.css("#nav-register"));
    expect(createAccountElement).toBeTruthy();
  });

  it("should not have logout or account button if user is not authenticated", () => {

  });*/

  it("should navigate to home", fakeAsync(() => {
    router.navigate(["/"]).then(() => {
      expect(location.path()).toBe("/");
    });
  }));

  it("should navigate to login", fakeAsync(() => {
    router.navigate(["/login"]).then(() => {
      expect(location.path()).toBe("/login");
    });
  }));

  it("should navigate to register", fakeAsync(() => {
    router.navigate(["/register"]).then(() => {
      expect(location.path()).toBe("/register");
    });
  }));
});
