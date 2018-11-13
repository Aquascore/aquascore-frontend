import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, User } from '../user.service';
import { MatChipInputEvent } from '@angular/material';
import { ViewChild, ElementRef } from '@angular/core';
import { Pool, PoolsService } from '../pools.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.css']
})
export class CreatePoolComponent implements OnInit {
  currentUser: User;
  searchResults: User[] = [];
  searchQuery: string = '';
  members: User[] = [];

  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private userService: UserService,
    private poolsService: PoolsService,
    private flashService: FlashMessagesService) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe((data: User) => this.currentUser = data);
  }

  createPool(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const pool: Pool = {} as Pool;
    pool.name = form.value.name;
    pool.users = this.members;

    console.log(pool);

    this.poolsService.createPool(pool)
      .subscribe(
        _ => {
          this.flashService.show('yep', { cssClass: 'alert-success' });
          this.router.navigateByUrl('/pools');
        },
        error => {
          console.log(error);
        }
      );
  }

  addMember(user: User, event: MatChipInputEvent) {
    if (!this.members.find(member => member.id === user.id)) {
      this.members.push(user);
    }

    this.memberInput.nativeElement.value = '';
    this.searchResults = [];
  }

  removeMember(user: User) {
    this.members = this.members.filter(member => member.id !== user.id);
  }

  searchUsers() {
    if (this.searchQuery.length < 2) {
      return;
    }

    this.userService.search(this.searchQuery)
      .subscribe(
        (res: User[]) => {
          // Don't show current user in search results
          res = res.filter(user => user.id !== this.currentUser.id);
          this.searchResults = res;
        },
        error => {
          console.log(error.message);
        }
      );
  }
}
