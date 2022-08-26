import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamAddSingleComponent } from './project-team-add-single.component';

describe('ProjectTeamAddSingleComponent', () => {
  let component: ProjectTeamAddSingleComponent;
  let fixture: ComponentFixture<ProjectTeamAddSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTeamAddSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTeamAddSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
