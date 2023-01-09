import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterProjectTeamComponent } from './project-charter-project-team.component';

describe('ProjectCharterProjectTeamComponent', () => {
  let component: ProjectCharterProjectTeamComponent;
  let fixture: ComponentFixture<ProjectCharterProjectTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterProjectTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterProjectTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
