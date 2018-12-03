import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RacingTeamsService, Team, Driver } from '../racing-teams.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-driver',
  templateUrl: './create-driver.component.html',
  styleUrls: ['./create-driver.component.css']
})
export class CreateDriverComponent implements OnInit {

  teams: Team[] = [];
  
  constructor(
    private router: Router,
    private racingTeamService: RacingTeamsService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.racingTeamService.getRacingTeams()
    .subscribe((data: Team[]) => this.teams = data);
  }

  createDriver(form: NgForm) {
    if(!form.valid) return;

    const driver: Driver = {} as Driver;
    driver.firstname = form.value.firstname;
    driver.lastname = form.value.lastname;
    driver.salary = form.value.salary;
    driver.teamid = form.value.teamid;

    console.log(driver);

    this.racingTeamService.createDriver(driver)
    .subscribe(
      _ => {
        this.toastr.success(`Driver ${driver.firstname} ${driver.lastname} succesfully created!`, '', {
          timeOut: 3000
        });
        this.router.navigateByUrl('/racing-teams');
      },
      error => {
        console.log(error);
      }
    );
  }
}
