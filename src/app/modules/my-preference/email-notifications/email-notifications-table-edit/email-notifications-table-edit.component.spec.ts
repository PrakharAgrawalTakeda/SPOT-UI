import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailNotificationsTableEditComponent } from './email-notifications-table-edit.component';

describe('EmailNotificationsTableEditComponent', () => {
  let component: EmailNotificationsTableEditComponent;
  let fixture: ComponentFixture<EmailNotificationsTableEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailNotificationsTableEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailNotificationsTableEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
