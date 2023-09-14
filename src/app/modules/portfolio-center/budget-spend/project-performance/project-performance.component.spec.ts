import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPerformanceComponent } from './project-performance.component';

describe('ProjectPerformanceComponent', () => {
  let component: ProjectPerformanceComponent;
  let fixture: ComponentFixture<ProjectPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
