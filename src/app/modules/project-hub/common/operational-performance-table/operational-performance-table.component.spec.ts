import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPerformanceTableComponent } from './operational-performance-table.component';

describe('OperationalPerformanceTableComponent', () => {
  let component: OperationalPerformanceTableComponent;
  let fixture: ComponentFixture<OperationalPerformanceTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalPerformanceTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalPerformanceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
