import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioCenterComponent } from './portfolio-center.component';

describe('PortfolioCenterComponent', () => {
  let component: PortfolioCenterComponent;
  let fixture: ComponentFixture<PortfolioCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortfolioCenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
