import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricRepositoryComponent } from './metric-repository.component';

describe('MetricRepositoryComponent', () => {
  let component: MetricRepositoryComponent;
  let fixture: ComponentFixture<MetricRepositoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricRepositoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricRepositoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
