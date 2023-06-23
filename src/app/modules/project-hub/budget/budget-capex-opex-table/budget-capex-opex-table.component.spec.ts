import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetCapexOpexTableComponent } from './budget-capex-opex-table.component';

describe('BudgetCapexOpexTableComponent', () => {
  let component: BudgetCapexOpexTableComponent;
  let fixture: ComponentFixture<BudgetCapexOpexTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetCapexOpexTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetCapexOpexTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
