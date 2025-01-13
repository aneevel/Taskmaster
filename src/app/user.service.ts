import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap, map } from 'rxjs';
import * as moment from "moment";
import { environment } from '../environments/environment';
import { ApiGatewayService } from './api-gateway.service';
import { DateTime } from 'luxon';

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
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;
    public isAuthenticated$: Observable<boolean>;

    public API_URL: string = environment.api.serverUrl;

    constructor(
        private router: Router,
        private http: HttpClient,
        private apiGateway: ApiGatewayService
    ) { 
        // Initialize with null user to indicate not authenticated
        this.userSubject = new BehaviorSubject<User>(null!);
        this.user = this.userSubject.asObservable();
        this.isAuthenticated$ = this.user.pipe(
            map(user => !!user && !this.isExpired())
        );

    }

    public get userValue(): User {
        return this.userSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<{ accessToken: string, userId: string}>(`${environment.api.serverUrl}/login`, { email, password })
            .pipe(
                tap(res => {
                    this.setSession(res);
                })
            );

    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        this.userSubject.next(null!);
        this.router.navigate(['/login']);
    }

    register(data: RegisterRequest) {
        return this.http.post<{ accessToken: string, userId: string}>(
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
        return this.http.patch<{ accessToken: string, userId: string}>(`${environment.api.serverUrl}/changePassword`, { email, oldPassword, newPassword })
            .pipe(
                tap(res => this.setSession(res)));
    }

    private setSession(result: { accessToken: string, userId: string}) {
        const expiresAt = DateTime.now().plus({ hours: 1 });

        localStorage.setItem('access_token', result.accessToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt));

        this.apiGateway.getUser(result.userId).subscribe(user => this.userSubject.next(user));
        console.log(this.userValue);
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
