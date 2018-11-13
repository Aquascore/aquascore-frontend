import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Driver{
    id: number;
    first_name: String;
    last_name: String;
    salary: number;
    team_id: number;
}

export interface Team{
    id: number;
    name: String;
    teamcol: String;
    drivers: Driver[];
}

@Injectable({
    providedIn: 'root'
  })
  export class RacingTeamsService {
    constructor(private http: HttpClient) { }
  
    getRacingTeams() {
      return this.http.get(`${environment.apiUrl}/teams/`);
    }

    deleteRacingTeam(teamid: number) {
      return this.http.delete(`${environment.apiUrl}/teams/` + teamid + '/');
    }

    // Meer
  }