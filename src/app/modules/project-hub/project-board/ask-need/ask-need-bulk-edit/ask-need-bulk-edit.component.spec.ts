import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNeedBulkEditComponent } from './ask-need-bulk-edit.component';

describe('AskNeedBulkEditComponent', () => {
  let component: AskNeedBulkEditComponent;
  let fixture: ComponentFixture<AskNeedBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNeedBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNeedBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
