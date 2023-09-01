import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetForecastBulkEditComponent } from './budget-forecast-bulk-edit.component';

describe('BudgetForecastBulkEditComponent', () => {
  let component: BudgetForecastBulkEditComponent;
  let fixture: ComponentFixture<BudgetForecastBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetForecastBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetForecastBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
