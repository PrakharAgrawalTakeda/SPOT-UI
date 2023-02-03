import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCaseTimelineComponent } from './business-case-timeline.component';

describe('BusinessCaseTimelineComponent', () => {
  let component: BusinessCaseTimelineComponent;
  let fixture: ComponentFixture<BusinessCaseTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusinessCaseTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCaseTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
