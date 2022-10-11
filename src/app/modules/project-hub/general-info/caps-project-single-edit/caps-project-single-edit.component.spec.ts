import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsProjectSingleEditComponent } from './caps-project-single-edit.component';

describe('CapsProjectSingleEditComponent', () => {
  let component: CapsProjectSingleEditComponent;
  let fixture: ComponentFixture<CapsProjectSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsProjectSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CapsProjectSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
