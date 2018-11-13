import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = false;

  constructor(private http: HttpClient) {
    this.loggedIn = !!localStorage.getItem('access_token');
  }

  getCurrentUser() {
    return this.http.get(`${environment.apiUrl}/users/me`);
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

  search(query: string) {
    const params = new HttpParams().set("query", query);
    return this.http.get(`${environment.apiUrl}/users/find`, {params: params});
  }
}
