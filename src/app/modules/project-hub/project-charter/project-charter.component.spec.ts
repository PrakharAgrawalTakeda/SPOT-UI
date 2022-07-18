import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterComponent } from './project-charter.component';

describe('ProjectCharterComponent', () => {
  let component: ProjectCharterComponent;
  let fixture: ComponentFixture<ProjectCharterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
