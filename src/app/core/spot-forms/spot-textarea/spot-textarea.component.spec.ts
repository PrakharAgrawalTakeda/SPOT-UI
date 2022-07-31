import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotTextareaComponent } from './spot-textarea.component';

describe('SpotTextareaComponent', () => {
  let component: SpotTextareaComponent;
  let fixture: ComponentFixture<SpotTextareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotTextareaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
