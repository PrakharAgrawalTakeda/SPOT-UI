import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewEditComponent } from './schedule-view-edit.component';

describe('ScheduleViewEditComponent', () => {
  let component: ScheduleViewEditComponent;
  let fixture: ComponentFixture<ScheduleViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
