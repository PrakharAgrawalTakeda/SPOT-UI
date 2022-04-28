import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatedProjectsComponent } from './associated-projects.component';

describe('AssociatedProjectsComponent', () => {
  let component: AssociatedProjectsComponent;
  let fixture: ComponentFixture<AssociatedProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssociatedProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
