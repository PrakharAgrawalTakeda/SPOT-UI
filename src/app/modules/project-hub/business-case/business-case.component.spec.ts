import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseComponent } from './business-case.component';

describe('BusinessCaseComponent', () => {
  let component: BusinessCaseComponent;
  let fixture: ComponentFixture<BusinessCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
