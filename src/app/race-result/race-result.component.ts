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
        const results = data.MRData.ResultTable.Results
          

        // for (let result of results) {
        //   this.results.push({
        //     position : result.results.
        //   });
        // }

        console.log(results);
      });
  }

}
