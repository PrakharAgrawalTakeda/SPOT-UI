import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalAttributesComponent } from './local-attributes.component';

describe('LocalAttributesComponent', () => {
  let component: LocalAttributesComponent;
  let fixture: ComponentFixture<LocalAttributesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocalAttributesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
