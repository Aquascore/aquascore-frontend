import { Component, OnInit } from '@angular/core';
import { PoolsService, Pool } from '../pools.service';
import { UserService, User } from '../user.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pools',
  templateUrl: './pools.component.html',
  styleUrls: ['./pools.component.css']
})
export class PoolsComponent implements OnInit {
  currentUser: User;
  userPools: Pool[];
  displayedColumns: string[] = ['position', 'name'];

  constructor(
    private router: Router,
    private poolsService: PoolsService,
    private userService: UserService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getCurrentUser()
      .subscribe((data: User) => {
        this.currentUser = data;

        this.loadPools();
      });
  }

  loadPools() {
    this.poolsService.getUserPools()
      .subscribe((pools: Pool[]) => {
        this.userPools = pools;
      });
  }

  confirmDeletePool(pool: Pool) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600',
      data: {
        confirmMessage: `Are you sure you want to delete the pool ${pool.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(deletePool => {
      if (deletePool) {
        this.poolsService.removePool(pool)
          .subscribe(_ => {
            this.loadPools();
          });
      }
    });
  }

  isOwner(pool: Pool) {
    return pool.owner.id === this.currentUser.id;
  }
}
