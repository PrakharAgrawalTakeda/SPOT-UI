import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyTakeawaySingleEditComponent } from './key-takeaway-single-edit.component';

describe('KeyTakeawaySingleEditComponent', () => {
  let component: KeyTakeawaySingleEditComponent;
  let fixture: ComponentFixture<KeyTakeawaySingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyTakeawaySingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyTakeawaySingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
