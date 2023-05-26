import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BudgetGeneralEditComponent } from './budget-general-edit.component';

describe('BudgetGeneralEditComponent', () => {
  let component: BudgetGeneralEditComponent;
  let fixture: ComponentFixture<BudgetGeneralEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BudgetGeneralEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BudgetGeneralEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
