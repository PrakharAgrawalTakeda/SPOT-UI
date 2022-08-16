import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleViewBulkEditComponent } from './schedule-view-bulk-edit.component';

describe('ScheduleViewEditComponent', () => {
  let component: ScheduleViewBulkEditComponent;
  let fixture: ComponentFixture<ScheduleViewBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScheduleViewBulkEditComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleViewBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
