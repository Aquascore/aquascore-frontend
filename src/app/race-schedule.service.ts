import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RaceScheduleService {
  API_URL = 'http://ergast.com/api/f1';

  constructor(private http: HttpClient) { }

  getSchedule() {
    return this.http.get(`${this.API_URL}/current.json`);
  }
}
