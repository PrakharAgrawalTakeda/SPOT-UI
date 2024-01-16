import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskIssuesLinkComponent } from './risk-issues-link.component';

describe('RiskIssuesLinkComponent', () => {
  let component: RiskIssuesLinkComponent;
  let fixture: ComponentFixture<RiskIssuesLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiskIssuesLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RiskIssuesLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
