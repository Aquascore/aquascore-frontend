import { Component, OnInit } from '@angular/core';
import { BetsService } from '../bets.service';
import { PoolsService, Pool } from '../pools.service';
import {FormControl, Validators, NgForm} from '@angular/forms';

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

  drivers: Driver[] = [
    {first_name: 'Lewis', last_name: 'Hamilton'},
    {first_name: 'Valteri', last_name: 'Bottas'},
    {first_name: 'Daniel', last_name: 'Ricciardo'},
    {first_name: 'Max', last_name: 'Verstappen'},
  ];

  driverControl = new FormControl('', [Validators.required]);
  poolControl = new FormControl('', [Validators.required]);
  userPools: Pool[] = [
  ];

  selectedPool: Boolean;

  constructor(private betsService: BetsService, private poolsService: PoolsService) { }

  ngOnInit() {
    this.showBets();
    this.receivePools();
  }

  showBets() {
    this.betsService.getBets()
      .subscribe((data: any) => {
        this.Bets = data;
      });
  }

  receivePools() {
    this.poolsService.getUserPools()
      .subscribe((pools: Pool[]) => {
        this.userPools = pools;
      });
  }

}
