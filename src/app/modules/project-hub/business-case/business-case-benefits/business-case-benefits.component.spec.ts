import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseBenefitsComponent } from './business-case-benefits.component';

describe('BusinessCaseBenefitsComponent', () => {
  let component: BusinessCaseBenefitsComponent;
  let fixture: ComponentFixture<BusinessCaseBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
