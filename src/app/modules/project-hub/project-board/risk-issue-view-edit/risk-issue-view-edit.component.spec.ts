import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNeedViewEditComponent } from './risk-issue-view-edit.component';

describe('AskNeedViewEditComponent', () => {
  let component: AskNeedViewEditComponent;
  let fixture: ComponentFixture<AskNeedViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNeedViewEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNeedViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
