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

  getById(poolId: number){
    return this.http.get(`${environment.apiUrl}/pools/${poolId}`);
  }

  createPool(pool: Pool) {
    return this.http.post(`${environment.apiUrl}/pools/`, pool);
  }

  removePool(pool: Pool) {
    return this.http.delete(`${environment.apiUrl}/pools/${pool.id}`);
  }
}
