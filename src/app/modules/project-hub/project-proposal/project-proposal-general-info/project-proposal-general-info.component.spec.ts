import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalGeneralInfoComponent } from './project-proposal-general-info.component';

describe('ProjectProposalGeneralInfoComponent', () => {
  let component: ProjectProposalGeneralInfoComponent;
  let fixture: ComponentFixture<ProjectProposalGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProposalGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
