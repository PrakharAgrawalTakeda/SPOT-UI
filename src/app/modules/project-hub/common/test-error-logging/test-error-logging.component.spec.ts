import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestErrorLoggingComponent } from './test-error-logging.component';

describe('TestErrorLoggingComponent', () => {
  let component: TestErrorLoggingComponent;
  let fixture: ComponentFixture<TestErrorLoggingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestErrorLoggingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestErrorLoggingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
