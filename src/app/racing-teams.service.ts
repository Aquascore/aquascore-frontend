import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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

    getRacingTeam(id: number){
      return this.http.get(`${environment.apiUrl}/teams/` + id);
    }

    createRacingTeam(team: Team){
      return this.http.post(`${environment.apiUrl}/teams/`, team);
    }

    editRacingTeam(id: number, team: Team){
      return this.http.patch(`${environment.apiUrl}/teams/` + id, team);
    }

    deleteRacingTeam(teamid: number) {
      return this.http.delete(`${environment.apiUrl}/teams/` + teamid);
    }

    deleteDriver(driverid: number){
      return this.http.delete(`${environment.apiUrl}/drivers/` + driverid);
    }

    getDrivers(){
      return this.http.get(`${environment.apiUrl}/drivers/`);
    }

    createDriver(driver: Driver){
      return this.http.post(`${environment.apiUrl}/drivers/`, driver);
    }

    getDriver(id: number){
      return this.http.get(`${environment.apiUrl}/drivers/` + id);
    }

    editDriver(id: number, driver: Driver){
      return this.http.patch(`${environment.apiUrl}/drivers/` + id, driver);
    }

    searchDrivers(query: string) {
      const params = new HttpParams().set("query", query);
      return this.http.get(`${environment.apiUrl}/drivers/find`, {params: params});
    }
  }