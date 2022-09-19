import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBenefitsComponent } from './project-benefits.component';

describe('ProjectBenefitsComponent', () => {
  let component: ProjectBenefitsComponent;
  let fixture: ComponentFixture<ProjectBenefitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectBenefitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBenefitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
