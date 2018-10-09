import { Component, OnInit } from '@angular/core';
import { RaceScheduleService, RaceAPIResponse } from '../race-schedule.service';

export interface NewsItem {
  title: string;
  link: string;
  date: Date;
}

export interface Race {
  name: string;
  date: Date;
  time: string;
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

  races: Race[] = [];
  displayedColumns: string[] = ['name', 'date', 'time'];

  constructor(private rsService: RaceScheduleService) { }

  ngOnInit() {
    this.showRaceSchedule();
  }

  showRaceSchedule() {
    this.rsService.getSchedule()
      .subscribe((data: RaceAPIResponse) => {
        for (let race of data.MRData.RaceTable.Races) {
          console.log(race);
          this.races.push({
            name: race.raceName,
            date: new Date(race.date),
            time: race.time
          });
        }
      });
  }
}
