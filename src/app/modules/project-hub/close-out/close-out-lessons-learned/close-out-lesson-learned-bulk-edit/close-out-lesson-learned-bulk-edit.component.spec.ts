import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutLessonLearnedBulkEditComponent } from './close-out-lesson-learned-bulk-edit.component';

describe('CloseOutLessonLearnedBulkEditComponent', () => {
  let component: CloseOutLessonLearnedBulkEditComponent;
  let fixture: ComponentFixture<CloseOutLessonLearnedBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutLessonLearnedBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutLessonLearnedBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
