import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousingSingleEditComponent } from './warehousing-single-edit.component';

describe('WarehousingSingleEditComponent', () => {
  let component: WarehousingSingleEditComponent;
  let fixture: ComponentFixture<WarehousingSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousingSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousingSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
