import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationBulkEditComponent } from './transportation-bulk-edit.component';

describe('TransportationBulkEditComponent', () => {
  let component: TransportationBulkEditComponent;
  let fixture: ComponentFixture<TransportationBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
