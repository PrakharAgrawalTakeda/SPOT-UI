import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectCharterGeneralInfoComponent } from './project-charter-general-info.component';

describe('ProjectCharterGeneralInfoComponent', () => {
  let component: ProjectCharterGeneralInfoComponent;
  let fixture: ComponentFixture<ProjectCharterGeneralInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectCharterGeneralInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectCharterGeneralInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
