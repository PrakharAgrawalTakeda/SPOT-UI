import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedScheduleSettingsComponent } from './detailed-schedule-settings.component';

describe('DetailedScheduleSettingsComponent', () => {
  let component: DetailedScheduleSettingsComponent;
  let fixture: ComponentFixture<DetailedScheduleSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedScheduleSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedScheduleSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
