import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPreferenceComponent } from './my-preference.component';

describe('MyPreferenceComponent', () => {
  let component: MyPreferenceComponent;
  let fixture: ComponentFixture<MyPreferenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPreferenceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPreferenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
