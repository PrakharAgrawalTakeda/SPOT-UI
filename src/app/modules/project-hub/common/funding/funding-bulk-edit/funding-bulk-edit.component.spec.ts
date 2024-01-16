import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingBulkEditComponent } from './funding-bulk-edit.component';

describe('FundingBulkEditComponent', () => {
  let component: FundingBulkEditComponent;
  let fixture: ComponentFixture<FundingBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FundingBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
