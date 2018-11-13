import { Component, OnInit } from '@angular/core';
import { RacingTeamsService, Team } from '../racing-teams.service';

@Component({
  selector: 'app-racingTeams',
  templateUrl: './racing-teams.component.html',
  styleUrls: ['./racing-teams.component.css']
})
export class RacingTeamsComponent implements OnInit {
  racingTeams: Team[];
  displayedColumns: string[] = ['name', 'salary', 'buttons'];

  constructor(private racingTeamsService: RacingTeamsService) { }

  ngOnInit() {
    this.racingTeamsService.getRacingTeams()
      .subscribe((teams: Team[]) => {
        this.racingTeams = teams;
      });
  }

  deleteRacingTeam(teamid: number){
    this.racingTeamsService.deleteRacingTeam(teamid)
    .subscribe();
  }
}