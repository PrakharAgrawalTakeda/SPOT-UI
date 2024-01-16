import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataQualityPageComponent } from './data-quality-page.component';

describe('DataQualityPageComponent', () => {
  let component: DataQualityPageComponent;
  let fixture: ComponentFixture<DataQualityPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataQualityPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataQualityPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
