import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectSingleDropdownComponent } from './project-single-dropdown.component';

describe('ProjectSingleDropdownComponent', () => {
  let component: ProjectSingleDropdownComponent;
  let fixture: ComponentFixture<ProjectSingleDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectSingleDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectSingleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
