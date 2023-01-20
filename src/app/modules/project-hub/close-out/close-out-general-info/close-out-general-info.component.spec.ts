import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutGeneralInfoComponent } from './close-out-general-info.component';

describe('CloseOutGeneralInfoComponent', () => {
  let component: CloseOutGeneralInfoComponent;
  let fixture: ComponentFixture<CloseOutGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
