import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectDashboardPerformanceComponent } from './project-dashboard-performance.component';

describe('ProjectDashboardPerformanceComponent', () => {
  let component: ProjectDashboardPerformanceComponent;
  let fixture: ComponentFixture<ProjectDashboardPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectDashboardPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectDashboardPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
