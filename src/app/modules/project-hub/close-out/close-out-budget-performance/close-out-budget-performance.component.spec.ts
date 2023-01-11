import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutBudgetPerformanceComponent } from './close-out-budget-performance.component';

describe('CloseOutBudgetPerformanceComponent', () => {
  let component: CloseOutBudgetPerformanceComponent;
  let fixture: ComponentFixture<CloseOutBudgetPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutBudgetPerformanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutBudgetPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
