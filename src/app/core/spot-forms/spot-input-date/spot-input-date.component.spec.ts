import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotInputDateComponent } from './spot-input-date.component';

describe('SpotInputDateComponent', () => {
  let component: SpotInputDateComponent;
  let fixture: ComponentFixture<SpotInputDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotInputDateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotInputDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
