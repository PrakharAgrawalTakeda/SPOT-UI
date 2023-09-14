import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricRepositoryAddEditViewComponent } from './metric-repository-add-edit-view.component';

describe('MetricRepositoryAddEditViewComponent', () => {
  let component: MetricRepositoryAddEditViewComponent;
  let fixture: ComponentFixture<MetricRepositoryAddEditViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MetricRepositoryAddEditViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MetricRepositoryAddEditViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
