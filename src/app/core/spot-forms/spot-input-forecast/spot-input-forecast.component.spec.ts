import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotInputForecastComponent } from './spot-input-forecast.component';

describe('SpotInputForecastComponent', () => {
  let component: SpotInputForecastComponent;
  let fixture: ComponentFixture<SpotInputForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotInputForecastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotInputForecastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
