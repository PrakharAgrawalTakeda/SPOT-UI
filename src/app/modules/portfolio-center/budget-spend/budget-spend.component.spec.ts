import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetSpendComponent } from './budget-spend.component';

describe('BudgetSpendComponent', () => {
  let component: BudgetSpendComponent;
  let fixture: ComponentFixture<BudgetSpendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetSpendComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetSpendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
