import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarbonSingleEditComponent } from './carbon-single-edit.component';

describe('CarbonSingleEditComponent', () => {
  let component: CarbonSingleEditComponent;
  let fixture: ComponentFixture<CarbonSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarbonSingleEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarbonSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
