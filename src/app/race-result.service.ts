import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


export interface Location {
  country: string;
}

export interface Circuit {
  circuitName: string;
  Location: Location;
}

export interface DriverResult{
  position : number;
  points : number;
  familyName: string;
  givenName: string;
  code: string;
  time: string;
  laps : number;
}

export interface Result {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
  results : DriverResult[]
}

export interface ResultTable {
  Results: Result[];
}

export interface MRData {
  ResultTable: ResultTable;
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
