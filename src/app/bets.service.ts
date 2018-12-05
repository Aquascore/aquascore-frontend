import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

export interface Bet {
  betId: number;
  userId: number;
  bet: String;
}

@Injectable({
  providedIn: 'root'
})
export class BetsService {
  constructor(private http: HttpClient) { }

  getBets() {
    return this.http.get(`${environment.apiUrl}/bets/`);
  }

  // TODO: Make sure the bet is being given through
  createBet(betId, bet){
    return this.http.post(`${environment.apiUrl}/bets/`, bet, betId);
  }
}
