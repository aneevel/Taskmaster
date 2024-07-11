import { TestBed } from "@angular/core/testing";
import { DailyComponent } from "./daily.component";
describe("DailyComponent", () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [DailyComponent],
        });
        fixture = TestBed.createComponent(DailyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=daily.component.spec.js.map