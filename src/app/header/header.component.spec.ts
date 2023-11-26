import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HeaderComponent]
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items for home, daily, weekly, monthly, one-off, account, login, logout, and register', () => {
    const homeElement = fixture.debugElement.query(By.css('#nav-home'));
    expect(homeElement).toBeTruthy();

    const dailyElement = fixture.debugElement.query(By.css('#nav-daily'));
    expect(dailyElement).toBeTruthy();

    const weeklyElement = fixture.debugElement.query(By.css('#nav-weekly'));
    expect(weeklyElement).toBeTruthy();

    const monthlyElement = fixture.debugElement.query(By.css('#nav-monthly'));
    expect(monthlyElement).toBeTruthy();

    const oneOffElement = fixture.debugElement.query(By.css('#nav-one-off'));
    expect(oneOffElement).toBeTruthy();

    const accountElement = fixture.debugElement.query(By.css('#nav-account'));
    expect(accountElement).toBeTruthy();

    const loginElement = fixture.debugElement.query(By.css('#nav-login'));
    expect(loginElement).toBeTruthy();

    const logoutElement = fixture.debugElement.query(By.css('#nav-logout'));
    expect(logoutElement).toBeTruthy();

    const registerElement = fixture.debugElement.query(By.css('#nav-register'));
    expect(registerElement).toBeTruthy();
  });
});
