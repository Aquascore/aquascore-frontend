import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user.service';

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

  createPool(pool: Pool) {
    return this.http.post(`${environment.apiUrl}/pools/`, pool);
  }
}
