import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterCapsComponent } from './project-charter-caps.component';

describe('ProjectCharterCapsComponent', () => {
  let component: ProjectCharterCapsComponent;
  let fixture: ComponentFixture<ProjectCharterCapsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterCapsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterCapsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
