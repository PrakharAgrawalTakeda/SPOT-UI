import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParentComponent } from './update-parent.component';

describe('UpdateParentComponent', () => {
  let component: UpdateParentComponent;
  let fixture: ComponentFixture<UpdateParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
