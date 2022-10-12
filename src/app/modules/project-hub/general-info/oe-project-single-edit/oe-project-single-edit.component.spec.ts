import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeProjectSingleEditComponent } from './oe-project-single-edit.component';

describe('OeProjectSingleEditComponent', () => {
  let component: OeProjectSingleEditComponent;
  let fixture: ComponentFixture<OeProjectSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OeProjectSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OeProjectSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
