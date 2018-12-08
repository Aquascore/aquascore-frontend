import { Component, OnInit } from '@angular/core';
import {SelectionModel} from '@angular/cdk/collections';

import {MatTableDataSource} from '@angular/material';

export interface PeriodicElement {
  name: string;
  position: number;
  team: string;
  salary: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Racer 1', team: "Mercedes", salary: "€2.000.000,-"},
  {position: 2, name: 'Racer 2', team: "Red Bull", salary: "€8.000.000,-"},
  {position: 3, name: 'Racer 3', team: "Ferrari", salary: "€11.000.000,-"},
  {position: 4, name: 'Racer 4', team: "Renault", salary: "€5.000.000,-"},
  {position: 5, name: 'Racer 5', team: "McLaren", salary: "€7.000.000,-"},

];

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.css']
})
export class CreateTeamComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['select', 'position', 'name', 'team', 'salary'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  selection = new SelectionModel<PeriodicElement>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
}
