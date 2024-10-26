import { TestBed } from '@angular/core/testing';
import { authGuard } from './auth.guard';
describe('authGuard', () => {
    const executeGuard = (...guardParameters) => TestBed.runInInjectionContext(() => authGuard(...guardParameters));
    beforeEach(() => {
        TestBed.configureTestingModule({});
    });
    it('should be created', () => {
        expect(executeGuard).toBeTruthy();
    });
});
//# sourceMappingURL=auth.guard.spec.js.map