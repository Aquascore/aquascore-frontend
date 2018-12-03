import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRacingTeamsComponent } from './edit-racing-teams.component';

describe('EditRacingTeamsComponent', () => {
  let component: EditRacingTeamsComponent;
  let fixture: ComponentFixture<EditRacingTeamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditRacingTeamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRacingTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
