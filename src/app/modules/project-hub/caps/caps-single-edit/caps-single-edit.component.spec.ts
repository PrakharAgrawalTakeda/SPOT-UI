import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapsSingleEditComponent } from './caps-single-edit.component';

describe('CapsSingleEditComponent', () => {
  let component: CapsSingleEditComponent;
  let fixture: ComponentFixture<CapsSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapsSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapsSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
