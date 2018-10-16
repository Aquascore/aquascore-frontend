import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Location {
  country: string;
}

export interface Circuit {
  circuitName: string;
  Location: Location;
}

export interface Race {
  season: string;
  round: string;
  url: string;
  raceName: string;
  Circuit: Circuit;
  date: string;
  time: string;
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
export class RaceScheduleService {
  API_URL = 'http://ergast.com/api/f1';

  constructor(private http: HttpClient) { }

  getSchedule() {
    return this.http.get<RaceAPIResponse>(`${this.API_URL}/current.json`);
  }
}
