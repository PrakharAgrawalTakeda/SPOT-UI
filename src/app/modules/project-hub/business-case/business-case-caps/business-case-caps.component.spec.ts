import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseCapsComponent } from './business-case-caps.component';

describe('BusinessCaseCapsComponent', () => {
  let component: BusinessCaseCapsComponent;
  let fixture: ComponentFixture<BusinessCaseCapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseCapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseCapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
