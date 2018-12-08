import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { RacingTeamsService, Driver } from '../racing-teams.service';
import { ToastrService } from 'ngx-toastr';
import { UserService, User } from '../user.service';
import { NgForm } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {
  currentUser: User;
  searchResults: Driver[] = [];
  searchQuery: string = '';
  members: Driver[] = [];

  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;

  constructor(
    private teamsService: RacingTeamsService,
    private userService: UserService,
    private toastr: ToastrService,
  ) { }

  ngOnInit() {
    this.userService.getCurrentUser()
    .subscribe((data: User) => this.currentUser = data);
  }

  createTeam(form: NgForm){
    // Call api with form to create team
  }

  addMember(driver: Driver, event: MatChipInputEvent){
    if(!this.members.find(member => member.id === driver.id)) {
      this.members.push(driver);
    }

    this.memberInput.nativeElement.value = '';
    this.searchResults = [];
  }

  removeMember(driver: Driver){
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
