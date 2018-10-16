import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class Formula1NewsService {
  RSS_FEED_URL = 'http://feeds.bbci.co.uk/sport/formula1/rss.xml';

  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(this.RSS_FEED_URL);
  }
}
