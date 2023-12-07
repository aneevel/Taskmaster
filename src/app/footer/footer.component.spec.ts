import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterComponent } from './footer.component';
import { By } from '@angular/platform-browser';

describe('FooterComponent', () => {
  let component: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FooterComponent]
    });
    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have items for GitHub, Twitter, and Personal Portfolio', () => {
    const githubElement = fixture.debugElement.query(By.css('a#github'));
    expect(githubElement).toBeTruthy();

    const twitterElement = fixture.debugElement.query(By.css('a#twitter'));
    expect(twitterElement).toBeTruthy();

    const portfolioElement = fixture.debugElement.query(By.css('a#portfolio'));
    expect(portfolioElement).toBeTruthy();
  });


});
