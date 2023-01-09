import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterRiskIssuesComponent } from './project-charter-risk-issues.component';

describe('ProjectCharterRiskIssuesComponent', () => {
  let component: ProjectCharterRiskIssuesComponent;
  let fixture: ComponentFixture<ProjectCharterRiskIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterRiskIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterRiskIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
