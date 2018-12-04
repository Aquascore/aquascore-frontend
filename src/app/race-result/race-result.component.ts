import { Component, OnInit } from '@angular/core';
import { RaceResultService, RaceAPIResponse } from '../race-result.service';
import { MatTableDataSource } from '@angular/material';


export interface Result {

}

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {

  year: Number = 2018;
  round: string = "last";


  race_results: Result[] = [];
  race_drivers: Result[] = [];

  displayedColumns: string[] = ['position', 'code', 'driver', 'constructor', 'laps', 'time'];
  columnsToDisplay: string[] = this.displayedColumns.slice();
  dataSource = new MatTableDataSource(this.race_results);

  constructor(private resultService: RaceResultService) { }

  ngOnInit() {
    this.showRaceResults();
  }

  showRaceResults() {
    this.resultService.getResults(this.year, this.round)
      .subscribe((data: RaceAPIResponse) => {
        const results = data.MRData.RaceTable.Races
        var i = 0
        for (let result of results) {
          for (let i = 0; i < result.Results.length; i++) {
            this.race_results.push({
              code: result.Results[i].Driver.code,
              givenName: result.Results[i].Driver.givenName,
              familyName: result.Results[i].Driver.familyName,
              position: result.Results[i].position,
              raceName: result.raceName,
              constructor: result.Results[i].Constructor.name,
              laps: result.Results[i].laps,
              time: (result.Results[i].Time != null ? result.Results[i].Time.time : "Unknown"),
              date: result.date
            });
          }
          this.dataSource = new MatTableDataSource(this.race_results)
          console.log(this.race_results)
        }
      });
  }

}
