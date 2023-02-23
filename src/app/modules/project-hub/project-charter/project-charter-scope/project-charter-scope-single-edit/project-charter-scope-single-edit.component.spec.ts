import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterScopeSingleEditComponent } from './project-charter-scope-single-edit.component';

describe('ProjectCharterScopeSingleEditComponent', () => {
  let component: ProjectCharterScopeSingleEditComponent;
  let fixture: ComponentFixture<ProjectCharterScopeSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterScopeSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterScopeSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
