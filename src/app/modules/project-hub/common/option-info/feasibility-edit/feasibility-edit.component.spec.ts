import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeasibilityEditComponent } from './feasibility-edit.component';

describe('FeasibilityEditComponent', () => {
  let component: FeasibilityEditComponent;
  let fixture: ComponentFixture<FeasibilityEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeasibilityEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeasibilityEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
