import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment';
import { Driver } from './racing-teams.service';

export interface PoolTeam{
    id: number;
    userid: number;
    poolid: number;
    raceid: number;
    drivers: Driver[];
}

@Injectable({
    providedIn: 'root'
  })
  export class PoolTeamService {
    constructor(private http: HttpClient) { }
  
    createPoolTeam(poolTeam: PoolTeam){
        console.log(poolTeam);
        return this.http.post(`${environment.apiUrl}/poolteams/`, poolTeam);
    }
  }