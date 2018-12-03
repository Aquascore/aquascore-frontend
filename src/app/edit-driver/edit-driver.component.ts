import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RacingTeamsService, Driver, Team } from '../racing-teams.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-edit-driver',
  templateUrl: './edit-driver.component.html',
  styleUrls: ['./edit-driver.component.css']
})
export class EditDriverComponent implements OnInit {

  driverForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    salary: new FormControl(''),
    teamid: new FormControl('')
  })

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private racingTeamService: RacingTeamsService,
    private toastr: ToastrService) { }

  driverId: number;
  teams: Team[] = [];

  ngOnInit() {
    this.driverId = Number(this.route.snapshot.paramMap.get("id"));
    this.racingTeamService.getDriver(this.driverId)
      .subscribe((driver: Driver) => {
        this.driverForm.controls.firstname.setValue(driver.firstname);
        this.driverForm.controls.lastname.setValue(driver.lastname);
        this.driverForm.controls.salary.setValue(driver.salary);
        this.driverForm.controls.teamid.setValue(driver.teamid);
      });

    this.racingTeamService.getRacingTeams()
      .subscribe((data: Team[]) => this.teams = data);
  }

  editDriver() {
    this.racingTeamService.editDriver(this.driverId, this.driverForm.value)
      .subscribe(_ => {
        this.toastr.success(`Succesfully saved changes to 
        ${this.driverForm.controls.firstname.value}
        ${this.driverForm.controls.lastname.value}`, '', {
            timeOut: 3000
          });
        this.router.navigate(['/racing-teams']);
      }, error => {
        console.log(error);
      });
  }
}
