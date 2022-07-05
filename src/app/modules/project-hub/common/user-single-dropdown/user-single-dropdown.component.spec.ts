import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSingleDropdownComponent } from './user-single-dropdown.component';

describe('UserSingleDropdownComponent', () => {
  let component: UserSingleDropdownComponent;
  let fixture: ComponentFixture<UserSingleDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSingleDropdownComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSingleDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
