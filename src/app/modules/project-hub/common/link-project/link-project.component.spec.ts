import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkProjectComponent } from './link-project.component';

describe('LinkProjectComponent', () => {
  let component: LinkProjectComponent;
  let fixture: ComponentFixture<LinkProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinkProjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
