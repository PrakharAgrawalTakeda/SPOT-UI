import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseOptionInfoComponent } from './business-case-option-info.component';

describe('BusinessCaseOptionInfoComponent', () => {
  let component: BusinessCaseOptionInfoComponent;
  let fixture: ComponentFixture<BusinessCaseOptionInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseOptionInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseOptionInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
