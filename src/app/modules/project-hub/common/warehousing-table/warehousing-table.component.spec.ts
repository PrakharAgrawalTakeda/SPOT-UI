import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousingTableComponent } from './warehousing-table.component';

describe('WarehousingTableComponent', () => {
  let component: WarehousingTableComponent;
  let fixture: ComponentFixture<WarehousingTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousingTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousingTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
