import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilestoneSetsComponent } from './milestone-sets.component';

describe('MilestoneSetsComponent', () => {
  let component: MilestoneSetsComponent;
  let fixture: ComponentFixture<MilestoneSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MilestoneSetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilestoneSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
