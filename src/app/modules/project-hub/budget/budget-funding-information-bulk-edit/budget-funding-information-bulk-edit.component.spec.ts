import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFundingInformationBulkEditComponent } from './budget-funding-information-bulk-edit.component';

describe('BudgetFundingInformationBulkEditComponent', () => {
  let component: BudgetFundingInformationBulkEditComponent;
  let fixture: ComponentFixture<BudgetFundingInformationBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFundingInformationBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFundingInformationBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
