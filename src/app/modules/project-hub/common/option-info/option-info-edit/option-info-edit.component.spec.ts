import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInfoEditComponent } from './option-info-edit.component';

describe('OptionInfoEditComponent', () => {
  let component: OptionInfoEditComponent;
  let fixture: ComponentFixture<OptionInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OptionInfoEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
