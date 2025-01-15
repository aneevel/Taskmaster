import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import { DateTime } from 'luxon';
import { environment } from '../environments/environment';
import { User } from './models/user.model';

interface RegisterRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private userSubject: BehaviorSubject<User | null>;
    public user$: Observable<User | null>;
    public isAuthenticated$: Observable<boolean>;

    public API_URL: string = environment.api.serverUrl;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject<User | null>(null);
        this.user$ = this.userSubject.asObservable();
        this.isAuthenticated$ = this.user$.pipe(
            map(user => !!user && !this.isExpired())
        );

        // Check local storage on startup
        this.checkStoredUser();
    }

    private checkStoredUser() {
        const storedUser = localStorage.getItem('user');
        const token = localStorage.getItem('id_token');
        if (storedUser && token && !this.isExpired()) {
            this.userSubject.next(JSON.parse(storedUser));
        }
    }

    public get userValue(): User | null {
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

    register(data: RegisterRequest) {
        return this.http.post<{ idToken: string, expiresIn: string}>(
            `${this.API_URL}/register`, 
            {
                email: data.email,
                password: data.password,
                fname: data.firstName,
                lname: data.lastName
            }
        ).pipe(
            tap(res => this.setSession(res))
        );
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
