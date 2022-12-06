import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIssueViewEditComponent } from './risk-issue-view-edit.component';

describe('RiskIssueViewEditComponent', () => {
  let component: RiskIssueViewEditComponent;
  let fixture: ComponentFixture<RiskIssueViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskIssueViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskIssueViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
