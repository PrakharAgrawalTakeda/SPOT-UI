import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StandardMilestoneSetsComponent } from './standard-milestone-sets.component';

describe('StandardMilestoneSetsComponent', () => {
  let component: StandardMilestoneSetsComponent;
  let fixture: ComponentFixture<StandardMilestoneSetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StandardMilestoneSetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardMilestoneSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
