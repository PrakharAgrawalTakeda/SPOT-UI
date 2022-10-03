import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QualityRefBulkEditComponent } from './quality-ref-bulk-edit.component';

describe('QualityRefBulkEditComponent', () => {
  let component: QualityRefBulkEditComponent;
  let fixture: ComponentFixture<QualityRefBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QualityRefBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QualityRefBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
