import { TestBed } from "@angular/core/testing";
import { AccountComponent } from "./account.component";
describe("AccountComponent", () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [AccountComponent],
        });
        fixture = TestBed.createComponent(AccountComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=account.component.spec.js.map