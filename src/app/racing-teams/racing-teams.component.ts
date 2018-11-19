import { Component, OnInit } from '@angular/core';
import { RacingTeamsService, Team } from '../racing-teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-racingTeams',
  templateUrl: './racing-teams.component.html',
  styleUrls: ['./racing-teams.component.css']
})
export class RacingTeamsComponent implements OnInit {
  racingTeams: Team[];
  displayedColumns: string[] = ['name', 'salary', 'buttons'];

  constructor(private racingTeamsService: RacingTeamsService, private router: Router) { }

  fetchData() {
    this.racingTeamsService.getRacingTeams()
      .subscribe((teams: Team[]) => {
        this.racingTeams = teams;
      });
  }

  ngOnInit() {
    this.fetchData();
  }

  deleteRacingTeam(teamid: number) {
    this.racingTeamsService.deleteRacingTeam(teamid)
      .subscribe(
        () => {
          this.fetchData();
        }, error => {
          console.log(error.message);
        }
      );
  }

  deleteDriver(driverid: number) {
    this.racingTeamsService.deleteDriver(driverid)
      .subscribe(
        () => {
          this.fetchData();
        }, error => {
          console.log(error.message);
        }
      );
  }
}