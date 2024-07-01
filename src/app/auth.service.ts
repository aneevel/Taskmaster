import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth: boolean;

  constructor() { 
    this.isAuth = false;
  }

  setAuth(auth: boolean) {
      this.isAuth = auth;
  }

  getAuth(): boolean {
      return this.isAuth;
  }

  authenticate() {
      this.setAuth(true);
  }

  unauthenticate() {
      this.setAuth(false);
  }

}
