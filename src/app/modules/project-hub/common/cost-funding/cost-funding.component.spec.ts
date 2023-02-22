import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostFundingComponent } from './cost-funding.component';

describe('CostFundingComponent', () => {
  let component: CostFundingComponent;
  let fixture: ComponentFixture<CostFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CostFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
