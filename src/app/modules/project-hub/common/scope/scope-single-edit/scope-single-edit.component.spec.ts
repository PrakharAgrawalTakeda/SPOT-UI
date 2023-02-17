import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopeSingleEditComponent } from './scope-single-edit.component';

describe('ScopeSingleEditComponent', () => {
  let component: ScopeSingleEditComponent;
  let fixture: ComponentFixture<ScopeSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScopeSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScopeSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
