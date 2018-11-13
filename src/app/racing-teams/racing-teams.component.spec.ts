import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacingTeamsComponent } from './racing-teams.component';

describe('RacingTeamsComponent', () => {
  let component: RacingTeamsComponent;
  let fixture: ComponentFixture<RacingTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RacingTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacingTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
