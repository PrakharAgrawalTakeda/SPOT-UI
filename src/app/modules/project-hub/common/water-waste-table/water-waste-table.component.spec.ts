import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterWasteTableComponent } from './water-waste-table.component';

describe('WaterWasteTableComponent', () => {
  let component: WaterWasteTableComponent;
  let fixture: ComponentFixture<WaterWasteTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterWasteTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterWasteTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
