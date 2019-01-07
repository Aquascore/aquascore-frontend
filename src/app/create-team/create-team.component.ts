import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RacingTeamsService, Driver } from '../racing-teams.service';
import { PoolTeamService, PoolTeam } from '../pool-team.service';
import { PoolsService, Pool } from '../pools.service';
import { RaceScheduleService, DatabaseRace } from '../race-schedule.service';
import { ToastrService } from 'ngx-toastr';
import { UserService, User } from '../user.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  currentUser: User;
  currentPool: Pool = {} as Pool;
  searchResults: Driver[] = [];
  budget: number = 20000000;
  upcomingRaces: DatabaseRace[] = [];
  searchQuery: string = '';
  members: Driver[] = [];

  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;

  constructor(
    private teamsService: RacingTeamsService,
    private raceSchedule: RaceScheduleService,
    private route: ActivatedRoute,
    private poolService: PoolsService,
    private poolTeamService: PoolTeamService,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe((data: User) => this.currentUser = data);
    this.raceSchedule.getRaces()
      .subscribe((data: DatabaseRace[]) => this.upcomingRaces = data);
    this.poolService.getById(Number(this.route.snapshot.paramMap.get("id")))
      .subscribe((data: Pool) => this.currentPool = data);
  }

  createTeam(form: NgForm) {
    // Call api with form to create team
    if (!form.valid) return;

    const poolTeam: PoolTeam = {} as PoolTeam;
    poolTeam.user = this.currentUser;
    poolTeam.pool = this.currentPool;
    poolTeam.race = this.upcomingRaces[0];
    poolTeam.drivers = this.members;
    
    console.log(poolTeam);

    this.poolTeamService.createPoolTeam(poolTeam)
    .subscribe(
      _ => {
        this.toastr.success(`Team for race ${this.upcomingRaces[0].name} succesfully created!`, '', {
          timeOut: 3000
        });
      },
      error => {
        console.log(error);
      }
    )
  }

  addMember(driver: Driver, event: MatChipInputEvent) {
    if (!this.members.find(member => member.id === driver.id)) {
      this.members.push(driver);
    }

    this.memberInput.nativeElement.value = '';
    this.budget = this.budget - driver.salary;
    this.searchResults = [];
  }

  removeMember(driver: Driver) {
    this.budget += driver.salary;
    this.members = this.members.filter(member => member.id !== driver.id);
  }

  searchDrivers() {
    if (this.searchQuery.length < 2) {
      return;
    }

    this.teamsService.searchDrivers(this.searchQuery)
      .subscribe(
        (res: Driver[]) => {
          // Kijk of hier de drivers die al zijn geselecteerd er uit gefiltered moet en worden
          this.searchResults = res;
        },
        error => {
          console.log(error.message);
        }
      )
  }
}
