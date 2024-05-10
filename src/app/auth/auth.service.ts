import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn(): boolean {
    if (typeof localStorage !== 'undefined') {
      let user: any = localStorage.getItem('user');
      return user !== null ? true : false;
    }
    return false; // localStorage is not available, consider the user as not logged in
  }
}
