import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchedulesTableComponent } from './schedule-table.component';

describe('ScheduleTableComponent', () => {
  let component: SchedulesTableComponent;
  let fixture: ComponentFixture<SchedulesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [SchedulesTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
