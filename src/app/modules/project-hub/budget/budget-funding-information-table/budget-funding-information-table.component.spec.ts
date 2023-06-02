import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFundingInformationTableComponent } from './budget-funding-information-table.component';

describe('BudgetFundingInformationTableComponent', () => {
  let component: BudgetFundingInformationTableComponent;
  let fixture: ComponentFixture<BudgetFundingInformationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFundingInformationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFundingInformationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
