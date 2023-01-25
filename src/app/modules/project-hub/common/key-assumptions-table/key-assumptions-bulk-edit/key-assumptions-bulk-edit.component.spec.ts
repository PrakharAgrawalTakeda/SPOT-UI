import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAssumptionsBulkEditComponent } from './key-assumptions-bulk-edit.component';

describe('KeyAssumptionsBulkEditComponent', () => {
  let component: KeyAssumptionsBulkEditComponent;
  let fixture: ComponentFixture<KeyAssumptionsBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAssumptionsBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyAssumptionsBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
