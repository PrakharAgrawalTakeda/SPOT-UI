import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategicDriversComponent } from './strategic-drivers.component';

describe('StrategicDriversComponent', () => {
  let component: StrategicDriversComponent;
  let fixture: ComponentFixture<StrategicDriversComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StrategicDriversComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategicDriversComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
