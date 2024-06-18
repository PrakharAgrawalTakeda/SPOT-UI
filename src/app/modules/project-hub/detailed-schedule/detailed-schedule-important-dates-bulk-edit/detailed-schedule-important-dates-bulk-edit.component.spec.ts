import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedScheduleImportantDatesBulkEditComponent } from './detailed-schedule-important-dates-bulk-edit.component';

describe('DetailedScheduleImportantDatesBulkEditComponent', () => {
  let component: DetailedScheduleImportantDatesBulkEditComponent;
  let fixture: ComponentFixture<DetailedScheduleImportantDatesBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedScheduleImportantDatesBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedScheduleImportantDatesBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
