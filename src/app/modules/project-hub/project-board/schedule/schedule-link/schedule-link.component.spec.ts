import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleLinkComponent } from './schedule-link.component';

describe('ScheduleLinkComponent', () => {
  let component: ScheduleLinkComponent;
  let fixture: ComponentFixture<ScheduleLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScheduleLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
