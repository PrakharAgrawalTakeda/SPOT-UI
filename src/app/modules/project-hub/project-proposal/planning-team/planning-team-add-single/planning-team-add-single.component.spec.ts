import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTeamAddSingleComponent } from './planning-team-add-single.component';

describe('PlanningTeamAddSingleComponent', () => {
  let component: PlanningTeamAddSingleComponent;
  let fixture: ComponentFixture<PlanningTeamAddSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTeamAddSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningTeamAddSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
