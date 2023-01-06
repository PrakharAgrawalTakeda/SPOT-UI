import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTeamComponent } from './planning-team.component';

describe('PlanningTeamComponent', () => {
  let component: PlanningTeamComponent;
  let fixture: ComponentFixture<PlanningTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
