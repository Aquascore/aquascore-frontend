import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  signUp(user) {
    return this.http.post(`${environment.apiUrl}/users/sign-up`, user);
  }

  signIn(login) {
    return this.http
      .post(`${environment.apiUrl}/users/sign-in`, login)
      .pipe(map((res: any) => {
        localStorage.setItem('access_token', res.token);
        this.loggedIn = true;
      }));
  }

  logOut() {
    localStorage.removeItem('access_token');
    this.loggedIn = false;
  }

  isLoggedIn() {
    return this.loggedIn;
  }
}
