import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LessonLearnedTableComponent } from './lesson-learned-table.component';

describe('LessonLearnedTableComponent', () => {
  let component: LessonLearnedTableComponent;
  let fixture: ComponentFixture<LessonLearnedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LessonLearnedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LessonLearnedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
