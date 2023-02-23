import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FundingEditComponent } from './funding-edit.component';

describe('FundingEditComponent', () => {
  let component: FundingEditComponent;
  let fixture: ComponentFixture<FundingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FundingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FundingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
