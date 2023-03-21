import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAttributeSingleEditComponent } from './local-attribute-single-edit.component';

describe('LocalAttributeSingleEditComponent', () => {
  let component: LocalAttributeSingleEditComponent;
  let fixture: ComponentFixture<LocalAttributeSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAttributeSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LocalAttributeSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
