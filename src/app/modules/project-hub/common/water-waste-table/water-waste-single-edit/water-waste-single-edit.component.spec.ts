import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterWasteSingleEditComponent } from './water-waste-single-edit.component';

describe('WaterWasteSingleEditComponent', () => {
  let component: WaterWasteSingleEditComponent;
  let fixture: ComponentFixture<WaterWasteSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterWasteSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterWasteSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
