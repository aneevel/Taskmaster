import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FooterComponent ]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have anchor items for portfolio, github repo', () => {
    const portfolioElement = fixture.debugElement.query(By.css('#footer-portfolio'));
    expect(portfolioElement).toBeTruthy();

    const githubElement = fixture.debugElement.query(By.css('#footer-github'));
    expect(githubElement).toBeTruthy();
  });
});
