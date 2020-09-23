import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { tap, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isLoggedIn = false;

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  login(flag:boolean) {
    //console.log(flag);
    if(flag){
      this.isLoggedIn = true
    }
    /* return of(true).pipe(
      delay(1000),
      tap(val => this.isLoggedIn = true)
    ); */
  }

  logout(): void {
    this.isLoggedIn = false;
  }
}
