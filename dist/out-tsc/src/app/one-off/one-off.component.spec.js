import { TestBed } from "@angular/core/testing";
import { OneOffComponent } from "./one-off.component";
describe("OneOffComponent", () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [OneOffComponent],
        });
        fixture = TestBed.createComponent(OneOffComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=one-off.component.spec.js.map