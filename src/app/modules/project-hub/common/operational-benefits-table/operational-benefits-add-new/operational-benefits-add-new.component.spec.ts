import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalBenefitsAddNewComponent } from './operational-benefits-add-new.component';

describe('OperationalBenefitsAddNewComponent', () => {
  let component: OperationalBenefitsAddNewComponent;
  let fixture: ComponentFixture<OperationalBenefitsAddNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalBenefitsAddNewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperationalBenefitsAddNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
