import { TestBed } from '@angular/core/testing';

import { RaceScheduleService } from './race-schedule.service';

describe('RaceScheduleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RaceScheduleService = TestBed.get(RaceScheduleService);
    expect(service).toBeTruthy();
  });
});
