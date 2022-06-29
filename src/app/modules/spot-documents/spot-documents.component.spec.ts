import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotDocumentsComponent } from './spot-documents.component';

describe('SpotDocumentsComponent', () => {
  let component: SpotDocumentsComponent;
  let fixture: ComponentFixture<SpotDocumentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotDocumentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
