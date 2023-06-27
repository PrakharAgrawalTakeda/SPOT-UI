import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotMultiselectProjectAutocompleteComponent } from './spot-multiselect-project-autocomplete.component';

describe('SpotMultiselectProjectAutocompleteComponent', () => {
  let component: SpotMultiselectProjectAutocompleteComponent;
  let fixture: ComponentFixture<SpotMultiselectProjectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotMultiselectProjectAutocompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpotMultiselectProjectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
