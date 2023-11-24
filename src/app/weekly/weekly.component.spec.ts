import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyComponent } from './weekly.component';

describe('WeeklyComponent', () => {
  let component: WeeklyComponent;
  let fixture: ComponentFixture<WeeklyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyComponent]
    });
    fixture = TestBed.createComponent(WeeklyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
