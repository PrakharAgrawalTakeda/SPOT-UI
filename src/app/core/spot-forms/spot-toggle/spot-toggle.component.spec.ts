import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotToggleComponent } from './spot-toggle.component';

describe('SpotToggleComponent', () => {
  let component: SpotToggleComponent;
  let fixture: ComponentFixture<SpotToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotToggleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
