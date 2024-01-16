import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleBulkEditComponent } from './schedule-bulk-edit.component';

describe('ScheduleBulkEditComponent', () => {
  let component: ScheduleBulkEditComponent;
  let fixture: ComponentFixture<ScheduleBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
