import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseCostFundingComponent } from './business-case-cost-funding.component';

describe('BusinessCaseCostFundingComponent', () => {
  let component: BusinessCaseCostFundingComponent;
  let fixture: ComponentFixture<BusinessCaseCostFundingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseCostFundingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseCostFundingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
