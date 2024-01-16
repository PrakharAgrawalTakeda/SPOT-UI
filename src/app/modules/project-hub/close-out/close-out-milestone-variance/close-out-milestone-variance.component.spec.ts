import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutMilestoneVarianceComponent } from './close-out-milestone-variance.component';

describe('CloseOutMilestoneVarianceComponent', () => {
  let component: CloseOutMilestoneVarianceComponent;
  let fixture: ComponentFixture<CloseOutMilestoneVarianceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutMilestoneVarianceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CloseOutMilestoneVarianceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
