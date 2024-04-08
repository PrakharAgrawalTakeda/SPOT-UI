import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastBulkEditComponent } from './forecast-bulk-edit.component';

describe('ForecastBulkEditComponent', () => {
  let component: ForecastBulkEditComponent;
  let fixture: ComponentFixture<ForecastBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForecastBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
