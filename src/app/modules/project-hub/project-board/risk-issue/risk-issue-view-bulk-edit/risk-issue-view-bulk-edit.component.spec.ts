import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RisIssueViewBulkEditComponent } from './risk-issue-view-bulk-edit.component';

describe('RisIssueViewBulkEditComponent', () => {
  let component: RisIssueViewBulkEditComponent;
  let fixture: ComponentFixture<RisIssueViewBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RisIssueViewBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RisIssueViewBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
