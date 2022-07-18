import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutComponent } from './close-out.component';

describe('CloseOutComponent', () => {
  let component: CloseOutComponent;
  let fixture: ComponentFixture<CloseOutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
