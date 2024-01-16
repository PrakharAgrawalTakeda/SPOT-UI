import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationTableComponent } from './transportation-table.component';

describe('TransportationTableComponent', () => {
  let component: TransportationTableComponent;
  let fixture: ComponentFixture<TransportationTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
