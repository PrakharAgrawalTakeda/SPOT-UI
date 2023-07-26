import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAdditionalEditComponent } from './budget-additional-edit.component';

describe('BudgetAssetPlacedServiceEditComponent', () => {
  let component: BudgetAdditionalEditComponent;
  let fixture: ComponentFixture<BudgetAdditionalEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAdditionalEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAdditionalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
