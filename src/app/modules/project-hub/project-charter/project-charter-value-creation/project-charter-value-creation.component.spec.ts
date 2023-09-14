import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterValueCreationComponent } from './project-charter-value-creation.component';

describe('ProjectCharterValueCreationComponent', () => {
  let component: ProjectCharterValueCreationComponent;
  let fixture: ComponentFixture<ProjectCharterValueCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterValueCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectCharterValueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
