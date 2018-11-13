import { TestBed } from '@angular/core/testing';

import { RacingTeamsService } from './racing-teams.service';

describe('RacingTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RacingTeamsService = TestBed.get(RacingTeamsService);
    expect(service).toBeTruthy();
  });
});