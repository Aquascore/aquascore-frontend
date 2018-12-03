import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RacingTeamsService, Team } from '../racing-teams.service';
import { MatChipInputEvent } from '@angular/material';
import { ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-racingTeams',
  templateUrl: './create-racing-teams.component.html',
  styleUrls: ['./create-racing-teams.component.css']
})
export class CreateRacingTeamComponent implements OnInit {

  constructor(
    private racingTeamsService: RacingTeamsService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {

  }

  createRacingTeam(form: NgForm) {
    if (!form.valid) return;

    const team: Team = {} as Team;
    team.name = form.value.name;
    team.teamcol = form.value.teamcol;

    console.log(team);

    this.racingTeamsService.createRacingTeam(team)
      .subscribe(
        _ => {
          this.toastr.success(`RacingTeam ${team.name} succesfully created!`, '', {
            timeOut: 3000
          });
          this.router.navigateByUrl('/racing-teams')
        },
        error => {
          console.log(error);
        }
      );
  }
}