import { Component, OnInit } from '@angular/core';
import { PoolsService, Pool } from '../pools.service';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {
  userPools: Pool[];
  displayedColumns: string[] = ['position', 'name'];

  constructor(private poolsService: PoolsService) { }

  ngOnInit() {
    this.userPools = this.poolsService.getUserPools();
  }
}
