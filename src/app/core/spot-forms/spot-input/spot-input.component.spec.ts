import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotInputComponent } from './spot-input.component';

describe('SpotInputComponent', () => {
  let component: SpotInputComponent;
  let fixture: ComponentFixture<SpotInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
