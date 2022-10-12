import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPerformanceBulkEditComponent } from './operational-performance-bulk-edit.component';

describe('OperationalPerformanceBulkEditComponent', () => {
  let component: OperationalPerformanceBulkEditComponent;
  let fixture: ComponentFixture<OperationalPerformanceBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalPerformanceBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalPerformanceBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
