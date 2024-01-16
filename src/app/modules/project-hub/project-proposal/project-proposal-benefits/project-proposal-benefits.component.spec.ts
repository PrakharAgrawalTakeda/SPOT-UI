import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectProposalBenefitsComponent } from './project-proposal-benefits.component';

describe('ProjectProposalBenefitsComponent', () => {
  let component: ProjectProposalBenefitsComponent;
  let fixture: ComponentFixture<ProjectProposalBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectProposalBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectProposalBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
