import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HubSettingsComponent } from './hub-settings.component';

describe('HubSettingsComponent', () => {
  let component: HubSettingsComponent;
  let fixture: ComponentFixture<HubSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HubSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HubSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
