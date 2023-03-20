import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectRequirementsEditComponent } from './project-requirements-edit.component';

describe('ProjectRequirementsEditComponent', () => {
  let component: ProjectRequirementsEditComponent;
  let fixture: ComponentFixture<ProjectRequirementsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectRequirementsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectRequirementsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
