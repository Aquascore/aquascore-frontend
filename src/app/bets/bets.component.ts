import { Component, OnInit } from '@angular/core';
import { BetsService } from '../bets.service';
import { PoolsService, Pool } from '../pools.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export interface BetItem {
  id: number;
  title: string;
  points: number;
}

export interface Bet {
  betId: number;
  userId: number;
  bet: String;
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

  userPools: Pool[] = [
  ];

  bet: Bet;

  betForm = new FormGroup({
    poolName: new FormControl(''),
  })

  constructor(
     private betsService: BetsService,
     private poolsService: PoolsService, 
     private toastr: ToastrService,
     private router: Router) { }

  ngOnInit() {
    this.showBets();
    this.receivePools();
  }

  showBets() {
    this.betsService.getBets()
      .subscribe((data: any) => {
        this.Bets = data;
        for (let Data of data) {
          this.betForm.addControl(Data.id, new FormControl(''));
        }
      });
  }

  receivePools() {
    this.poolsService.getUserPools()
      .subscribe((pools: Pool[]) => {
        this.userPools = pools;
      });
  }

  addBet() {
    this.betsService.createBet(this.bet)
      .subscribe(_ => {
        this.toastr.success(`Succesfully saved changes to 
        ${this.betForm.controls.firstname.value}
        ${this.betForm.controls.lastname.value}`, '', {
            timeOut: 3000
          });
        this.router.navigate(['/bets']);
      }, error => {
        console.log(error);
      });
  }

}
