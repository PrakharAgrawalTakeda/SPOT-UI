import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallStatusEditComponent } from './overall-status-edit.component';

describe('OverallStatusEditComponent', () => {
  let component: OverallStatusEditComponent;
  let fixture: ComponentFixture<OverallStatusEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallStatusEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallStatusEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
