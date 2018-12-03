import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RacingTeamsService, Team } from '../racing-teams.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-edit-racing-teams',
  templateUrl: './edit-racing-teams.component.html',
  styleUrls: ['./edit-racing-teams.component.css']
})
export class EditRacingTeamsComponent implements OnInit {

  racingTeamForm = new FormGroup({
    name: new FormControl(''),
    teamcol: new FormControl('')
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private racingTeamService: RacingTeamsService,
    private toastr: ToastrService) { }

  teamId: number;

  ngOnInit() {
    this.teamId = Number(this.route.snapshot.paramMap.get("id"));
    this.racingTeamService.getRacingTeam(this.teamId)
      .subscribe((team: Team) => {
        this.racingTeamForm.controls.name.setValue(team.name);
        this.racingTeamForm.controls.teamcol.setValue(team.teamcol);
      });
  }

  editTeam() {
    this.racingTeamService.editRacingTeam(this.teamId, this.racingTeamForm.value)
      .subscribe(_ => {
        this.toastr.success(`Succesfully saved changes to 
      ${this.racingTeamForm.controls.name.value}`, '', {
            timeOut: 3000
          });
      }, error => {
        console.log(error);
      });
  }
}
