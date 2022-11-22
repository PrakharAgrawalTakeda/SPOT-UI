import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleSingleEditComponent } from './schedule-single-edit.component';

describe('ScheduleSingleEditComponent', () => {
  let component: ScheduleSingleEditComponent;
  let fixture: ComponentFixture<ScheduleSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
