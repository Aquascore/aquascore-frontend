import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { User } from './user.service';
import { DatabaseRace } from './race-schedule.service';

export interface CurrentBet {
  id: number;
  user: User;
  bet: Bet;
  race: DatabaseRace;
  prediction: String;
}

export interface Bet {
  id: number;
  title: string;
  points: number;
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
  createBet(betString, user: User, bet: Bet, race: DatabaseRace){
    const betObj: CurrentBet = {} as CurrentBet;

    betObj.prediction = JSON.stringify(betString);
    betObj.user = user
    betObj.bet = bet
    betObj.race = race;
    return this.http.post(`${environment.apiUrl}/bets/`, betObj);
  }
}
