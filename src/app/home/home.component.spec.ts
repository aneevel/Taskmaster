  import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from "@angular/core";
import { By } from '@angular/platform-browser';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let debugElement: DebugElement;

  beforeEach(() => {

    TestBed.configureTestingModule({
        imports: [
            HttpClientTestingModule
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

});
