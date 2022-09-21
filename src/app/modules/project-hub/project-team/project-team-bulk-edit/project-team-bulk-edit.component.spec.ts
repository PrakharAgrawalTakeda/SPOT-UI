import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTeamBulkEditComponent } from './project-team-bulk-edit.component';

describe('ProjectTeamBulkEditComponent', () => {
  let component: ProjectTeamBulkEditComponent;
  let fixture: ComponentFixture<ProjectTeamBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectTeamBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTeamBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
