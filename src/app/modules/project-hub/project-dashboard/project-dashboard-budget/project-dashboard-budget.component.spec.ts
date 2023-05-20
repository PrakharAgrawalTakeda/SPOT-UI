import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardBudgetComponent } from './project-dashboard-budget.component';

describe('ProjectDashboardBudgetComponent', () => {
  let component: ProjectDashboardBudgetComponent;
  let fixture: ComponentFixture<ProjectDashboardBudgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDashboardBudgetComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardBudgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
