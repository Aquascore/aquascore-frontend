import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Location {
  country: string;
}

export interface Circuit {
  circuitName: string;
  Location: Location;
}

export interface Driver {
  code: string;
  givenName: string;
  familyName: string;
}

export interface Constructor {
  name: string;
}

export interface Time {
  time: string;
}

export interface Result {
  position: string;
  points: string;
  Driver: Driver;
  constructor: Constructor;
  time: Time;
  laps: string;
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  Results : Result[];
}

export interface RaceTable {
  Races: Race[];
}

export interface MRData {
  RaceTable: RaceTable;
}

export interface RaceAPIResponse {
  MRData: MRData;
}

@Injectable({
  providedIn: 'root'
})
export class RaceResultService {

  API_URL = 'http://ergast.com/api/f1';
  

  constructor(private http: HttpClient) { }

  getResults() {
    return this.http.get<RaceAPIResponse>(`${this.API_URL}/current/results.json`);
  }
}
