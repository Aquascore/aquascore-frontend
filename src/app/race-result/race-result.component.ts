import { Component, OnInit } from '@angular/core';
import { RaceResultService, RaceAPIResponse } from '../race-result.service';


export interface Result {

}

@Component({
  selector: 'app-race-result',
  templateUrl: './race-result.component.html',
  styleUrls: ['./race-result.component.css']
})
export class RaceResultComponent implements OnInit {

  results: Result[] = [];

  constructor(private resultService: RaceResultService) { }

  ngOnInit() {
    this.showRaceResults();
  }

  showRaceResults() {
    this.resultService.getResults()
      .subscribe((data: RaceAPIResponse) => {
        const results = data.MRData.RaceTable.Races
        
        let index = 0;
        for (let result of results) {
          this.results.push({
            code: result.Results[index].Driver.code,
            givenName: result.Results[index].Driver.givenName,
            familyName: result.Results[index].Driver.familyName,
            position: result.Results[index].position,
            raceName: result.raceName,
            constructor: result.Results[index].constructor.name,
            laps: result.Results[index].laps,
            time: result.Results[index].time,
            date: result.date
          });
          index++;
        }
        console.log(this.results)
      });
  }

}
