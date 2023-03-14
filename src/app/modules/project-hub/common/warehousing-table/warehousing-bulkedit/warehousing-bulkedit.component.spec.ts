import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehousingBulkeditComponent } from './warehousing-bulkedit.component';

describe('WarehousingBulkeditComponent', () => {
  let component: WarehousingBulkeditComponent;
  let fixture: ComponentFixture<WarehousingBulkeditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehousingBulkeditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehousingBulkeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
