import { __decorate } from "tslib";
import { Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';
import * as moment from "moment";
import { environment } from '../environments/environment';
let UserService = class UserService {
    constructor(router, http) {
        this.router = router;
        this.http = http;
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }
    get userValue() {
        return this.userSubject.value;
    }
    login(email, password) {
        return this.http.post(`${environment.api.serverUrl}/login`, { email, password })
            .pipe(tap(res => this.setSession(res)));
    }
    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.userSubject.next(null);
        this.router.navigate(['/login']);
    }
    register(email, password, fname, lname) {
        return this.http.post(`${environment.api.serverUrl}/register`, { email, password, fname, lname })
            .pipe(tap(res => this.setSession(res)));
    }
    setSession(result) {
        const expiresAt = moment().add(result.expiresIn, 'second');
        localStorage.setItem('id_token', result.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
    }
    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }
    isLoggedOut() {
        return !this.isLoggedIn();
    }
    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
};
UserService = __decorate([
    Injectable({
        providedIn: 'root'
    })
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map