import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetFxrateComponent } from './budget-fxrate.component';

describe('BudgetFxrateComponent', () => {
  let component: BudgetFxrateComponent;
  let fixture: ComponentFixture<BudgetFxrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetFxrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetFxrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
