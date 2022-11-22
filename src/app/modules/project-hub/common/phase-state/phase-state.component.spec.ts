import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhaseStateComponent } from './phase-state.component';

describe('PhaseStateComponent', () => {
  let component: PhaseStateComponent;
  let fixture: ComponentFixture<PhaseStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhaseStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhaseStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
