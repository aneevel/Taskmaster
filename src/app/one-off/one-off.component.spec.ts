import { ComponentFixture, TestBed } from "@angular/core/testing";

import { OneOffComponent } from "./one-off.component";

describe("OneOffComponent", () => {
  let component: OneOffComponent;
  let fixture: ComponentFixture<OneOffComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OneOffComponent],
    });
    fixture = TestBed.createComponent(OneOffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
