import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditResourceHeirarchyComponent } from './edit-resource-heirarchy.component';

describe('EditResourceHeirarchyComponent', () => {
  let component: EditResourceHeirarchyComponent;
  let fixture: ComponentFixture<EditResourceHeirarchyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditResourceHeirarchyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditResourceHeirarchyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
