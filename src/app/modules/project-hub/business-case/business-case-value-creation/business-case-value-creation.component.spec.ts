import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseValueCreationComponent } from './business-case-value-creation.component';

describe('BusinessCaseValueCreationComponent', () => {
  let component: BusinessCaseValueCreationComponent;
  let fixture: ComponentFixture<BusinessCaseValueCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseValueCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusinessCaseValueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
