import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralInfoSingleEditComponent } from './general-info-single-edit.component';

describe('GeneralInfoSingleEditComponent', () => {
  let component: GeneralInfoSingleEditComponent;
  let fixture: ComponentFixture<GeneralInfoSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeneralInfoSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralInfoSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
