import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalBenefitsTableComponent } from './operational-benefits-table.component';

describe('OperationalBenefitsTableComponent', () => {
  let component: OperationalBenefitsTableComponent;
  let fixture: ComponentFixture<OperationalBenefitsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalBenefitsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalBenefitsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
