import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneSetViewEditComponent } from './milestone-set-view-edit.component';

describe('MilestoneSetViewEditComponent', () => {
  let component: MilestoneSetViewEditComponent;
  let fixture: ComponentFixture<MilestoneSetViewEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneSetViewEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneSetViewEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
