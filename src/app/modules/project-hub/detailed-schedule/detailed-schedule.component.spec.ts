import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedScheduleComponent } from './detailed-schedule.component';

describe('DetailedScheduleComponent', () => {
  let component: DetailedScheduleComponent;
  let fixture: ComponentFixture<DetailedScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedScheduleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
