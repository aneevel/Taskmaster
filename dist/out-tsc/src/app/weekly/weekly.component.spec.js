import { TestBed } from "@angular/core/testing";
import { WeeklyComponent } from "./weekly.component";
import { By } from "@angular/platform-browser";
describe("WeeklyComponent", () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [WeeklyComponent],
        });
        fixture = TestBed.createComponent(WeeklyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
    it("should only have weekly tasks", () => {
        // Create a couple tasks, some not weekly
        // If there are any non-weekly tasks, they can be grabbed by any
        // occurrence class other than "Weekly" - the existence of just one
        // is a failure
        const notMatchingTask = fixture.debugElement.query(By.css('app-task-item'));
        expect(notMatchingTask).toBeFalsy();
    });
});
//# sourceMappingURL=weekly.component.spec.js.map