import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Formula1NewsService {
  constructor(private http: HttpClient) { }

  getNews() {
    return this.http.get(`${environment.apiUrl}/news/`);
  }
}
