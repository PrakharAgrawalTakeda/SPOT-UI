import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyAssumptionsTableComponent } from './key-assumptions-table.component';

describe('KeyAssumptionsTableComponent', () => {
  let component: KeyAssumptionsTableComponent;
  let fixture: ComponentFixture<KeyAssumptionsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyAssumptionsTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyAssumptionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
