import { TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
describe('TaskItemComponent', () => {
    let component;
    let fixture;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TaskItemComponent]
        });
        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=task-item.component.spec.js.map