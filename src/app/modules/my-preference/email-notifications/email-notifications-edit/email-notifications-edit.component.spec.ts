import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationsEditComponent } from './email-notifications-edit.component';

describe('EmailNotificationsEditComponent', () => {
  let component: EmailNotificationsEditComponent;
  let fixture: ComponentFixture<EmailNotificationsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailNotificationsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailNotificationsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
