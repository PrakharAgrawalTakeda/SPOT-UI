import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseRiskIssuesComponent } from './business-case-risk-issues.component';

describe('BusinessCaseRiskIssuesComponent', () => {
  let component: BusinessCaseRiskIssuesComponent;
  let fixture: ComponentFixture<BusinessCaseRiskIssuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseRiskIssuesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseRiskIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
