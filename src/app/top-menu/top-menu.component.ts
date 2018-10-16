import { Component, OnInit } from '@angular/core';
import { PoolsService, Pool } from '../pools.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {
  userPools: Pool[];

  constructor(private poolsService: PoolsService) { }

  ngOnInit() {
    this.userPools = this.poolsService.getUserPools();
  }
}
