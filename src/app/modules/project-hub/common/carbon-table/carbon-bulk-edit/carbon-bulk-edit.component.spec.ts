import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonBulkEditComponent } from './carbon-bulk-edit.component';

describe('CarbonBulkEditComponent', () => {
  let component: CarbonBulkEditComponent;
  let fixture: ComponentFixture<CarbonBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonBulkEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
