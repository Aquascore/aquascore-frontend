import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface Pool {
  id: number;
  owner: User;
  name: string;
  users: User[];
}

@Injectable({
  providedIn: 'root'
})
export class PoolsService {
  constructor(private http: HttpClient) { }

  getUserPools() {
    return this.http.get(`${environment.apiUrl}/pools/`);
  }
}
