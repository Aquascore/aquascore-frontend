import { TestBed } from '@angular/core/testing';

import { Formula1NewsService } from './formula1-news.service';

describe('Formula1NewsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Formula1NewsService = TestBed.get(Formula1NewsService);
    expect(service).toBeTruthy();
  });
});
