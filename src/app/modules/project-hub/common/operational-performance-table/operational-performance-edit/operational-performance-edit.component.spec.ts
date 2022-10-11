import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalPerformanceEditComponent } from './operational-performance-edit.component';

describe('OperationalPerformanceEditComponent', () => {
  let component: OperationalPerformanceEditComponent;
  let fixture: ComponentFixture<OperationalPerformanceEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperationalPerformanceEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OperationalPerformanceEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
