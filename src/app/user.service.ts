import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import * as moment from "moment";
import { environment } from '../environments/environment';
import { DateTime } from 'luxon';

import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public isAuthenticated$: Observable<boolean>;

    public API_URL: string = environment.api.serverUrl;

    constructor(
        private router: Router,
        private http: HttpClient
    ) { 
        // Initialize with null user to indicate not authenticated
        this.userSubject = new BehaviorSubject<User>(null!);
        this.user = this.userSubject.asObservable();
        this.isAuthenticated$ = this.user.pipe(
            map(user => !!user && !this.isExpired())
        );

        const storedUser = localStorage.getItem('user');
        if (storedUser && !this.isExpired()) {
            this.userSubject.next(JSON.parse(storedUser));
        }
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
