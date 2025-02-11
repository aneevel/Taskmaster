import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
export const authGuard = (route, state) => {
    return inject(UserService).isLoggedIn()
        ? true
        : inject(Router).createUrlTree(['/login']);
};
//# sourceMappingURL=auth.guard.js.map