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

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  newsItems: NewsItem[] = [
    {
      title: "Hallo",
      link: "http://nu.nl",
      description: "xd",
      pubDate: "5/08/18",
      guid: "",
      "media:thumbnail": "http://c.files.bbci.co.uk/BFC1/production/_104298094_gettyimages-1060245106.jpg"
    },
    {
      title: "Hallo",
      link: "http://nu.nl",
      description: "xd",
      pubDate: "5/08/18",
      guid: "",
      "media:thumbnail": "http://c.files.bbci.co.uk/BFC1/production/_104298094_gettyimages-1060245106.jpg"
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
}
