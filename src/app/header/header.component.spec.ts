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
      imports: [RouterTestingModule.withRoutes(routes), HeaderComponent],
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

  it("should have items for home, daily, weekly, monthly, one-off, account, login, logout, and register", () => {
    const homeElement = fixture.debugElement.query(By.css("#nav-home"));
    expect(homeElement).toBeTruthy();

    const dailyElement = fixture.debugElement.query(By.css("#nav-daily"));
    expect(dailyElement).toBeTruthy();

    const weeklyElement = fixture.debugElement.query(By.css("#nav-weekly"));
    expect(weeklyElement).toBeTruthy();

    const monthlyElement = fixture.debugElement.query(By.css("#nav-monthly"));
    expect(monthlyElement).toBeTruthy();

    const oneOffElement = fixture.debugElement.query(By.css("#nav-one-off"));
    expect(oneOffElement).toBeTruthy();

    const accountElement = fixture.debugElement.query(By.css("#nav-account"));
    expect(accountElement).toBeTruthy();

    const loginElement = fixture.debugElement.query(By.css("#nav-login"));
    expect(loginElement).toBeTruthy();

    const logoutElement = fixture.debugElement.query(By.css("#nav-logout"));
    expect(logoutElement).toBeTruthy();

    const registerElement = fixture.debugElement.query(By.css("#nav-register"));
    expect(registerElement).toBeTruthy();
  });

  it("should navigate to home", fakeAsync(() => {
    router.navigate(["/"]).then(() => {
      expect(location.path()).toBe("/");
    });
  }));

  it("should navigate to daily", fakeAsync(() => {
    router.navigate(["/daily"]).then(() => {
      expect(location.path()).toBe("/daily");
    });
  }));

  it("should navigate to weekly", fakeAsync(() => {
    router.navigate(["/weekly"]).then(() => {
      expect(location.path()).toBe("/weekly");
    });
  }));

  it("should navigate to monthly", fakeAsync(() => {
    router.navigate(["/monthly"]).then(() => {
      expect(location.path()).toBe("/monthly");
    });
  }));

  it("should navigate to one-off", fakeAsync(() => {
    router.navigate(["/one-off"]).then(() => {
      expect(location.path()).toBe("/one-off");
    });
  }));

  it("should navigate to account", fakeAsync(() => {
    router.navigate(["/account"]).then(() => {
      expect(location.path()).toBe("/account");
    });
  }));

  it("should navigate to login", fakeAsync(() => {
    router.navigate(["/login"]).then(() => {
      expect(location.path()).toBe("/login");
    });
  }));

  it("should navigate to logout", fakeAsync(() => {
    router.navigate(["/logout"]).then(() => {
      expect(location.path()).toBe("/logout");
    });
  }));

  it("should navigate to register", fakeAsync(() => {
    router.navigate(["/register"]).then(() => {
      expect(location.path()).toBe("/register");
    });
  }));
});
