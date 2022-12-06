import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIssueTableComponent } from './risk-issue-table.component';

describe('RiskIssueTableComponent', () => {
  let component: RiskIssueTableComponent;
  let fixture: ComponentFixture<RiskIssueTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskIssueTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskIssueTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
