import { Component, OnInit } from '@angular/core';
import { RaceScheduleService, RaceAPIResponse } from '../race-schedule.service';
import { Formula1NewsService } from '../formula1-news.service';
import {lookup} from 'country-data';
import { race } from 'q';

export interface NewsItem {
  title: string;
  description: string;
  link: string;
  pubDate: string;
  guid: Object;
  "media:thumbnail": Object;
}

export interface Race {
  raceName: string;
  country: string;
  date: Date;
  time: string;
}

export interface DatabaseRace {
  name: string;
  date: Date;
}

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  newsItems: NewsItem[] = [];

  races: Race[] = [];

  allRaces: DatabaseRace[] = [];

  constructor(private rsService: RaceScheduleService, private newsService: Formula1NewsService) { }

  ngOnInit() {
    this.showNews();
    this.showRaceSchedule();
    this.setScheduleToDatabase();
  }

  showNews() {
    this.newsService.getNews()
      .subscribe((data: any) => {
        this.newsItems = data.rss.channel.item;
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

  setScheduleToDatabase() {
    this.rsService.getSchedule()
    .subscribe((data: RaceAPIResponse) => {
      const allAPIRaces = data.MRData.RaceTable.Races

      for (let race of allAPIRaces) {
        this.allRaces.push({
          name: race.raceName,
          date: new Date(race.date),
        });
      }

      this.rsService.addScheduleToDatabase(this.allRaces).subscribe();
    });
  }
}
