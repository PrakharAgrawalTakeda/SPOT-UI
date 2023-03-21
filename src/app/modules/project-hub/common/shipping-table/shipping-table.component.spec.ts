import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingTableComponent } from './shipping-table.component';

describe('ShippingTableComponent', () => {
  let component: ShippingTableComponent;
  let fixture: ComponentFixture<ShippingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
