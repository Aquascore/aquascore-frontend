import { Component, OnInit } from '@angular/core';
import { RaceScheduleService } from '../race-schedule.service';

export interface NewsItem {
  title: string;
  link: string;
  date: Date;
}

export interface Race {
  country: string;
  date: Date;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  newsItems: NewsItem[] = [
    {
      title: "Max eats dirt again",
      link: "http://nu.nl",
      date: new Date('8/08/18')
    },
    {
      title: "Zandvoort new GP track",
      link: "http://nu.nl",
      date: new Date('5/08/18')
    }
  ];

  races: Race[] = [
    {
      country: "Singapore",
      date: new Date('12/08/18 15:00')
    }
  ];
  displayedColumns: string[] = ['country', 'date'];

  constructor(private rsService: RaceScheduleService) { }

  ngOnInit() {
    this.showRaceSchedule();
  }

  showRaceSchedule() {
    this.rsService.getSchedule()
      .subscribe((data) => {
        // for (let race of data.MRData.RaceTable.Races) {
        //   console.log(race);
        // }
      });
  }
}
