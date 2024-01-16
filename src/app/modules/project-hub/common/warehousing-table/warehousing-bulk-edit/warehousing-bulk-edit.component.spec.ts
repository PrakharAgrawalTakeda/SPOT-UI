import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousingBulkEditComponent } from './warehousing-bulk-edit.component';

describe('WarehousingBulkEditComponent', () => {
  let component: WarehousingBulkEditComponent;
  let fixture: ComponentFixture<WarehousingBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousingBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousingBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
