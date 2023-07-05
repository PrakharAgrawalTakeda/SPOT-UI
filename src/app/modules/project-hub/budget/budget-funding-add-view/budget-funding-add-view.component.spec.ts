import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFundingAddViewComponent } from './budget-funding-add-view.component';

describe('BudgetFundingAddViewComponent', () => {
  let component: BudgetFundingAddViewComponent;
  let fixture: ComponentFixture<BudgetFundingAddViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFundingAddViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFundingAddViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
