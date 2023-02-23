import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutOutcomesSingleEditComponent } from './close-out-outcomes-single-edit.component';

describe('CloseOutOutcomesSingleEditComponent', () => {
  let component: CloseOutOutcomesSingleEditComponent;
  let fixture: ComponentFixture<CloseOutOutcomesSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutOutcomesSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutOutcomesSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
