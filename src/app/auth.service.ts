import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAuth: boolean;

  constructor() { 
    this.isAuth = false;
  }

  public setAuth(auth: boolean) {
      this.isAuth = auth;
  }

  public getAuth(): boolean {
      return this.isAuth;
  }

  public authenticate() {
      this.setAuth(true);
  }

  public unauthenticate() {
      this.setAuth(false);
  }

}
