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
    private router: Router) { }

    ngOnInit(){
      
    }
}