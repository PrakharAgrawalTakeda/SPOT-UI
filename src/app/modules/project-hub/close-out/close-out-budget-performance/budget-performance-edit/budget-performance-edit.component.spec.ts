import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetPerformanceEditComponent } from './budget-performance-edit.component';

describe('BudgetPerformanceEditComponent', () => {
  let component: BudgetPerformanceEditComponent;
  let fixture: ComponentFixture<BudgetPerformanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetPerformanceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetPerformanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
