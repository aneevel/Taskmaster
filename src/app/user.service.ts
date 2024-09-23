import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import * as moment from "moment";
import { environment } from '../environments/environment';

import { User } from './user/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

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
        return this.http.post<User>(`${environment.api.serverUrl}/login`, { email, password })
            .pipe(
                tap(res => this.setSession));
    }

    logout() {
        localStorage.removeItem('user');
        this.userSubject.next(null!);
        this.router.navigate(['/login']);
    }

    register(email: string, password: string, fname: string, lname: string) {
        return this.http.post<User>(`${environment.api.serverUrl}/register`, { email, password, fname, lname })
            .pipe(
                tap(res => this.setSession));
    }

    private setSession(result: { idToken: string, expiresIn: string}) {
        const expiresAt = moment().add(result.expiresIn, 'second');

        localStorage.setItem('id_token', result.idToken);
        localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem("expires_at");
        const expiresAt = JSON.parse(expiration!);
        return moment(expiresAt);
    }
}
