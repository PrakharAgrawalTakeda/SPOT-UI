import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutLessonsLearnedComponent } from './close-out-lessons-learned.component';

describe('CloseOutLessonsLearnedComponent', () => {
  let component: CloseOutLessonsLearnedComponent;
  let fixture: ComponentFixture<CloseOutLessonsLearnedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutLessonsLearnedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutLessonsLearnedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
