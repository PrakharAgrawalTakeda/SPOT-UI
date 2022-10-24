import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNeedComponent } from './ask-need.component';

describe('AskNeedComponent', () => {
  let component: AskNeedComponent;
  let fixture: ComponentFixture<AskNeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNeedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
