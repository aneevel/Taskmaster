import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
let AuthService = class AuthService {
    constructor() {
        this.isAuth = false;
    }
    setAuth(auth) {
        this.isAuth = auth;
    }
    getAuth() {
        return this.isAuth;
    }
    authenticate() {
        this.setAuth(true);
    }
    unauthenticate() {
        this.setAuth(false);
    }
};
AuthService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map