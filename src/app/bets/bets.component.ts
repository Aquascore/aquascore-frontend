import { Component, OnInit } from '@angular/core';
import { BetsService } from '../bets.service';
import {FormControl, Validators} from '@angular/forms';

export interface BetItem {
  id: number;
  title: string;
  points: number;
}

export interface Driver {
  first_name: string;
  last_name: string;
}

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.css']
})
export class BetsComponent implements OnInit {

  Bets: BetItem[] = [];

  driverControl = new FormControl('', [Validators.required]);
  drivers: Driver[] = [
    {first_name: 'Lewis', last_name: 'Hamilton'},
    {first_name: 'Valteri', last_name: 'Bottas'},
    {first_name: 'Daniel', last_name: 'Ricciardo'},
    {first_name: 'Max', last_name: 'Verstappen'},
  ];

  constructor(private betsService: BetsService) { }

  ngOnInit() {
    this.showBets();
  }

  showBets() {
    this.betsService.getBets()
      .subscribe((data: any) => {
        this.Bets = data;
      });
  }

}
