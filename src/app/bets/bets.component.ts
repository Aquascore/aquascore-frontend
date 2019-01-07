import { Component, OnInit } from '@angular/core';
import { BetsService, Bet } from '../bets.service';
import { UserService, User } from '../user.service';
import { PoolsService, Pool } from '../pools.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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

  Bets: Bet[] = [];
  currentUser: User;

  drivers: Driver[] = [
    { first_name: 'Lewis', last_name: 'Hamilton' },
    { first_name: 'Valteri', last_name: 'Bottas' },
    { first_name: 'Daniel', last_name: 'Ricciardo' },
    { first_name: 'Max', last_name: 'Verstappen' },
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
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.showBets();
    this.receivePools();
    this.userService.getCurrentUser()
      .subscribe((data: User) => this.currentUser = data);
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

  addBet(form) {
    const bet: Bet[] = [];
    var i;
    var formLength = (Object.keys(this.betForm.controls).length);
    for (i = 1; i < formLength; i++) {
      this.betsService.createBet(form.get('' + i).value, this.currentUser, this.Bets[i])
        .subscribe(
          _ => {
            this.toastr.success(`Bet succesfully created!`, '', {
              timeOut: 3000
            });
            this.router.navigateByUrl('/bets');
          },
          error => {
            console.log(error);
          }
        );
    }
  }

}
