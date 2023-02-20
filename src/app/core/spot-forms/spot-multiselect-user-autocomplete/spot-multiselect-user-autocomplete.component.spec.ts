import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotMultiselectUserAutocompleteComponent } from './spot-multiselect-user-autocomplete.component';

describe('SpotMultiselectUserAutocompleteComponent', () => {
  let component: SpotMultiselectUserAutocompleteComponent;
  let fixture: ComponentFixture<SpotMultiselectUserAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotMultiselectUserAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotMultiselectUserAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
