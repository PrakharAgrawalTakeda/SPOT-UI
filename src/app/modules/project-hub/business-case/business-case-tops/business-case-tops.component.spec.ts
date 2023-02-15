import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseTopsComponent } from './business-case-tops.component';

describe('BusinessCaseTopsComponent', () => {
  let component: BusinessCaseTopsComponent;
  let fixture: ComponentFixture<BusinessCaseTopsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseTopsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseTopsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
