import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutLessonLearnedSingleEditComponent } from './close-out-lesson-learned-single-edit.component';

describe('CloseOutLessonLearnedSingleEditComponent', () => {
  let component: CloseOutLessonLearnedSingleEditComponent;
  let fixture: ComponentFixture<CloseOutLessonLearnedSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutLessonLearnedSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutLessonLearnedSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
