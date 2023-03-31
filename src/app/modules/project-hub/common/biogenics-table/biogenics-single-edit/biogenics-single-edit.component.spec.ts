import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiogenicsSingleEditComponent } from './biogenics-single-edit.component';

describe('BiogenicsSingleEditComponent', () => {
  let component: BiogenicsSingleEditComponent;
  let fixture: ComponentFixture<BiogenicsSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiogenicsSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiogenicsSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
