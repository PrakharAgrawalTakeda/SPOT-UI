import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingBulkEditComponent } from './shipping-bulk-edit.component';

describe('ShippingBulkEditComponent', () => {
  let component: ShippingBulkEditComponent;
  let fixture: ComponentFixture<ShippingBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
