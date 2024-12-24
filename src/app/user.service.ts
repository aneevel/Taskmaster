import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as moment from "moment";
import { environment } from '../environments/environment';
import { DateTime } from 'luxon';

import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    public API_URL: string = environment.api.serverUrl;

  constructor(
    private router: Router,
    private http: HttpClient) { 
        this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user') || '{}'));
        this.user = this.userSubject.asObservable();
    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<{ idToken: string, expiresIn: string}>(`${environment.api.serverUrl}/login`, { email, password })
            .pipe(
                tap(res => this.setSession(res)));
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        this.userSubject.next(null!);
        this.router.navigate(['/login']);
    }

    register(email: string, password: string, fname: string, lname: string) {
        return this.http.post<{ idToken: string, expiresIn: string}>(`${environment.api.serverUrl}/register`, { email, password, fname, lname })
            .pipe(
                tap(res => this.setSession(res)));
    }

    changePassword(email: string, oldPassword: string, newPassword: string) {
        return this.http.patch<{ idToken: string, expiresIn: string}>(`${environment.api.serverUrl}/changePassword`, { email, oldPassword, newPassword })
            .pipe(
                tap(res => this.setSession(res)));
    }

    private setSession(result: { idToken: string, expiresIn: string}) {
        const expiresAt = DateTime.now().plus({ hours: 1 });

        localStorage.setItem('id_token', result.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt));
    }

    public isLoggedIn() {
        return this.userValue != null && !this.isExpired();
    }

    setExpiry(expiry: DateTime) {
        localStorage.setItem("expires_at", JSON.stringify(expiry));
    }

    isExpired() {
        return DateTime.now() > DateTime.fromISO(JSON.parse(localStorage.getItem("expires_at")!));
    }
}
