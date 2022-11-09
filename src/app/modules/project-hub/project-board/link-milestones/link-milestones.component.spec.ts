import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkMilestonesComponent } from './link-milestones.component';

describe('LinkMilestonesComponent', () => {
  let component: LinkMilestonesComponent;
  let fixture: ComponentFixture<LinkMilestonesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkMilestonesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkMilestonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
