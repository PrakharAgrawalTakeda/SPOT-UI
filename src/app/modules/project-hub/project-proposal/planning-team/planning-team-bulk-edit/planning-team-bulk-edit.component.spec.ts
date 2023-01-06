import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanningTeamBulkEditComponent } from './planning-team-bulk-edit.component';

describe('PlanningTeamBulkEditComponent', () => {
  let component: PlanningTeamBulkEditComponent;
  let fixture: ComponentFixture<PlanningTeamBulkEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanningTeamBulkEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanningTeamBulkEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
