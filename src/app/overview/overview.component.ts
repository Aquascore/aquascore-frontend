import { Component, OnInit } from '@angular/core';
import { RaceScheduleService, RaceAPIResponse } from '../race-schedule.service';
import { Formula1NewsService } from '../formula1-news.service';
import {lookup} from 'country-data';

export interface NewsItem {
  title: string;
  link: string;
  date: Date;
}

export interface Race {
  raceName: string;
  country: string;
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

  constructor(private rsService: RaceScheduleService, private newsService: Formula1NewsService) { }

  ngOnInit() {
    this.showNews();
    this.showRaceSchedule();
  }

  showNews() {
    this.newsService.getNews()
      .subscribe(data => {
        console.log(data);
      });
  }

  countryToCountryCode(country : string) {
    if (country === "USA") {
      return "us";
    }
    if (country === "UAE") {
      return "ae";
    }
    return lookup.countries({name: country})[0].alpha2.toLowerCase();
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
          var country = this.countryToCountryCode(race.Circuit.Location.country);
          this.races.push({
            raceName: race.raceName,
            country: country,
            date: new Date(race.date),
            time: race.time.substring(0, 5)
          });
        }
      });
  }
}
