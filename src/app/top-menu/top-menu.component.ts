import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { PoolsService, Pool } from '../pools.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  userPools: Pool[];

  constructor(private router: Router,
    private poolsService: PoolsService,
    private userService: UserService) { }

  ngOnInit() {
    this.reloadPools();
  }

  reloadPools() {
    this.poolsService.getUserPools()
      .subscribe((pools: Pool[]) => {
        this.userPools = pools;
      });
  }

  logOut() {
    this.userService.logOut();
    this.router.navigateByUrl('/login');
  }
}
