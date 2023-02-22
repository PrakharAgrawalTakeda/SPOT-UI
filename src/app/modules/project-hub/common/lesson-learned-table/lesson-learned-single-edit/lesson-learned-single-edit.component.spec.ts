import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnedSingleEditComponent } from './lesson-learned-single-edit.component';

describe('LessonLearnedSingleEditComponent', () => {
  let component: LessonLearnedSingleEditComponent;
  let fixture: ComponentFixture<LessonLearnedSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonLearnedSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLearnedSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
