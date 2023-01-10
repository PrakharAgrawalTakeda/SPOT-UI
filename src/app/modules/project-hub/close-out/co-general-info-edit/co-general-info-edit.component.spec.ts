import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoGeneralInfoEditComponent } from './co-general-info-edit.component';

describe('CoGeneralInfoEditComponent', () => {
  let component: CoGeneralInfoEditComponent;
  let fixture: ComponentFixture<CoGeneralInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoGeneralInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoGeneralInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
