import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastExcelUpdateComponent } from './forecast-excel-update.component';

describe('ForecastExcelUpdateComponent', () => {
  let component: ForecastExcelUpdateComponent;
  let fixture: ComponentFixture<ForecastExcelUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastExcelUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastExcelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
