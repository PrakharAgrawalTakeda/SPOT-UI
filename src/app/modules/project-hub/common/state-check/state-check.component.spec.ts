import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateCheckComponent } from './state-check.component';

describe('StateCheckComponent', () => {
  let component: StateCheckComponent;
  let fixture: ComponentFixture<StateCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateCheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StateCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
