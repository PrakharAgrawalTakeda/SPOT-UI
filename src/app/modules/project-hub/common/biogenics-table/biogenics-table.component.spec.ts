import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiogenicsTableComponent } from './biogenics-table.component';

describe('BiogenicsTableComponent', () => {
  let component: BiogenicsTableComponent;
  let fixture: ComponentFixture<BiogenicsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiogenicsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BiogenicsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
