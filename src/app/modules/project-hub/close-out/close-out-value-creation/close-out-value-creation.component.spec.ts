import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseOutValueCreationComponent } from './close-out-value-creation.component';

describe('CloseOutValueCreationComponent', () => {
  let component: CloseOutValueCreationComponent;
  let fixture: ComponentFixture<CloseOutValueCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CloseOutValueCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseOutValueCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
