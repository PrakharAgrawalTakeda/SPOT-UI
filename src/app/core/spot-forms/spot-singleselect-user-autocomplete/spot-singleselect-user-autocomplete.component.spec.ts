import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotSingleselectUserAutocompleteComponent } from './spot-singleselect-user-autocomplete.component';

describe('SpotSingleselectUserAutocompleteComponent', () => {
  let component: SpotSingleselectUserAutocompleteComponent;
  let fixture: ComponentFixture<SpotSingleselectUserAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotSingleselectUserAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotSingleselectUserAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
