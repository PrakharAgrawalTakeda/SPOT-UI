import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterMilestonesComponent } from './project-charter-milestones.component';

describe('ProjectCharterMilestonesComponent', () => {
  let component: ProjectCharterMilestonesComponent;
  let fixture: ComponentFixture<ProjectCharterMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterMilestonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
