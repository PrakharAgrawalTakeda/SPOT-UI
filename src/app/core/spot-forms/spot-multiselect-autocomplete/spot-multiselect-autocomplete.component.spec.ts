import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotMultiselectAutocompleteComponent } from './spot-multiselect-autocomplete.component';

describe('SpotMultiselectAutocompleteComponent', () => {
  let component: SpotMultiselectAutocompleteComponent;
  let fixture: ComponentFixture<SpotMultiselectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotMultiselectAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotMultiselectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
