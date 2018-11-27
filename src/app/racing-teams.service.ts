import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Driver{
    id: number;
    firstname: String;
    lastname: String;
    salary: number;
    teamid: number;
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

    createRacingTeam(team: Team){
      return this.http.post(`${environment.apiUrl}/teams/`, team);
    }

    editRacingTeam(team: Team){
      return this.http.patch(`${environment.apiUrl}/teams/`, team);
    }

    deleteRacingTeam(teamid: number) {
      return this.http.delete(`${environment.apiUrl}/teams/` + teamid);
    }

    deleteDriver(driverid: number){
      return this.http.delete(`${environment.apiUrl}/drivers/` + driverid);
    }

    createDriver(driver: Driver){
      return this.http.post(`${environment.apiUrl}/drivers/`, driver);
    }

    editDriver(driver: Driver){
      return this.http.patch(`${environment.apiUrl}/drivers/`, driver);
    }
  }