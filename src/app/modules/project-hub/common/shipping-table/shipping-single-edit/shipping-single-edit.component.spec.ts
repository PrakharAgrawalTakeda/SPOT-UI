import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingSingleEditComponent } from './shipping-single-edit.component';

describe('ShippingSingleEditComponent', () => {
  let component: ShippingSingleEditComponent;
  let fixture: ComponentFixture<ShippingSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShippingSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
