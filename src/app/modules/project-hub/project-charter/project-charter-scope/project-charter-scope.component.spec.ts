import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterScopeComponent } from './project-charter-scope.component';

describe('ProjectCharterScopeComponent', () => {
  let component: ProjectCharterScopeComponent;
  let fixture: ComponentFixture<ProjectCharterScopeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterScopeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterScopeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
