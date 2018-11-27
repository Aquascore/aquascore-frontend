import { Component, OnInit } from '@angular/core';
import { RacingTeamsService, Team, Driver } from '../racing-teams.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-racingTeams',
  templateUrl: './racing-teams.component.html',
  styleUrls: ['./racing-teams.component.css']
})
export class RacingTeamsComponent implements OnInit {
  racingTeams: Team[];
  displayedColumns: string[] = ['name', 'salary', 'buttons'];

  constructor(
    private racingTeamsService: RacingTeamsService, 
    private router: Router,
    public dialog: MatDialog) { }

  fetchData() {
    this.racingTeamsService.getRacingTeams()
      .subscribe((teams: Team[]) => {
        this.racingTeams = teams;
      });
  }

  ngOnInit() {
    this.fetchData();
  }

  confirmDeleteRacingTeam(team: Team) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600',
      data: {
        confirmMessage: `Are you sure you want to delete the racing-team ${team.name}?`
      }
    });

    dialogRef.afterClosed().subscribe(deleteTeam => {
      if(deleteTeam) {
        this.racingTeamsService.deleteRacingTeam(team.id)
        .subscribe(_ => {
          this.fetchData();
        });
      }
    });
  }

  confirmDeleteDriver(driver: Driver) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '600',
      data: {
        confirmMessage: `Are you sure you want to delete the driver ${driver.firstname} ${driver.lastname}?`
      }
    });

    dialogRef.afterClosed().subscribe(deleteDriver => {
      if(deleteDriver) {
        this.racingTeamsService.deleteDriver(driver.id)
        .subscribe(_ => {
          this.fetchData();
        });
      }
    });
  }
}