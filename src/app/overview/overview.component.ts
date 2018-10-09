import { Component, OnInit } from '@angular/core';
import { RaceScheduleService, RaceAPIResponse } from '../race-schedule.service';

export interface NewsItem {
  title: string;
  link: string;
  date: Date;
}

export interface Race {
  raceName: string;
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

  constructor(private rsService: RaceScheduleService) { }

  ngOnInit() {
    this.showRaceSchedule();
  }

  showRaceSchedule() {
    this.rsService.getSchedule()
      .subscribe((data: RaceAPIResponse) => {
        const futureRaces = data.MRData.RaceTable.Races
          .filter(race => {
            return new Date(race.date) >= new Date();
          })
          .slice(0, 5);

        for (let race of futureRaces) {
          this.races.push({
            raceName: race.raceName,
            date: new Date(race.date),
            time: race.time.substring(0, 5)
          });
        }
      });
  }
}
