import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterProjectTeamsComponent } from './project-charter-project-teams.component';

describe('ProjectCharterProjectTeamsComponent', () => {
  let component: ProjectCharterProjectTeamsComponent;
  let fixture: ComponentFixture<ProjectCharterProjectTeamsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterProjectTeamsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterProjectTeamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
