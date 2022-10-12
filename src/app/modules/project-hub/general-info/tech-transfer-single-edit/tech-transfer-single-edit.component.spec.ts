import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechTransferSingleEditComponent } from './tech-transfer-single-edit.component';

describe('TechTransferSingleEditComponent', () => {
  let component: TechTransferSingleEditComponent;
  let fixture: ComponentFixture<TechTransferSingleEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechTransferSingleEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechTransferSingleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
