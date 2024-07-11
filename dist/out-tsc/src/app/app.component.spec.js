import { TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { AppComponent } from "./app.component";
describe("AppComponent", () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [RouterTestingModule, AppComponent],
    }));
    it("should create the app", () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
    it(`should have as title 'Taskmaster'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual("Taskmaster");
    });
});
//# sourceMappingURL=app.component.spec.js.map