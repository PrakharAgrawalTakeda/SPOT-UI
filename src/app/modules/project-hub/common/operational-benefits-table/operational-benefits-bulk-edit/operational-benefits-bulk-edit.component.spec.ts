import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalBenefitsBulkEditComponent } from './operational-benefits-bulk-edit.component';

describe('OperationalBenefitsBulkEditComponent', () => {
  let component: OperationalBenefitsBulkEditComponent;
  let fixture: ComponentFixture<OperationalBenefitsBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalBenefitsBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalBenefitsBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
