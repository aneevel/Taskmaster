import { TestBed } from "@angular/core/testing";
import { MonthlyComponent } from "./monthly.component";
describe("MonthlyComponent", () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [MonthlyComponent],
        });
        fixture = TestBed.createComponent(MonthlyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=monthly.component.spec.js.map