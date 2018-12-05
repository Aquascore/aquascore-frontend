import { Component, OnInit } from '@angular/core';
import { RaceResultService, RaceAPIResponse } from '../race-result.service';
import { MatTableDataSource } from '@angular/material';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';


export interface Result {

}

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {

  // API information
  year: Number = 2018;
  round: string = "last";
  raceTrack: string = "";

  // date picker
  minDate = new Date(1950, 0, 1);
  maxDate = new Date(2020, 0, 1);

  // Array which contains all the results
  race_results: Result[] = [];

  // Table information
  displayedColumns: string[] = ['position', 'code', 'driver', 'constructor', 'laps', 'time'];

  dataSource = new MatTableDataSource(this.race_results);

  constructor(private resultService: RaceResultService) { }

  ngOnInit() {
    this.showRaceResults();
    this.getScreenInformation();
  }

  getScreenInformation() {
    var w = screen.width;
    if (w > 768) {
      this.displayedColumns = ['position', 'code', 'driver', 'constructor', 'laps', 'time'];
    } else {
      this.displayedColumns = ['position', 'code', 'constructor', 'time'];
    }
  }

  getYear(event: MatDatepickerInputEvent<Date>) {
    this.year = event.value.getFullYear();
    this.showRaceResults();
  }

  previousRound() {
    var newRound = (Number(this.round) - 1);

    if (newRound < 1) {
      newRound = 21;
    }
    
    this.round = newRound.toLocaleString();
    this.showRaceResults();
  }

  nextRound() {
    var newRound = (Number(this.round) + 1);

    if (newRound > 21) {
      newRound = 1;
    }

    this.round = newRound.toLocaleString();
    this.showRaceResults();
  }

  currentRace() {
    var date = new Date();
    this.year = date.getFullYear();
    this.round = "last";
    this.showRaceResults();
  }

  showRaceResults() {
    this.race_results.length = 0;
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
          this.raceTrack = result.raceName;
          this.round = result.round;
        }
      });
  }

}
