import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMetricsComponent } from './new-metrics.component';

describe('NewMetricsComponent', () => {
  let component: NewMetricsComponent;
  let fixture: ComponentFixture<NewMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
