import { Component, OnInit } from '@angular/core';
import { BetsService, Bet } from '../bets.service';
import { UserService, User } from '../user.service';
import { PoolsService, Pool } from '../pools.service';
import { RacingTeamsService } from '../racing-teams.service';
import { RaceScheduleService, DatabaseRace } from '../race-schedule.service';
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

  drivers: Driver[] = [];
  upcomingRaces: DatabaseRace[] = [];
  userPools: Pool[] = [];

  bet: Bet;

  betForm = new FormGroup({
    poolName: new FormControl(''),
  })

  constructor(
    private betsService: BetsService,
    private racingTeamsService: RacingTeamsService,
    private raceScheduleService: RaceScheduleService,
    private poolsService: PoolsService,
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.showBets();
    this.receiveData();
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

  receiveData() {
    this.poolsService.getUserPools()
      .subscribe((pools: Pool[]) => {
        this.userPools = pools;
      });
    this.racingTeamsService.getDrivers()
      .subscribe((data: Driver[]) => {
        this.drivers = data;
      });
    this.raceScheduleService.getRaces()
    .subscribe((data: DatabaseRace[]) => {
      this.upcomingRaces = data;
    });
  }

  addBet(form) {
    const bet: Bet[] = [];
    var i;
    var formLength = (Object.keys(this.betForm.controls).length);
    for (i = 1; i < formLength; i++) {
      this.betsService.createBet(form.get('' + i).value, this.currentUser, this.Bets[i], this.upcomingRaces[0])
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
