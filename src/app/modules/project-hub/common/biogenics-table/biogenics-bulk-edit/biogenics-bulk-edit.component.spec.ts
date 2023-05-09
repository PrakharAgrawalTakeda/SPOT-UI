import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiogenicsBulkEditComponent } from './biogenics-bulk-edit.component';

describe('BiogenicsBulkEditComponent', () => {
  let component: BiogenicsBulkEditComponent;
  let fixture: ComponentFixture<BiogenicsBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiogenicsBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiogenicsBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
