import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterCostFundingComponent } from './project-charter-cost-funding.component';

describe('ProjectCharterCostFundingComponent', () => {
  let component: ProjectCharterCostFundingComponent;
  let fixture: ComponentFixture<ProjectCharterCostFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterCostFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterCostFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
