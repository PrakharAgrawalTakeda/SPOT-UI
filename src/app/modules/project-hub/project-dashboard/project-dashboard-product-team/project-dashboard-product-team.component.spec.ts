import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardProductTeamComponent } from './project-dashboard-product-team.component';

describe('ProjectDashboardProductTeamComponent', () => {
  let component: ProjectDashboardProductTeamComponent;
  let fixture: ComponentFixture<ProjectDashboardProductTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDashboardProductTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardProductTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
