import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIssuesTableComponent } from './risk-issues-table.component';

describe('RiskIssuesTableComponent', () => {
  let component: RiskIssuesTableComponent;
  let fixture: ComponentFixture<RiskIssuesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskIssuesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskIssuesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
