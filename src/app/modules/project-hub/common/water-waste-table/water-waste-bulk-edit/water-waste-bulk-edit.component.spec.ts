import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterWasteBulkEditComponent } from './water-waste-bulk-edit.component';

describe('WaterWasteBulkEditComponent', () => {
  let component: WaterWasteBulkEditComponent;
  let fixture: ComponentFixture<WaterWasteBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterWasteBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterWasteBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
