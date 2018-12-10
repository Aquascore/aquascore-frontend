import { TestBed } from '@angular/core/testing';

import { PoolTeamService } from './pool-team.service';

describe('RacingTeamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PoolTeamService = TestBed.get(PoolTeamService);
    expect(service).toBeTruthy();
  });
});