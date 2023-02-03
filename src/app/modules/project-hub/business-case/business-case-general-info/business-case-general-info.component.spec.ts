import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseGeneralInfoComponent } from './business-case-general-info.component';

describe('BusinessCaseGeneralInfoComponent', () => {
  let component: BusinessCaseGeneralInfoComponent;
  let fixture: ComponentFixture<BusinessCaseGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
