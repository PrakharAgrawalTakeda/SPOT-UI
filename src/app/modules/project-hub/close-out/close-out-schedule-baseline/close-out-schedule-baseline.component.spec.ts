import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutScheduleBaselineComponent } from './close-out-schedule-baseline.component';

describe('CloseOutScheduleBaselineComponent', () => {
  let component: CloseOutScheduleBaselineComponent;
  let fixture: ComponentFixture<CloseOutScheduleBaselineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutScheduleBaselineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutScheduleBaselineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
