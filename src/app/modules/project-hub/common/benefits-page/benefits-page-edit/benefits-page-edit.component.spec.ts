import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitsPageEditComponent } from './benefits-page-edit.component';

describe('BenefitsPageEditComponent', () => {
  let component: BenefitsPageEditComponent;
  let fixture: ComponentFixture<BenefitsPageEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitsPageEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BenefitsPageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
