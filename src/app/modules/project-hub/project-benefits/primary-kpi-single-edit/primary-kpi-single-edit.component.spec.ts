import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimaryKpiSingleEditComponent } from './primary-kpi-single-edit.component';

describe('PrimaryKpiSingleEditComponent', () => {
  let component: PrimaryKpiSingleEditComponent;
  let fixture: ComponentFixture<PrimaryKpiSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrimaryKpiSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrimaryKpiSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
