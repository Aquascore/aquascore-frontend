import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRacingTeamComponent } from './create-racing-teams.component';

describe("CreateRacingTeamComponent", () => {
  let component: CreateRacingTeamComponent;
  let fixture: ComponentFixture<CreateRacingTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateRacingTeamComponent ]
    })
    .compileComponents();
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRacingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});