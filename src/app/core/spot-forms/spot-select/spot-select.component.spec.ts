import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotSelectComponent } from './spot-select.component';

describe('SpotSelectComponent', () => {
  let component: SpotSelectComponent;
  let fixture: ComponentFixture<SpotSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
