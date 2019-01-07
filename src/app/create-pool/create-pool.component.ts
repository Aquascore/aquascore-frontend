import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService, User } from '../user.service';
import { MatChipInputEvent } from '@angular/material';
import { ViewChild, ElementRef } from '@angular/core';
import { Pool, PoolsService } from '../pools.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-pool',
  templateUrl: './create-pool.component.html',
  styleUrls: ['./create-pool.component.css']
})
export class CreatePoolComponent implements OnInit {
  currentUser: User;
  searchResult: User;
  searchQuery: string = '';
  members: User[] = [];

  @ViewChild('memberInput') memberInput: ElementRef<HTMLInputElement>;

  constructor(
    private router: Router,
    private userService: UserService,
    private poolsService: PoolsService,
    private toastr: ToastrService) { }

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
          this.toastr.success(`Pool ${pool.name} succesfully created!`, '', {
            timeOut: 3000
          });
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
    this.searchResult = null;
  }

  removeMember(user: User) {
    this.members = this.members.filter(member => member.id !== user.id);
  }

  searchUsers() {
    if (this.searchQuery.length < 3) {
      return;
    }

    this.userService.search(this.searchQuery)
      .subscribe(
        (res: User) => {
          this.searchResult = res;
        },
        error => {
          console.log(error.message);
        }
      );
  }
}
