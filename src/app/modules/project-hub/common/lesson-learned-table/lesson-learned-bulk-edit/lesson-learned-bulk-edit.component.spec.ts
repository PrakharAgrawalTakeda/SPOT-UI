import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnedBulkEditComponent } from './lesson-learned-bulk-edit.component';

describe('LessonLearnedBulkEditComponent', () => {
  let component: LessonLearnedBulkEditComponent;
  let fixture: ComponentFixture<LessonLearnedBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonLearnedBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLearnedBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
