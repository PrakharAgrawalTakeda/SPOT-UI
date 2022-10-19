import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskNeedLinkComponent } from './ask-need-link.component';

describe('AskNeedLinkComponent', () => {
  let component: AskNeedLinkComponent;
  let fixture: ComponentFixture<AskNeedLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskNeedLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskNeedLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
