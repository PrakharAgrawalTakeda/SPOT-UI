import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnderDeploymentComponent } from './under-deployment.component';

describe('UnderDeploymentComponent', () => {
  let component: UnderDeploymentComponent;
  let fixture: ComponentFixture<UnderDeploymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnderDeploymentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnderDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
