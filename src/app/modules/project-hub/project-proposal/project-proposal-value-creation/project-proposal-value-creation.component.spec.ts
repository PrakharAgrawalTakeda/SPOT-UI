import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalValueCreationComponent } from './project-proposal-value-creation.component';

describe('ProjectProposalValueCreationComponent', () => {
  let component: ProjectProposalValueCreationComponent;
  let fixture: ComponentFixture<ProjectProposalValueCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalValueCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectProposalValueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
