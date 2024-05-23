import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourceAdministrationComponent } from './resource-administration.component';

describe('ResourceAdministrationComponent', () => {
  let component: ResourceAdministrationComponent;
  let fixture: ComponentFixture<ResourceAdministrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourceAdministrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourceAdministrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
