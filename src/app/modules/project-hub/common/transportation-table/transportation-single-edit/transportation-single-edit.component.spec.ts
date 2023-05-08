import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportationSingleEditComponent } from './transportation-single-edit.component';

describe('TransportationSingleEditComponent', () => {
  let component: TransportationSingleEditComponent;
  let fixture: ComponentFixture<TransportationSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportationSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransportationSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
