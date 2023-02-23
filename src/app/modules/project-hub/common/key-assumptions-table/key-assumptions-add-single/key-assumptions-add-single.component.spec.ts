import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAssumptionsAddSingleComponent } from './key-assumptions-add-single.component';

describe('KeyAssumptionsAddSingleComponent', () => {
  let component: KeyAssumptionsAddSingleComponent;
  let fixture: ComponentFixture<KeyAssumptionsAddSingleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAssumptionsAddSingleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyAssumptionsAddSingleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
