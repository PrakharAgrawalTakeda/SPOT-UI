import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotSingleselectAutocompleteComponent } from './spot-singleselect-autocomplete.component';

describe('SpotSingleselectAutocompleteComponent', () => {
  let component: SpotSingleselectAutocompleteComponent;
  let fixture: ComponentFixture<SpotSingleselectAutocompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotSingleselectAutocompleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotSingleselectAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
