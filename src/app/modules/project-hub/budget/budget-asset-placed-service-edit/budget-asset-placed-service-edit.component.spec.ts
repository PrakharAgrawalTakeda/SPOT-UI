import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetAssetPlacedServiceEditComponent } from './budget-asset-placed-service-edit.component';

describe('BudgetAssetPlacedServiceEditComponent', () => {
  let component: BudgetAssetPlacedServiceEditComponent;
  let fixture: ComponentFixture<BudgetAssetPlacedServiceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetAssetPlacedServiceEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetAssetPlacedServiceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
