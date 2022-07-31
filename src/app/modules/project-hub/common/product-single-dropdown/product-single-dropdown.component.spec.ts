import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductSingleDropdownComponent } from './product-single-dropdown.component';

describe('ProductSingleDropdownComponent', () => {
  let component: ProductSingleDropdownComponent;
  let fixture: ComponentFixture<ProductSingleDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductSingleDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductSingleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
