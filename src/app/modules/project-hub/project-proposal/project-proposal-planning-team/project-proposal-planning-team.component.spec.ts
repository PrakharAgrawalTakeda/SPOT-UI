import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalPlanningTeamComponent } from './project-proposal-planning-team.component';

describe('ProjectProposalPlanningTeamComponent', () => {
  let component: ProjectProposalPlanningTeamComponent;
  let fixture: ComponentFixture<ProjectProposalPlanningTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalPlanningTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProposalPlanningTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
