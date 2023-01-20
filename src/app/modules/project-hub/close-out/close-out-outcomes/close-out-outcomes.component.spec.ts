import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutOutcomesComponent } from './close-out-outcomes.component';

describe('CloseOutOutcomesComponent', () => {
  let component: CloseOutOutcomesComponent;
  let fixture: ComponentFixture<CloseOutOutcomesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutOutcomesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutOutcomesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
