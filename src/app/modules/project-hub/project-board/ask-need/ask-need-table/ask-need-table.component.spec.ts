import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNeedTableComponent } from './ask-need-table.component';

describe('AskNeedTableComponent', () => {
  let component: AskNeedTableComponent;
  let fixture: ComponentFixture<AskNeedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNeedTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNeedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
