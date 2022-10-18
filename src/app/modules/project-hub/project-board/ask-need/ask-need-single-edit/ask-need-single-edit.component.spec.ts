import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNeedSingleEditComponent } from './ask-need-single-edit.component';

describe('AskNeedSingleEditComponent', () => {
  let component: AskNeedSingleEditComponent;
  let fixture: ComponentFixture<AskNeedSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNeedSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNeedSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
